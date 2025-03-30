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
// console.log(allDogs1);

/*3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶
") */
// checkDogs(allDogs1);

/*4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 
// GOOD LUCK 🦊
*/
let data2 = [9, 16, 6, 8, 3].concat(...[10, 5, 6, 1, 4]);
//console.log(data2);
// checkDogs(data2);

//Coding Challenge #2

/* Let's go back to Julia and Kate's study about dogs. 
This time, they want to convert
dog ages to human ages and 
calculate the average age of the dogs in their study.
Your tasks: */

/* Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. 
If the dog is > 2 years old,
humanAge = 16 + dogAge * 4 */

// const calcAverageHumanAge = function (ages) {
// const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
// console.log(humanAges);
// const adults = humanAges.filter(age => age >= 18);
// console.log(adults);
//
// const average = adults.reduce(
// (acc, age, i, arr) => acc + age / arr.length,
// 0
// );
// return average;
// };

// 2. Exclude all dogs that are less than 18 human years old (which is the same as
//    keeping dogs that are at least 18 years old)

// 3. Calculate the average human age of all adult dogs (you should already know
//    from other challenges how we calculate averages �)

// 4. Run the function for both test datasets

// Test data:
// const testData1 = [5, 2, 4, 1, 15, 8, 3];
// const testData2 = [16, 6, 10, 5, 6, 1, 4];

// const average1 = calcAverageHumanAge(testData1);
// const average2 = calcAverageHumanAge(testData2);
// console.log(average1, average2);
//

const calcAverageHumanAge = function (dogAge) {
  let humanAge;
  if (dogAge <= 2) return (humanAge = 2 * dogAge);
  else humanAge = 16 + dogAge * 4;
  if (humanAge > 18) return humanAge;
};
// console.log(calcAverageHumanAge(3));

///Use Map, Filter and Reduce Methods

// Coding Challenge #3

// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
// as an arrow function, and using chaining!
// Test data:
const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge2 = function (ages) {
  const humanAges = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  console.log(humanAges);
};

console.log(calcAverageHumanAge(testData1));
console.log(calcAverageHumanAge(testData2));

calcAverageHumanAge2(testData1);
calcAverageHumanAge2(testData2);

//Coding Challenge 4

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmation',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// The challenge on the video differs to the PDF, so I'm writing this out by hand like a mug.

// YOUR TASKS:

// 1. Store the average weight of a "Husky" in a variable "huskyWeight"

const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)

const dogBothActivities = breeds.find(
  breed =>
    breed.activities.includes('running') && breed.activities.includes('fetch')
);
console.log(dogBothActivities);
console.log(dogBothActivities?.breed);

// 3. Create an array "allActivities" of all the activities of all the dog breeds.

// flatMap() is a combination of map() and flat().
// breed.activities extracts the activities from each dog object.
// It then flattens the resulting arrays into one single array.

const allActivities = breeds.flatMap(breed => breed.activities);
console.log(allActivities);

// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions).
// HINT : Use a technique  with a special data structure that we studied a few sections ago.

// const uniqueActivities = new Set(breeds.flatMap(breed => breed.activities));
// console.log(uniqueActivities);

// const uniqueActivities = [...new Set(allActivities)];
// console.log(uniqueActivities);

// 5. Many dog breeds like to swim. What other activities do these dogs like?
// Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent"

const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(breed => breed.activities.includes('swimming')) //Find swimming breeds
      .flatMap(breed =>
        breed.activities.filter(activity => activity !== 'swimming')
      )
  ),
]; // filter out swimming to return other values
console.log(swimmingAdjacent);

// 6. Do all the breeds have an average weight of 10kg or more?
// Log to the console whether "true" or "false"

const averageWeight = breeds.every(breed => breed.averageWeight >= 10);
console.log(averageWeight);

// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities.
// Log to the console whether "true" or "false".

const hasActiveBreed = breeds.some(breed => breed.activities.length >= 3);
console.log(hasActiveBreed);

// BONUS : What's the average weight of the heaviest breed that likes to fetch
// HINT : Use the Math.max method along with the ... operator
const averageWeightFetch = breeds
  .filter(breed => breed.activities.includes('fetch'))
  .map(breed => breed.averageWeight);
const maxWeight = Math.max(...averageWeightFetch);
console.log(maxWeight);

const fetchWeights = breeds
  .filter(breed => breed.activities.includes('fetch'))
  .map(breed => breed.averageWeight);

const heaviestFetchBreed = Math.max(...fetchWeights);

console.log(fetchWeights);
console.log(heaviestFetchBreed);

// Challenge 5
/*
  Julia and Kate are still studying dogs, and this time they are studying if dogs are
  eating too much or too little.
  Eating too much means the dog's current food portion is larger than the
  recommended portion, and eating too little is the opposite.

  Eating an okay amount means the dog's current food portion is within a range 10%
  above and 10% below the recommended portion (see hint). */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//Your tasks:
/*  1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
  the recommended food portion and add it to the object as a new property. Do
  not create a new array, simply loop over the array. Forumla:
  recFood = weight ** 0.75 * 28. (The result is in grams of
  food, and the weight needs to be in kg) */

dogs.forEach(
  (dog, index) => (dogs[index].recFood = Math.floor(dog.weight ** 0.75 * 28))
);

/* 2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) */
console.log(dogs);
const sarahsDog = dogs.filter(dog => dog.owners.includes('Sarah'));
const fnEatTooMuch = dog => dog.curFood > dog.recFood;

sarahsDog.forEach(dog => {
  if (fnEatTooMuch(dog)) {
    console.log("Sarah's dog is fed too much");
  } else {
    console.log('Sarah is feeding too little');
  }
});

/* 3. Create an array containing all owners of dogs who eat too much
  ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
  ('ownersEatTooLittle').*/

const ownersEatTooMuch = dogs
  .filter(dog => fnEatTooMuch(dog))
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => !fnEatTooMuch(dog))
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);
console.log(ownersEatTooMuch);

/* 4. Log a string to the console for each array created in 3., like this: "Matilda and
  Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
  too little!" */
const fnReportOwners = owner => owner.reduce((acc, cur) => acc + ' and ' + cur);
console.log(`${fnReportOwners(ownersEatTooMuch)}'s dogs eat too much!`);
console.log(`${fnReportOwners(ownersEatTooLittle)}'s dogs eat too little!`);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs are eating too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs are eating too little`);

/* 5. Log to the console whether there is any dog eating exactly the amount of food
  that is recommended (just true or false) */
console.log(
  `Is it true that atleast one dog is eating the exact correct amount? ${dogs.some(
    dog => dog.recFood === dog.curFood
  )}`
);

/* 6. Log to the console whether there is any dog eating an okay amount of food
  (just true or false) */
//Eating an okay amount means the dog's current food portion is within a range 10%
//above and 10% below the recommended portion (see hint).

const fnOkayEating = dog =>
  dog.curFood <= dog.recFood * 1.1 && dog.curFood >= dog.recFood * 0.9;

dogs.forEach(dog =>
  console.log(`Is ${dog.owners}'s dog eating okay? ${fnOkayEating(dog)}`)
);

/* 7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.) */
const eatingOk = dogs.filter(dog => fnOkayEating(dog));
console.log(eatingOk);

/* Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them �
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion. */
// Test data:
//  const dogs = [
//  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//  { weight: 8, curFood: 200, owners: ['Matilda'] },
//  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//  { weight: 32, curFood: 340, owners: ['Michael'] },
//  ];
// GOOD LUCK �

// HE CHANGED THE COURSE VIDEOS BUT THE MATERIALS FOR THE COURSE CAHLLENGES ARE OUTDATED!
// He changed the test data too!
// HE WROTE 2 MORE CHALLENGES, THE BARSTOOL!

//8. Group the dogs into the following 3 groups :
// 'exact','too-much' and 'too-little' based on whether they
// are eating too much, too little, or the exact amount of food
// based on the recommended food portion
const dogsGroupedByPortion = Object.groupBy(dogs, dog => {
  if (dog.recFood === dog.curFood) return 'exact';
  if (dog.recFood < dog.curFood) return 'too-much';
  if (dog.recFood > dog.curFood) return 'too-little';
});
console.log(dogsGroupedByPortion);

// 9. Group the dogs by the number of owners they have
const dogsGroupedByOwners = Object.groupBy(
  dogs,
  dog => `${dog.owners.length}-owners`
);
console.log(dogsGroupedByOwners);

/* 10. Create a shallow copy of the 'dogs' array and sort it by recommended food
      portion in an ascending order (keep in mind that the portions are inside the
      array's objects �)*/
const dogsSorted = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
