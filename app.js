'use strict';

// Query selectors
let roundMsg = document.querySelector('.round-result');
let resetGameMsg = document.querySelector('.reset-game');
let gameMsg = document.querySelector('.game-result');
let playerScore = document.querySelector('.player-score');
let cpuScore = document.querySelector('.cpu-score');
let score = document.querySelector('.score-display');
let btn = document.querySelector('.btn-img');
let objective = document.querySelector('.objective');

// Counters
let player = 0;
let cpu = 0;

// Returns random move for computer
const getComputerChoice = () => {
   let choices = ['Rock', 'Paper', 'Scissors'];
   let choice = choices[Math.floor(Math.random() * choices.length)];
   return choice;
};

// Clear round result message
const clearMsg = () => {
   roundMsg.innerHTML = '';
};

// Reset the game and counters
const resetGame = () => {
   clearMsg();

   player = 0;
   cpu = 0;

   playerScore.innerHTML = `Player: ${player}`;
   cpuScore.innerHTML = `CPU: ${cpu}`;

   gameMsg.hidden = true;
   btn.removeAttribute('disabled');
   objective.hidden = false;
   resetGameMsg.hidden = true;
   btn.style.cursor = 'pointer';
};


// Play a round, returns text result
const playRound = (playerSelection, computerSelection) => {
   let result = '';

   playerSelection === 'Rock' && computerSelection === 'Scissors' ||
      playerSelection === 'Scissors' && computerSelection === 'Paper' ||
      playerSelection === 'Paper' && computerSelection === 'Rock' ? result = 'win'

      : playerSelection === computerSelection ? result = 'tie'

         : result = 'lose';

   roundResultMsg(result, playerSelection, computerSelection);
   return result;
};

// Insert round result to DOM
const roundResultMsg = (msg, playerSelection, computerSelection) => {

   clearMsg();

   let winMsg = `<p>You win!</p>
   <p>${playerSelection} beats ${computerSelection}</p>`;

   let loseMsg = `<p>You lose!</p>
   <p>${playerSelection} loses to ${computerSelection}</p>`;

   let tieMsg = `<p>It's a tie!</p>
   <p>${playerSelection} ties ${computerSelection}</p>`;

   msg === 'win' ? roundMsg.innerHTML = winMsg
      : msg === 'tie' ? roundMsg.innerHTML = tieMsg
         : roundMsg.innerHTML = loseMsg;

};

// Play a game
const game = () => {

   let roundResult = '';

   document.querySelector('.btn-img')
      .addEventListener('click', (e) => {
         let playerChoice = e.target.className;
         roundResult = playRound(playerChoice, getComputerChoice());

         // If user wins, they gain a point
         // If user loses, CPU gains a point
         if (roundResult === 'win') {
            player++;

            if (player === 5) { gameOver(); }

         } else if (roundResult === 'lose') {
            cpu++;

            if (cpu === 5) { gameOver(); }
         }

         // Updates player scores
         playerScore.innerHTML = `Player: ${player}`;
         cpuScore.innerHTML = `CPU: ${cpu}`;
      });
};

// When game is over, player cannot continue playing
const gameOver = () => {
   gameMsg.hidden = false;
   resetGameMsg.hidden = false;
   btn.disabled = true;
   btn.style.cursor = 'default';
   objective.hidden = true;
};

// Player resets game
document.querySelector('.reset-game').addEventListener('click', resetGame);

// Init
game();