'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Shaheen Shaikh',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//Converting and checking numbers
// In JS all numbers are represented internally as floating point numbers (deciamal;s)
// Numbers are represented internally in a 64 base2 format
// Numbers are always stored in a binary form

//Base 10 (0 - 9)
//Base 2 (0 - 1)

// Because Base2, certain fractions return strange decimals
// console.log(0.1 + 0.2);

//Specific or financial calculations in JS can be difficult
// console.log(0.1 + 0.2 === 0.3); //will return false
/*
// convert String to number
console.log(Number('23'));
console.log(+'23'); //will type convert to Number .. Looks cleaner!

//parse number from a string!
console.log(Number.parseInt('400px', 10)); // the argument 10 will infer it's a base10
console.log(Number.parseInt('400px', 2)); // the argument 2 will infer Base2, binary
// The string has to start with a number
console.log(Number.parseInt('d400')); //Returns NaN

console.log(Number.parseFloat(' 4.6rem'));
console.log(Number.parseFloat(' 4.6rem', 2)); // the argument 2 will infer Base2, binary

//These functions are actually global functions, so we don't need to call Number
console.log(parseFloat(' 4.6rem'));
// Although apparently, it's encouraged to use Number

//isNaN - only use to check if a number or not
console.log(Number.isNaN(20)); //false - it is not not-a-number
console.log(Number.isNaN('20')); //false - it is not not-a-number
console.log(Number.isNaN('20x')); //true - it is not a number

console.log(Number.isNaN(23 / 0)); // This should return infinity.. but it didn't for me.

//isFinite - use to check if a number
console.log(Number.isFinite(23 / 0)); // TRhis returns false, it's in-finite!
console.log(Number.isFinite(20)); // true - is finite
console.log(Number.isFinite(20.67)); // true - is finite
console.log(Number.isFinite('20')); // false - it is string.

//Is finite is apparently the best method if a value is a real number (not string)

//isInteger - check for integers only
console.log(Number.isInteger(206)); // true - is integer
console.log(Number.isInteger(20.67)); // false - is decimal
console.log(Number.isInteger('20')); // false - it is string.
*/

//Math and Rounding Numbhers
/*
//Square Root
//console.log(Math.sqrt(25));
//console.log(25 ** (1 / 2));
//console.log(8 ** (1 / 3)); // cubic root

//Return Max and Minimum
//console.log(Math.max(5, 18, '43', 11, 2)); //will also type convert, but will not parse from string with non number characters
//console.log(Math.min(5, 18, '43', 11, 2));

// Return Pi
//console.log(Math.PI);

// Calculate the area of a circle with a radius of 10 pixels
//console.log(Math.PI * Number.parseFloat('10px') ** 2);

//Random function - return a number between 1 and 6
//console.log(Math.trunc(Math.random() * 6) + 1);

// Number Generator between two ranges.
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
console.log(randomInt(10, 20));

console.log(randomInt(0, 3));

// Rounding integers
console.log(Math.trunc(23.3)); //truncates decimals away.

console.log(Math.round(23.3)); //Rounds to nearest integer
console.log(Math.round(23.6)); //Rounds to nearest integer

console.log(Math.ceil(23.3)); //Returns 24.. ceil rounds up to next integer
console.log(Math.ceil(23.6)); //Returns 24.. ceil rounds up to next integer

console.log(Math.floor('23.3')); //Returns 23.. ceil rounds down to next integer
console.log(Math.floor(23.6)); //Returns 23.. ceil rounds down to next integer

// Truncate and Floor do same when dealing with positive numbers
// however, for negative numbers, it doesn't work this way.

console.log(Math.trunc(-23.3)); //Returns -23
console.log(Math.floor(-23.3)); //Returns -24  floor rounds down remember!
// Floor's behaviour is consistent with negative or positive

// Rounding floating point (decimals)
// we have to specify decimals in parenthesis (brackets for fancy pants people)
console.log((2.7).toFixed(0)); //returns 3, as a string (not an inteegr)
console.log((2.7).toFixed(3)); //returns 2.700, as we specified 3 after decimal
console.log((2.745).toFixed(2)); //returns 2.75, rounds up?
console.log((2.744).toFixed(2)); //returns 2.75, rounds down?


*/

// The remainder operator (might be useful when batching?)
/*
// This guy says reminder.... then remainder..
// wrong or right.. pick one and be consistent mate

console.log(5 % 2); //returns 1, which is remainder (not divsible value)
console.log(5 / 2); // returns 2.5.. as it should

console.log(8 % 3); // returns 2
console.log(8 / 3); // returns 2.6666666665

// odd and even numbers
// even numbers have no remainder
console.log(6 % 2 === 0); //returns true, it is even
console.log(61 % 2 === 0); //returns false it is odd

//function it!
const isEven = n => n % 2 === 0;
console.log(isEven(4));
console.log(isEven(47));
console.log(isEven(66));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (r, i) {
    if (i % 2 === 0) r.style.backgroundColor = 'orangered';
    if (i % 3 === 0) r.style.backgroundColor = 'lightblue';
    if (i % 5 === 0) r.style.backgroundColor = 'purple';
  });
});


*/

// Numberic Separators

// 287,760,000,000
const diameter = 287_460_000_000; // We can use separators to help read large numbers
console.log(diameter); //returns 287460000000 - js ignores the separators

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;
console.log(transferFee1);
console.log(transferFee2);

const PI = 3.14_15; //Cannot place underscore at beginning, end, consecutive, or next to decimal
console.log(PI);

console.log(Number('230000')); // works
console.log(Number('230_000')); //returns NaN
console.log(parseInt('230_000')); //returns 230, the 000 is ignored.
// Only use numeric separators when dealing with numbers..
// Numbers as strings should not use underscores.
