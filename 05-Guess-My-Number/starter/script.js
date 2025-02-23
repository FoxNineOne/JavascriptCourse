'use strict';

/*
console.log(document.querySelector(`.message`).textContent);
document.querySelector('.message').textContent = '🦊 Correct Number!';

//Setting values on things
document.querySelector('.number').textContent = 14;
document.querySelector('.score').textContent = 20;

//setting value, and reading value of class
document.querySelector('.guess').value = 22;
console.log(document.querySelector('.guess').value);

*/
/*
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

const newGame = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.message').textContent = `Start guessing...`;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = `?`;
  document.querySelector('.guess').value = '';
  return secretNumber, score;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //console.log(guess, typeof guess);

  // if no guess is supplied..
  if (!guess) {
    document.querySelector('.message').textContent = `🙀 No number entered!`;
  }
  // When player wins
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = `🟩 Correct Number!`;
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > document.querySelector('.highscore').textContent) {
      document.querySelector('.highscore').textContent = score;
    }
  }
  // When guess is too high
  else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = `🔺 Too High!`;
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      score--;
      document.querySelector('.score').textContent = score;
      document.querySelector('.message').textContent = `💀 Game Over!`;
      document.querySelector('body').style.backgroundColor = '#f34b4b';
    }
    // When guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = `🔻 Too Low!`;
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      score--;
      document.querySelector('.score').textContent = score;
      document.querySelector('.message').textContent = `💀 GAME OVER!`;
      document.querySelector('body').style.backgroundColor = '#f34b4b';
    }
  }
});

newGame();

document.querySelector('.again').addEventListener('click', function () {
  newGame();
});
/*

////////////// Challenge /////////////////

Implmenet a game rest functionality, so that the player can make a new guess. 
Here is how: 

1) Select the element with the 'again' class and attach a click event handler
2) In the handler function, restore the initial vlaues of the score and number variables
3) Restore the inital conditions of the message, number, score and guess input field
4) Also restore the original background colour (#222) and number widith (15 rem)


 */
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

const newGame = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.message').textContent = `Start guessing...`;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = `?`;
  document.querySelector('.guess').value = '';
  return secretNumber, score;
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //console.log(guess, typeof guess);

  // if no guess is supplied..
  if (!guess) {
    // document.querySelector('.message').textContent = `🙀 No number entered!`;
    displayMessage(`🙀 No number entered!`);
  }
  // When player wins
  else if (guess === secretNumber) {
    displayMessage(`🟩 Correct Number!`);
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > document.querySelector('.highscore').textContent) {
      document.querySelector('.highscore').textContent = score;
    }
  }
  // When guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? `🔺 Too High!` : `🔻 Too Low!`);
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage(`💀 Game Over!`);
      document.querySelector('body').style.backgroundColor = '#f34b4b';
    }
  }
});

newGame();

document.querySelector('.again').addEventListener('click', function () {
  newGame();
});
