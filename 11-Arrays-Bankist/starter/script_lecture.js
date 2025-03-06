'use strict';

//LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

// // Achieve same via a for of loop
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
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
//console.log(movements);
//console.log(deposits);

//For of alternative -- apparently, curly braces are not needed?
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
//console.log(depositsFor);

// What is the difference between the for and filter?
// We can chain the filter and other array methods over the for loop.

//Create aarray of withdrawals
//Bonus - I made arrow function c:
const withdrawals = movements.filter(mov => mov < 0);
//console.log(withdrawals);

// Jonas did arrow too, twas identical!

// REDUCE!

//  REDUCE
// Can add all the elements of an Array together to return one sum element

// Also gets callback, but different to map or forEach
//First parameter is always current element, the index, then array
//Th first is actually called accumulator
const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0); //Reduce also has an initial value parameter! We set this to 0 here.

console.log(`Final Balance: ${balance}`);

let balance2 = 0; //Initial accumulator value
for (const mov of movements) balance2 += mov;
console.log(balance2);
// Always need an external variable when using for loop
// Can be cumbersome when using a lot of for loops
// The arrays methods do not need this

//Reduce can do more than just add up all values
//We can pull the maximum value of the movements
const maxVal = movements.reduce((a, mov) => {
  if (a > mov) return a;
  else return mov;
}, movements[0]); //Using 0 here would not be correct because first value might be negative!

console.log(maxVal);
