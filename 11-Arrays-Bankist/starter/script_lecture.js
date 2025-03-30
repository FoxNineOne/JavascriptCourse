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
  owner: 'Shaheen Shaikh',
  movements: [430, 1000, 700, 450, 90, -60, 240],
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

const displayMovement = function (movements, sort = false) {
  //Clear the Movement container first
  containerMovements.innerHTML = '';

  // slice will make a copy of movements, then we'll sort the copy
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
  acc.balance = acc.movements.reduce((acc, movement) => acc + movement, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const eurToUsd = 1.1;
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // 1.2 of desposited amount
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    // The bank will only pay interest returns if they are over 1
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
//console.log(totalDepositsUSD);

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
  displayMovement(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

//Event Handlers

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent Form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  //? Optional Chaining.. the addition of the question mark will prevent error as it will check if current account exists first.
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // Enable visibility of the bank app
    containerApp.style.opacity = 1;
    //Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = ''; //This assignment will set both fields to blank, it works RtL
    inputLoginPin.blur();

    updateUI(currentAccount);

    console.log('LOGIN');
  } else {
    alert('Wrong Username / Password combination');
  }
});

//Transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //Adding again, because a form will reload the page.
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(`${amount} shiny coins for, ${receiverAcc?.owner}`);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // console.log('Conditions met. Transfer valid');

    // Transfer the money
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update the UI
    updateUI(currentAccount);
  }
});

// Loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  // Only grants a loan if there has been atleast one deposit that is at least 10% of the requested loan amount
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement to account
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
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
    // console.log(index);
    accounts.splice(index, 1); //Splice will mutate underlying array

    // Hide UI
    containerApp.style.opacity = 0;

    console.log(`Account Deleted.`);
  } else {
    alert(`Incorrect Credentials Supplied`);
  }

  inputCloseUsername.value = inputClosePin.value = ''; // set both fields to blank,
  //Should this not need a check to ensure logged in user matches user we're closing?
  // Otherwise one person could close everyone
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted); // do the opposite of sorted! I like this
  sorted = !sorted;
});
// Create a username for each username in accounts array
// for Each is the choice, as we do not want to create new array

// Each function should recerive the data it will work with, rather than a global variable

// The map method allowed us to make a simple array to contain initials of name it is used on
// forEach is a great method to progress work without needing to return anything back.

/////////////////////////////////////////////////
/////////////////////////////////////////////////

//LECTURES

//Methods are simply functions we can call on objects, functions attached on objects
//Array methods are the same for all Arrays
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//Slice
console.log(arr.slice(2)); //Same as string, first parameter is start index
console.log(arr.slice(2, 4)); //End parameter asw second parameter. End Parameter is not included in return
console.log(arr.slice(-1));
-1; //is always the last element of an array
console.log(arr.slice(1, -2));

console.log(arr.slice()); // can use without parameters to make a shallow copy of an array
console.log(...arr); // Spread operator will also offer this, both offer the same here.
//Slice just gives options of trimming from start/finish, and you can chyain multiple methods together

//Splice - similar to slice, but does affect original array.
console.log(arr.splice(2));
//The extracted elements have been removed from the original array
//Splice takes requested part of an array, and removes it from source array
console.log(arr);

//Splice is generally used for deletion, the value of what is removed isn't always considered
//Last element E has now been removed
arr.splice(-1);
console.log(arr);

//The second parameter is known as "delete count"
//Essentially, the below says start at position number 1, and remove 2 elements
arr.splice(1, 2);
console.log(arr);

//Reverse
console.log(arr);
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2);

//Simple can o beans = reverses the array order
console.log(arr2.reverse());
//Reverse method does mutate the original array
console.log(arr2);

//Concat concatenate things

//DOESNT MUTATE ARRAY
const letters = arr.concat(arr2); //spoecify second array in argument
console.log(letters);
//Same process, also no mutation
console.log([...arr, ...arr2]);

//JOIN -- NO MUTATO MI AMIGO!
//Returns a string where the supplied argument is used as delimiter
console.log(letters.join('-'));
console.log(letters);

*/
/*
Apparently I already know
Push, Unshift,. Pop, Shift, IndexOf and Icludes..

New with ES2022 - At method
const arr = [23, 11, 64];
Original approach
console.log(arr[0]);
Now with ES2022, the At method!!!!
console.log(arr.at(0));

Say we want the last element of the array, and do not know the length?

You'd be scrahbling about with this!
console.log(arr[arr.length - 1]);
or , use slice...
console.log(arr.slice(-1)[0]); [0] takes the value out of the bracket otherwise [64] is returned over 64

with at you can just call -1
console.log(arr.at(-1));

if you do want to do method chaining, at method is perfect for chaining

if you just want to pull a value from an array, not a thing wrong with the old [] method

The at method also works on strings
console.log('Jiji!'.at(3));
console.log('Jiji!'.at(-``));

*/

/*
for of
console.log();
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}
*/
//for each method - technically a higher order function
//as it requires a callback function to tell it what to do
//The forEach method will loop over the array and execute the function
//As it calls ih each iteration, it'll pass in the current element as an argument "(movement)"
//
//You use these in mongo scripts at work to update the clinical data

// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`); //Math.abs returns absolute value - removes the negative symbol from deposits
//   }
// });

//Which is cleaner and easier? The forEach apprently.
//Although I'm more familiar with them over for of
//
//What if we needed access to a counter variable from inside the forEach loop?
//with for of - we can do movements.entries to access the index number aswell as the value
/*
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
*/
//forEach passess in the current element, index,and entire array that we are looping.
//Order of arguments in forEach:  current element, current index, entire array
// movements.forEach(function (mov, i, r) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`); //Math.abs returns absolute value - removes the negative symbol from deposits
//   }
// });

//When to use forEach or for OF
//
//Continue and Break statements do not work in forEach, it will always process all of the Array
//If you need to break out of a loop - you need to for for of loop
//
//otherwise, personal preference
//
//For Each on Maps and Sets
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//In this array of arrays, each of these array elements will be on entry o0n the map (Key, Value)
//Like the array we can pass 3 cfunctions
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

Set;

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

// console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
//The key is exactly the same as the value
//A set doesn't have keys or indexes, so there is no value that would make sense for the key
//Second argument isn't necessary, but the fdrEach method is consistent with maps and arrays this way.

currenciesUnique.forEach(function (value, _, map) {
  //Apparently, an underscore highlights that a variable is "throwaway" and not needed
  console.log(`${value}: ${value}`);
});
*/
// MAP

// Map is a method we can use to loop over arrays. Map is similar to the for each method, with the difference that map creates a brand new array based on the original array
// Map takes array, loops over, and in each iteration, applies a specified calllback function  to iteration's element
// It then "Maps" the resultant elements to a new array

// FILTER

// Used to filter for elements in the original array that satisfy a certain condition
// Only elements that pass will make it into a new filtered array
// Elements for which the condition is true, will be included in new array

// REDUCE

// Reduce will boil down all elements of a single array into one element
// a strong example : adding all elements together, he's not told me other examples yet.. sus
// This whole process has "reduced" the array to a singlew elements

// Map Lecture
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

//Take away "function", add =>, remove return and curly braces
// Arrow Statement! Cleaner, but still currently annoying to figure out. One day we'll get on.

// Apparently, the => kinda means "return" and that helps you figure out these new whipper snapper functions

//const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// Achieve same via a for of loop
// const movementsUSDfor = [];
// for (const mov of movements) {
//   movementsUSDfor.push(mov * eurToUsd);
// }
// console.log(movementsUSDfor);

// The map method has access to same three parameters  : value,  index,  array
// Bit of ternary and arrow formula coming together
// const movementsDescriptions = movements.map(
//   (mov, i, a) =>
//     `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(
//       mov
//     )}`
// );

// FILTER

// Filter is used to filter elements that satisfy a certain condition
// Use a callback function to specify condition

//like other callback functions (map and for each) this one gets access to current array element as well as index, and entire array

//Only movement arrays with positive values will be in deposits array
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
//console.log(movements);
//console.log(deposits);

//For of alternative -- apparently, curly braces are not needed?
//const depositsFor = [];
//for (const mov of movements) if (mov > 0) depositsFor.push(mov);
//console.log(depositsFor);

// What is the difference between the for and filter?
// We can chain the filter and other array methods over the for loop.

//Create aarray of withdrawals
//Bonus - I made arrow function c:
//const withdrawals = movements.filter(mov => mov < 0);
//console.log(withdrawals);

// Jonas did arrow too, twas identical!

// REDUCE!

//  REDUCE
// Can add all the elements of an Array together to return one sum element

// Also gets callback, but different to map or forEach
//First parameter is always current element, the index, then array
//Th first is actually called accumulator
//const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0); //Reduce also has an initial value parameter! We set this to 0 here.

//console.log(`Final Balance: ${balance}`);

//let balance2 = 0; //Initial accumulator value
//for (const mov of movements) balance2 += mov;
//console.log(balance2);
// Always need an external variable when using for loop
// Can be cumbersome when using a lot of for loops
// The arrays methods do not need this

//Reduce can do more than just add up all values
//We can pull the maximum value of the movements
const maxVal = movements.reduce((a, mov) => {
  if (a > mov) return a;
  else return mov;
}, movements[0]); //Using 0 here would not be correct because first value might be negative!

//console.log(maxVal);

// Chaining Methods!

// take all deposits, convert to USD from EUR, and total

// filter - to allow only deposits (positive values) from movements array
// map - to multpliy each movement by exchange rate
// reduce to sum all values together

// We can only chain a method if the preceding method returns an array
// The reduce method returns an integer, so we cannot chain a filter or map after this.

// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

//Chaining is efficient, easy to read, but can be difficult to debug (not unlike mongo aggregatres..)
// To help, check out the array in specific, or even each steps to see where the root cause stems from

const debugTotalDepositsUSD = movements
  .filter(mov => mov < 0) //Bug created.. this will return all the withdrawals, not deposits.. hence negative result
  .map((mov, i, arr) => {
    // console.log(i, arr); //returning the full array will show what is being fed to this function
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
// console.log(debugTotalDepositsUSD);

//I could've added loggin at the filter or reduce stage too... but reversing arrow functions on a sunday morning isn't really what I'm feeling right now.

// Chaining should be optimised but not overused.. it can cause performance issues on large arrays
// We should try to compress all functionality into as little methods as possible
// for example. chaining several map methods that could be used all in one map call
// Also, it's bad practise to chain methods that mutate original array, such as the splice or reverse methods.

// FIND!

// We can use find element to find one element of an array based on one condition
// Loops over array and has a callback function

//Similar to filter but not quite
// We'll filter on withdrawals - unlike filter method it will not turn array
// It'll only pull back the FIRST element where the criteria is met.
// Filter will return ALL elements that meet criteria in a new Array
// Find pull back the first element as its saource data type, no new array created.

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);
//
// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

//Due to the limitation of pulling back the first where criteria is met - The goal of a find method is usually to search where only one element can satisfy that condition
// This is like like primary keys in database structures.. you couldn't search personnel on name values, or dates of birth
// But a system ID, a NI number, something that cannot be duplicated and can only ever return one element is crucial

//Find index
// returns the index of the found element, not the element itself. (this would be useful for mongo at work)

// two new methods were addded in ES2023

//findLast and findlastIndex -- do same as originals, just in reverse (search from the last to first index)

// console.log(movements);
// const lastWithdrawal = movements.findLast(mov => mov < 0);
// console.log(lastWithdrawal);
// const lastLargeMovementIndex = movements.findLastIndex(
//   mov => Math.abs(mov) > 2000
// );

// console.log(
//   `Your latest large movement was ${
//     movements.length - lastLargeMovementIndex
//   } movements ago`
// );

// Some and Every method
/*
//First let's go back to includes
console.log(movements);
// console.log(movements.includes(-130)); // We can use includes method to test if an array contains a value. Returns true/false
// testing for equality. The criteria has to be exact

//testing for condition? This is where some comes into play.
// SOME
const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// EVERY method
// only returtns true if ALL of the elements in array pass critera
console.log(account4.movements.every(mov => mov > 0));

// Good for data validation

// separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//FLAT and FLAT MAP

// If we have nested arrays , we can literally flatten them to one layer of array
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// Flat is new with ES2019.. may not work in old browsers
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// Flat Method only goes one layer deep
console.log(arrDeep.flat());
console.log(arrDeep.flat(2)); //we can set a depth! by default it is 1

//We can use Flat Map to find the deepest layer maybe?

const accountMovements = accounts.map(acc => acc.movements);
const allMovements = accountMovements.flat();
console.log(allMovements);

const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

const overallBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

//FLAT MAP
// As Map and Flat is common practise, FlatMap was created to do this but improve performance
// Flat Map only goes one level deep, so if you require further, use Flat
const overallBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance3);

*/
//SORTIN ARRAYS
// Sort is destructive! See below for toSorted!

// const owners = ['Jiji', 'Zorro', 'Ye', 'Pikachu'];
// console.log(owners.sort()); // Sorted alphabetically
// console.log(owners); //SORTING WILL MUTATE THE ORIGINAL ARRAY!

// Numbers
//console.log(movements);
//console.log(movements.sort()); //Sort treats integers as strings. Alphabetically sorted

// console.log(
//   movements.sort((a, b) => {
//     // < 0 , A, B (keep order)
//     if (a > b) return 1;
//     // > 0 , B, A (switch order)
//     if (a < b) return -1;
//   })
// );

//This can be simplified.. because the logic is simply
// "If A is greater than B, return a positive number"

//With the above logic..   A - B returns a positive integer, B - A returns negative
//movements.sort((a, b) => a - b); // turned into an arrow array!

//console.log(movements);

// if you have a mixed array, strings and numbers, this would not work
// best not to use sort if you have a mixed array

// ARRAY GROUPING
// New with ES2024!

// We use Object.groupBy() to group arrays. This will return an object containing arrays
// requires two arguments, the array we're wanting to group up
// and the callback function to process how we're grouping
// in the below, if the movement is above 0, it's a deposit. below 0 is a withdrawal

// console.log(movements);
// const groupedMovements = Object.groupBy(movements, movement =>
//   movement > 0 ? 'deposits' : 'withdrawals'
// );

// returns an object
// console.log(groupedMovements);

// const groupedActivity = Object.groupBy(accounts, account => {
//   const movementCount = account.movements.length;
//   if (movementCount >= 8) return 'very active';
//   if (movementCount >= 4) return 'active';
//   if (movementCount >= 1) return 'moderate';
//   return 'inactive';
// });

// console.log(groupedActivity);

// Create a group based on account type. (accounts.type)
// const groupedType = Object.groupBy(accounts, account => {
//   const typeAccount = account.type;
//   return typeAccount;
// });
// console.log(groupedType);

// Arrow that badboy
// const groupedType = Object.groupBy(accounts, account => account.type);
// console.log(groupedType);

//  Create and fill ARRAYS!
// Old boring ways of creating arrays!
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// const x = new Array(7);
// console.log(x);
// This returns an empty array
// Can't do much, can't use map
// x.map(() => 5);
// console.log(x);

//One method we can call? FILL! (Not Phil)
// x.fill(1);
// We can specify a BEGIN parameter, so start from index 3:
// We can also specify an END parameter, end at index 5:
// x.fill(1, 3, 5);
//x.fill(1);
// It will mutate the array!
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// what if we wanted to created the original arr?

//Array.from

// Array of 7 elements, all 1
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// Array of 7 elements, values of 1 - 7
// const z = Array.from({ length: 7 }, (_, i) => i + 1); // "_" implies a throwaway variable that isn't used, it is required for hte function to work, but underscore shows we're not requiring it.
// console.log(z);

// Query selector all returns something called a nodelist
// but like an array, but isn't a real array doesn't have map or reduce//
// Convert NodeList >? array with Array.from

// labelBalance.addEventListener('click', function (e) {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );

//   console.log(movementsUI);
// });

//Another way of converting this to an array..
// const movementsUI2 = [...document.querySelectorAll('.movements__value')];
// console.log(movementsUI2);
//We would have to map separately

// Destructive array methods - will mutate original array!

// console.log(movements);
// const reversedMov = movements.reverse()
// console.log(reversedMov);
// IT HAS BEEN MUTATED! 😱
// console.log(movements);

//Pre chain a slice to make a copy
const reversedMovND = movements.slice().reverse();

//Non destructive!
// toReversed
const reversedMov = movements.toReversed();
console.log(reversedMov);
console.log(movements);

// toSorted (sort!)
// Sort without mutating original array

//  toSpliced (splice)
//Takes specified part of array, but will not affect original array

//with
const newMovements = movements.with(1, 2000); //Copy movement array, but position 1 will have a value of 2000

console.log(newMovements);

// Which Array Method to Use?!

//Ask the questions
/*
"What do I want from this method"
"Do I want to mutate the original array, or create a new array based on the original?"
"Do I want an array index, or retrieve an entire array element?"
"Do I want to know if an array includes a specific element?"
"I want to get a new string"
"Transform array to new value"
"Loop over array?"
  
*/

// To add elements to original array, we can use .push (add at end) or .unshift (at start)
// To remove elements from original array, we can use .pop (end removal), .shift (at start) or .splice (any/specific)

//Others to mutate original array
// .reversem ,sort, .fill

// JS is moving towards non-destructive approaches, creating new arrays rather than mutating originals
// Avoid using where possible

//New array based on originals

//Map - loops over array.
//   "Should the new array have the exact same length as the old one?"
// If yes, probably need map

//Creating new arrays by filtering for a condition?
// .filter (using condition)
// .slice (take portion of original)

// .with (with one item replaced)

// Flatter the array with .flat or .flatMap

// Reverse the new array? .toReversed
// Sort the new array? .toSorted
// delete some of the new array? .toSpliced

//concat or joining two new arrays? .concat

// Need an array index?
// Based on a value? .indexOf
// Based on test condition? .findIndex .findLastIndex

//What if we know the position of the element that we want to get from the array?
// .at method - which is the same as using square brackets to retrieve an element

// Does an array include a certain element or not?
//.includes single value
// .some test if atleast one satisfies
// .every only true if ALL elements satisfy

// Transform array into a string?
// .join

// Reduce array to a single value?
// .reduce (uses accumulator to boild all values into one of any type (number, string, boolean,array, object))

// Just loop without producing a new value?
// forEach - doesn't create a new value or array.

// More array tools and techniques (aren't exactly array methods)

// Object.groupBy  Group arrays by different categories
// Create a new array from scratch? Array.from (then map callback to fill up array)
// new Array(n) (where n = number of empty arrays) follo0w up with .fill

//Join 2 or more arrays?
// [...arr1, ...arr2, ...arr3]

//strip to just Unique values of an array?
// [...new Set(arr)]

// Want to find all elements that are present in two arrays?
// convert them into sets,use the intersection method on the set
// and then spread the result into a brand new array once again.

//[...new Set(arr1).intersection(new Set(arr2))]

/////////////////////////////////////////////////
//ARRAY METHODS PRACTISE

// 1) How much has been deposited in total, across the whole bank (all accounts)?

//const bankDepositSum = accounts.map(acc => acc.movements)
//console.log(bankDepositSum);

//array of arays? use Flat (or flatMap!)
//const bankDepositSum = accounts.map(acc => acc.movements).flat()
// const bankDepositSum = accounts.flatMap(acc => acc.movements)
// console.log(bankDepositSum);

//Filter on just deposits (filter!)
// const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov>0)
// console.log(bankDepositSum);

//add all together (with reduce!)
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2) How many deposits in the bank that are over 1000 dollars?

//Tidy way
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

//Alternative way.. which might be easier to read?
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  //  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  //.reduce((count, cur) => (cur >= 1000 ? count++ : count), 0); //++ fails.. see below
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); //++ fails.. see below

console.log(numDeposits1000);

//++ operator has a flaw
// let a = 10;
// console.log(a++); //10 it will return the old value
// console.log(a); // 11 because the ++ works just not in console.log

// console.log(++a); //++ before value will increase and log it
// console.log(a); // no explanation needed

// 3) Create object that contains sum of deposits, and sum of withdrawals.

// Create a new object rather than number or string
// Reduce boils down to 1 value.. this includes objects

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums; //Always need to return accumulator
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

//4) Create a function to convert any string to a title case (all the words are capitalised)

// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];
  const capitalise = str => str[0].toUpperCase() + str.slice(1);
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalise(word)))
    .join(' ');
  return capitalise(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LOOONG title, but not too long'));
console.log(convertTitleCase('and another title, with an EXAMPLE'));

// BONUS) Recreate any examples of this section to use only the reduce method
// 1) How much has been deposited in total, across the whole bank (all accounts)?

/////////////////////////////////////////////////
