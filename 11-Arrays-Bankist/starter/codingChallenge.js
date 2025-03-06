'use strict';
/*
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.*/

/* Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:  */

const checkDogs = function (age) {
  age.forEach(function (age, i, arr) {
    console.log(
      `Dog number ${i + 1} ${
        age >= 3
          ? `is an adult, and is ${age} year(s) old`
          : `is still a puppy 🐶`
      } `
    );
  });
};

/*

// So Jonas wrote his with two variabhles, dogsJulia, and dogsKate...
I read this that the first data set had cats.. not to expect every first and last two from Julia to be cats
Why would that be? Sort yourself out Julia.. we shouldn't build functions for your incompetence.

const checkDogs = function (dogsJulia, dogsKate){
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0,1)
  dogsJuliaCorrect.splice(-2);
  console.log(dogsJuliaCorrected);

  const dogs = dogs.JuliaCorrected.concat(dogsKate);
  console.log(dogs);

 age.forEach(function (age, i) {
    console.log(
      `Dog number ${i + 1} ${
        age >= 3
          ? `is an adult, and is ${age} year(s)) old`
          : `is still a puppy 🐶`
      } `
    );
  });

}

checkDogs([3, 5, 2, 12, 7],  [4, 1, 15, 8, 3])

*/

//§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
//§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

/* 1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)*/
const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

//Copy and remove the first element (this is a cat), slice will not affect the intial array
let julia1Corrected = julia1.slice(1);
// Remove last entry, affect correctred array as to not mutate initial array
julia1Corrected.splice(-2);

// 2. Create an array with both Julia's (corrected) and Kate's data

const allDogs1 = julia1Corrected.concat(...kate1);
console.log(allDogs1);

/*3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶
") */
checkDogs(allDogs1);

/*4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 
// GOOD LUCK 🦊
*/
let data2 = [9, 16, 6, 8, 3].concat(...[10, 5, 6, 1, 4]);
//console.log(data2);
checkDogs(data2);
