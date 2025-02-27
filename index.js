/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++){
        let game = games[i];
        
        var gameCard = document.createElement("div");

        gameCard.classList.add("game-card");
        

        gameCard.innerHTML = `<h1>${game.name}</h1> 
            <img src ="${game.img}" alt = "${game.name}" class = "game-img" />
            <p>Description: ${game.description}</p>
            <p>Amount Pledged: ${game.pledged}</p>
            <p>Pledge Goal: ${game.goal}</p>
            <p>Number of Contributors: ${game.backers}</p>
            <div class = "GoalBar">
                <div class = "GoalBar__fill"></div>
                <span class="GoalBar__text">0%</span>
            </div>`
            ;
        function updateProgressBar(GoalBar,game){
            let value = (game.pledged/game.goal) * 100;
            let values = Math.round(value);
            GoalBar.querySelector(".GoalBar__fill").style.width = `${values}%`;
            GoalBar.querySelector(".GoalBar__text").textContent = `${values}%`;
        };
        
        const goalBar = gameCard.querySelector(".GoalBar");
        updateProgressBar(goalBar, game);

        gamesContainer.appendChild(gameCard);
    }
    
        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const contributionsTotal = GAMES_JSON.reduce( (acc, game) =>{
    return acc + game.backers;
}, 0);

contributionsCard.innerHTML = `<h1>${contributionsTotal.toLocaleString('en-US')}</h1>`;


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalContribution = GAMES_JSON.reduce( (acc, game) =>{
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<h1>$${totalContribution.toLocaleString('en-US')}</h1>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = `<h1>${totalGames}</h1>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    // use filter() to get a list of games that have not yet met their goal
    const filtered = GAMES_JSON.filter((game) => {
        return game.goal > game.pledged;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(filtered);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const filtered1 = GAMES_JSON.filter((game)=>{
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(filtered1);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const filters = GAMES_JSON.filter((game) => {
    return game.goal > game.pledged;
});

const numOfUnfunded = filters.length;

// create a string that explains the number of unfunded games using the ternary operator
let displayStr = (numOfUnfunded < 1) ? `A total of $${totalContribution.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${numOfUnfunded} game remains unfunded. We need your help to fund these amazing games!` : `A total of $${totalContribution.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${numOfUnfunded} games remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
var display = document.createElement("div");
display.innerHTML =`<p>${displayStr}</p>`;
descriptionContainer.appendChild(display);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [game1, game2, ...rest] = sortedGames;
let {name:name1, description:d1, pledged:p1, goal:g1, backers:b1, img:img1} = game1;
let {name:name2, description:d2, pledged:p2, goal:g2, backers:b2, img:img2} = game2;



// create a new element to hold the name of the top pledge game, then append it to the correct element
var displays = document.createElement("div");
displays.innerHTML = `<p>${name1}</p>
<img src ="${img1}" class = "game-img">`;
firstGameContainer.appendChild(displays);

// do the same for the runner up item
var displays2 = document.createElement("div");
displays2.innerHTML = `<p>${name2}</p>
<img src="${img2}" class = "game-img">`;
secondGameContainer.appendChild(displays2);