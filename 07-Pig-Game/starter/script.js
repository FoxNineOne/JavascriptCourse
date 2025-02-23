'use strict';

// Selecting elements
// Retrieve Score via it's ID, not class
const score0El = document.querySelector('#score--0');
const current0El = document.getElementById('current--0');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Alternative Method, getElementById
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let playing, scores, currentScore, activePlayer;

// SET THE Winning Score HERE
const winScore = 20;

// Starting Conditions
const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];

  currentScore = 0;
  playing = true;
  // Set Player 1 as active
  activePlayer = 0; //0 for 1 , 1 for 2

  // document.getElementById(`score--0`).textContent = 0;
  // document.getElementById(`score--1`).textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // remove Player 2 active-ness if it's there
  player1El.classList.remove('player--active');

  // Hide Dice Icon
  diceEl.classList.add('hidden');

  //Make player 1 active
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

// Cal dat NewGame
newGame();

//Function to switch Active Player
const switchPlayer = function () {
  // switch to next player
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
  // console.log(`Active Player : ${activePlayer + 1}`);

  // Change the diplay to highlight active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1 Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2 Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //console.log(dice);

    // Check for 1, if true,
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add Current Score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    // IF Total score >= 100 = WIN
    if (scores[activePlayer] >= winScore) {
      //WIN
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      // Else switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', newGame);

//BUG Pressing hold when current score = 0 errors in console.
//BUG FIX IDEA 1 - Disable hold button when current score = 0
