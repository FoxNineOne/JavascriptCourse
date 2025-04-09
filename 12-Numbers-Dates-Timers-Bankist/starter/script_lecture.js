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
    '2020-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2024-04-01T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2025-03-27T17:01:17.194Z',
    '2025-04-01T23:36:17.929Z',
    '2025-04-07T10:51:36.790Z',
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
    '2021-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2024-02-05T16:33:06.386Z',
    '2024-03-30T14:43:26.374Z',
    '2025-04-01T18:49:59.371Z',
    '2025-04-07T12:01:20.894Z',
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

const formatMovementDate = function (date) {
  const calcDaysElapsed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysElapsed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  //else print the date
  const day = date.getDate().toString().padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // same effect as toString()
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates[i],
  }));

  if (sort) {
    combinedMovsDates.sort((a, b) => a.movement - b.movement);
  }

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
              <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${movement.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = `${now.getMonth() + 1}`.padStart(2, '0'); // same effect as toString()
    const year = now.getFullYear();
    const hour = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
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
  displayMovements(currentAccount, !sorted);
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
/*
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
*/
// Working iwth Big Int
/*
// Numbers are resepesented internall as 64 bits.. 64 1s or 0s to represent any number
// only 53 are used to store the digits themselves
// the rest are for the decimal point and sign
// this means there is a limit.
//Base 2, ence 2**
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

//any intgeer larger is not safe, and that means cannot be represented accurately
console.log(2 ** 53 + 1); //should be 2 higher than console log above, not 1
console.log(2 ** 53 + 2);

// What if we need larger numbers?
// with es2020 - bigInt came to town!

console.log(9999999999999999999999999999999999999999n); //adding an N on the end will make bigInt
console.log(BigInt(9999999999999999999999999999999999999999)); //Doesn't work..

// Operations with bigInt numbers

// All usual operators still work the same.

console.log(10000n + 10000n);
console.log(9999999999999999999999999999999999999999n * 100000000n);

// Not possible to mix BigInt with regular numbers
const huge = 9999999999999999999999999999999999999999n;
const num = 23;
//console.log(huge * num); //will error
console.log(huge * BigInt(num));
// Apparently this works but following the first example, I am skeptical

//Comparioson Operators work
console.log(20n < 15); // retruns false
console.log(20n == 20); // returns true
console.log(20n === 20); // returns false - correct as data types differ

//String concatenations
console.log(huge + ' is REALLY big!!!');

//Math operators are not going to work

// Divisions
console.log(10n / 3n); //returns 3n - truncates decimal off
console.log(10 / 3); //returns 3.333
*/
//Creating Dates

// const now = new Date(); // this will push the current timestamp

// console.log(now);

// console.log(new Date('September 08 1991 20:00:00'));
// console.log(new Date('December 24, 2015'));
// console.log(new Date('2000-01-01'));
// console.log(new Date('08/09/2000')); // It's fucking american... that's upset me.
// console.log(new Date('2000-09-08'));
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2057, 10, 19, 15, 23, 5)); //10 is november? so is month counting from 0?
// console.log(new Date(2057, 0, 0, 15, 23, 5)); //it is 0 based.. but on month.. it's a bit of a mess to be honest

// //Jan 1 1970 - earliest date?
// console.log(new Date(0));
// // 3 days later?
// console.log(new Date(3 * 24 * 60 * 60 * 1000));
// //3 days, made of 24 hours, made of 60 minutes, 60 seconds, 1000 milliseconds
// //This isn't fully sinking in yet.. may need to return

// // Dates have their own methods

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear()); // returns 2037
// //console.log(future.getYear()); // Dont use this.. not sure why
// console.log(future.getMonth());
// console.log(future.getDate()); // to return Date of month

// // 0 based!!!
// console.log(future.getDay()); // returns day of the week
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());

// // 2037-11-19T15:23:00.000Z
// console.log(future.toISOString()); //Returns that date format we see in Mongodbs.. bleh

// console.log(future.getTime()); //returns 2142256980000 - milliseconds that have past since earliest date (Jan 1970)
// console.log(new Date(2142256980000)); // returns Thu Nov 19 2037 15:23:00 GMT+0000 (Greenwich Mean Time)

// //Method to get timestamp for right now.
// console.log(Date.now());

// //Change the year but keep month and date of month
// future.setFullYear(2040);
// console.log(future);

// More operations with Dates!

// Subtract one date from another date.. helps to find days elapsed
const future = new Date(2037, 10, 19, 15, 23);

// console.log(Number(future));
console.log(+future);

const calcDaysElapsed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const days1 = calcDaysElapsed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1 + ' days');

const days2 = calcDaysElapsed(new Date(2037, 3, 24), new Date(2037, 3, 14));
console.log(days2 + ' days');

//Moment.Js offers precise and more methods such as daylight savings time

//Js has a new internatilsation API
// Allows us to easily format numbers and strings according to different languages

const num = 3884764.23;

const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'GBP',
  //useGrouping: false, //removes the separators between thousands
};

console.log('GB: ', new Intl.NumberFormat('en-GB', options).format(num));
console.log('ES: ', new Intl.NumberFormat('es-ES', options).format(num));
console.log('JP: ', new Intl.NumberFormat('jp-JP', options).format(num));
console.log(
  `${navigator.language}: `,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

//Currency cannot be defined by locale. We have to define manually
// Is there not a lubrary for this? Geo assume US is USD, GB is GBP etc..?
