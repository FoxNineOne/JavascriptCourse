'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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
  interestRate: 1,
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Methods are simply functions we can call on objects, functions attached on objects
// Array methods are the same for all Arrays

//let arr = ['a', 'b', 'c', 'd', 'e'];

//Slice
// console.log(arr.slice(2)); //Same as string, first parameter is start index
// console.log(arr.slice(2, 4)); //End parameter asw second parameter. End Parameter is not included in return
// console.log(arr.slice(-1)); //-1 is always the last element of an array
// console.log(arr.slice(1, -2));
//
// console.log(arr.slice()); //can use without parameters to make a shallow copy of an array
//console.log(...arr); //Spread operator will also offer this, both offer the same here.
//Slice just gives options of trimming from start/finish, and you can chyain multiple methods together

// Splice - similar to slice, but does affect original array.
//console.log(arr.splice(2));
// The extracted elements have been removed from the original array
/// Splice takes requested part of an array, and removes it from source array
//console.log(arr);

// Splice is generally used for deletion, the value of what is removed isn't always considered
// Last element E has now been removed
//arr.splice(-1);
//console.log(arr);

//The second parameter is known as "delete count"
// Essentially, the below says start at position number 1, and remove 2 elements
//arr.splice(1, 2);
//console.log(arr);

//Reverse
// console.log(arr);
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2);
//
// Simple can o beans = reverses the array order
// console.log(arr2.reverse());
// Reverse method does mutate the original array
// console.log(arr2);
//
// Concat concatenate things
//
// // DOESNT MUTATE ARRAY
// const letters = arr.concat(arr2); //spoecify second array in argument
// console.log(letters);
// Same process, also no mutation
// console.log([...arr, ...arr2]);
//
// JOIN -- NO MUTATO MI AMIGO!
// Returns a string where the supplied argument is used as delimiter
// console.log(letters.join('-'));
// console.log(letters);

// Apparently I already know
// Push, Unshift,. Pop, Shift, IndexOf and Icludes..

// New with ES2022 - At method
const arr = [23, 11, 64];
//Original approach
console.log(arr[0]);
// Now with ES2022, the At method!!!!
console.log(arr.at(0));

// Say we want the last element of the array, and do not know the length?

//You'd be scrahbling about with this!
console.log(arr[arr.length - 1]);
// or , use slice...
console.log(arr.slice(-1)[0]); //[0] takes the value out of the bracket otherwise [64] is returned over 64

// with at you can just call -1
console.log(arr.at(-1));

//if you do want to do method chaining, at method is perfect for chaining

//if you just want to pull a value from an array, not a thing wrong with the old [] method

//The at method also works on strings
console.log('Jiji!'.at(3));
console.log('Jiji!'.at(-``));
