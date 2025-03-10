'use strict';
/////////////////////////////////////////////////
//BANKIST APP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 2.1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = function (movements) {
  //Clear the Movement container first
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
          <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovement(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, movement) => acc + movement, 0);
  labelBalance.textContent = `${balance} €`;
};
calcDisplayBalance(account1.movements);

const eurToUsd = 1.1;
const calcDisplaySummary = function (movement) {
  const incomes = movement
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = `${incomes}€`;

  const out = movement.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // 1.2 of desposited amount
  const interest = movement
    .filter(mov => mov > 0)
    .map(deposit => deposit * 0.012)
    // The bank will only pay interest returns if they are over 1
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

// Create a username for each username in accounts array
// for Each is the choice, as we do not want to create new array

// Each function should recerive the data it will work with, rather than a global variable

// The map method allowed us to make a simple array to contain initials of name it is used on
// forEach is a great method to progress work without needing to return anything back.

/////////////////////////////////////////////////
/////////////////////////////////////////////////

//LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////
