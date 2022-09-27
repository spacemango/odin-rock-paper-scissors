'use strict';

// Query selectors
let roundMsg = document.querySelector('.round-result');
let resetGameMsg = document.querySelector('.reset-game');
let gameMsg = document.querySelector('.game-result');
let playerScore = document.querySelector('.player-score');
let cpuScore = document.querySelector('.cpu-score');
let score = document.querySelector('.score-display');
let btn = document.querySelector('.btn-img');

// Counters
let gameCount = 0;
let player = 0;
let cpu = 0;

// Return random move from array for computer
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
   resetGameMsg.hidden = true;
   btn.style.cursor = 'pointer';
};


// Play a round
const playRound = (playerSelection, computerSelection) => {
   let result = '';

   playerSelection === 'Rock' && computerSelection === 'Scissors' ||
      playerSelection === 'Scissors' && computerSelection === 'Paper' ||
      playerSelection === 'Paper' && computerSelection === 'Rock' ? result = 'win'

      : playerSelection === 'Rock' && computerSelection === 'Rock' ||
         playerSelection === 'Scissors' && computerSelection === 'Scissors' ||
         playerSelection === 'Paper' && computerSelection === 'Paper' ? result = 'tie'

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

// Start the game onload
const game = () => {

   let roundResult = '';

   document.querySelector('.btn-img')
      .addEventListener('click', (e) => {
         roundResult = playRound(e.target.className, getComputerChoice());

         if (roundResult === 'win') {
            player++;

            if (player === 5) {
               gameOver();
            }

         } else if (roundResult === 'lose') {
            cpu++;

            if (cpu === 5) {
               gameOver();
            }
         }

         playerScore.innerHTML = `Player: ${player}`;
         cpuScore.innerHTML = `CPU: ${cpu}`;
      });
};

const gameOver = () => {
   gameMsg.hidden = false;
   resetGameMsg.hidden = false;
   btn.disabled = true;
   btn.style.cursor = 'default';
};

// Player resets game
document.querySelector('.reset-game').addEventListener('click', resetGame);

// Init
game();