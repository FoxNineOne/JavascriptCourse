'use strict';
/*
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
*/
// Data needed for first part of the section

const weekdays = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enahnced object literbals
  openingHours,

  // we don't need to write function anymore!
  order(startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    /*  console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );*/
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(`Main Ingredient : ${mainIngredient}`);
    if (otherIngredients.length > 0) {
      console.log(`Other Ingredient(s) : ${otherIngredients}`);
    }
  },
};

/*
restaurant.orderPizza('Egg', 'Bacon', 'Onion', 'Yoghurt', 'Kenneth');
restaurant.orderPizza('Fuck all');
*/
/*
// We passed one object into the function, not 4 arguments.
// They are in different order to the function
//
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',

  starterIndex: 2,
});

//Destructuring objects - uses curly braces!
const { name, openingHours, categories } = restaurant;
//console.log(name, openingHours, categories);

//what if we wanted variables names to differ from object?
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
//console.log(restaurantName, hours, tags);

//add default values if it doesn't exist ib Object.
// const { menu = [], starterMenu: starters = [] } = restaurant;
//console.log(menu, starters);

//mutating varaibles
let a = 111;
let b = 999;

const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
//console.log(a, b);

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
//console.log(o, c);

const arr = [7, 8, 9];

const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// "..." the spread operator
// it will take the values of  the arr Array and print them out
// without ... they'd be nested at index 2
const newArr = [1, 2, ...arr];
console.log(newArr);
console.log(arr);
console.log(...arr);

//taking the main menu from the restaurant object, and adding Gnocci!
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// we can only use spread operator where values are separated by commas.

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join two arrays together
const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(fullMenu);

// Iterables: arrays, strings, maps, sets

// Spread operator on string, splits each letter
const str = 'Jijo';
const letters = [...str, ' ', , 'S.'];
console.log(letters);
console.log(...str);
console.log(`${..str} Fox`);


*/
//whenever we need the elements of an array individually, then we can use the spread operator

// we can use spread values whenever we have multiple objects separated by commas
//

/*
const arr = [2, 'Jijo', 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

//destructuring an array , set 3 variables in one go
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

// Desconstructing array to reassign/swap around values.
// [main, secondary] = [secondary, main];
[main, secondary][(secondary, main)];

// Receive 2 return values from a function!
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//what if we have a nested array?
// NESTED DESTRUCTURING
const nested = [2, 4, [5, 6]];
//const [i, , j] = nested;
//console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

//Default values
const [p = 'Jijo', q = 'Jijo', r = 'Jijo'] = [8, 9];
console.log(p, q, r);
*/
/*
const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];

//Destructure the books array into two variables called firstBook and secondBook.
const [firstBook, secondBook] = books;
console.log(firstBook.title, secondBook.title);

//Destructure the books array into a variable called thirdBook.
//You must skip the first two books.
const [, , thirdBook] = books;
console.log(thirdBook.title);

// Below is the nested ratings array that contains two other arrays.
// Destructure the nested ratings arrays into  two variables
// called rating and ratingsCount.

// In the result of your destructuring,
// the ratings variable should store a number 4.19,
// and the ratingsCount variable should store a number 144584.

const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];

const [[, rating], [, ratingsCount]] = ratings;
console.log(rating, ratingsCount);

//Below is the ratingStars array.
// Destructure it into three variables called fiveStarRatings,
// oneStarRatings and threeStarRatings.
// Assign the threeStarRatings variable
// with a default value of 0.

const ratingStars = [63405, 1808];
const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
*/
/*
// SPREAD OPERATOR ...
const arr = [7, 8, 9];
// without a spread operator, your sill ass would be writing this
const baddNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(baddNewArr);

// we can split arrays using the ... spread operator
const newArr = [1, 2, ...arr];
console.log(newArr);
console.log(...newArr);

*/
/*
const newMenu = [...restaurant.mainMenu, 'Gnocci', 'Egg', 'Retards'];
//console.log(newMenu);

// the spread operator is similar t odestructuring
// the big difference is that it takes all the elements of the array
// but doesn't create new variables

//copy array
const mainMenuCopy = [...restaurant.mainMenu];

//join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);


// DESTRUCTURING

// the spread operator works on interables
// iterables are arrays, strings, maps, sets, but not objects
const str = 'ElJijo';
const letters = [...str, '', 'S.'];
console.log(...str);
console.log(`${letters}`);
*/
/*
const ingredients = [
  prompt(`Let's make pasta! Ingredient 1?`),
  prompt(`Ingredient 2?`),
  prompt(`Ingredient 3?`),
];
console.log(ingredients);
restaurant.orderPasta(...ingredients);
*/

// since ES2018, the spread operator also works on objects,
// even though objects are not interables

//Objects
/*
const newRestaurant = {
  ...restaurant,
  founder: 'Marco Salvotore',
  foundedIn: 1988,
};
//console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name);
console.log(restaurantCopy.name);

*/
/*
//
// REST PATTERNS
// Rest Patter somehow does opposite of the spread operator

// Spread operator passes multiple values into a function, or to build new arrays

//rest patter uses exact same syntax to collect multiple elements
// and pack them into an array

// SPREAD, because is right side of =
const arr1 = [1, 2, ...[3, 4]];

// REST, because on left side of=
const [a, b, ...others] = [1, 2, 3, 4, 5];

console.log(a, b, others);

//Rest pattern always must be last element
// There can only be in assignments.
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//Functions - map all paramaeters regardless of length into one array

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(2, 3, 5);
add(2, 3, 5, 45, 88, 4, 1);

//add together an array
const x = [23, 5, 7];
add(...x);


*/

/*
//Short circuiting OR
console.log('----------- OR -------------');
// Can use ANY data type
// Can return ANY data type
// short circuit evaluation - if the first value is a "truthy" value, it will be returned
// this is like COALESCE in SQL
console.log(4 || 'Jijo');

// jijo will be picked cos '' is a falsey value
console.log('' || 'Jijo');

//true will be picked
console.log(true || 0);

// null will be picked because it is last in the list.
console.log(undefined || null);

//Hello - the first truthy value in below condition
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

//restaurant.numGuests = 23;

// if there are no guests recorded (numGuests doesn't exist or = 0) then we can add default value
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//Both of these solutions will fail if number of guests = 0

// && Short Circuiting
console.log('----------- AND -------------');
// 0 will return, because it's falsey, short circuits when the first value is falsey, and returns without considering latter
console.log(0 && 'Jijo');
// when truth, evaluation continues and last value is returned
console.log(5 && 'Jijo');

console.log('Hello' && 23 && null && 'Jijo');

// practical example
// check if function exists, and then execute
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

// using Short Circuiting
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'chicken');

//The OR operator will return the first truth value, or last if all are falsey

// THE AND operator will return the first falsey value, or last value if all are truthy

// the OR is good for default values (coalesce)
// the AND can be used to execute code if the first value is truthy (if exists, run)
*/

/*
// NULLish coalescing operator
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish : null and undefined (not inc 0 or '')
const guestCorrect = restaurant.numGuests ?? 'Meow';
console.log(guestCorrect);

*/
/*
// Logical Assignment Operators

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//rest1.numGuests = rest1.numGuests || 10;
//rest2.numGuests = rest2.numGuests || 10;

//Using OR assignment operator (assigns value is current value is falsey)
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//Remember 0 is falsey - nullish assignment operator overcomes this
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//When there is an owner, let's replace with anonymous
// And operator short circuiting
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest1.owner = rest1.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
*/

/*
Looping over arrays! 
*/

/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//this loop will loop over array, and each aray will specify the element
//for (const item of menu) console.log(item);

// what if we wanted index?

for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

//we can then destructure, and make this cleaner

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

//each item is now an array with an index value!

// console.log([...menu.entries()]);
*/

//Enhanced Object Literals
// these were done in the restaurant object - Look up
// console.log(restaurant.openingHours);
/*
//OPTIONAL CHAINING
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//If a certain property doesn't exist, then undefined is returned immediately.

// WITHOUT OPTIONAL CHAINING - ERROR!
// console.log(restaurant.openingHours.mon.open);

// WITH OPTIONAL CHAINING ".?"
console.log(restaurant.openingHours.mon?.open || 'No Open?');
console.log(restaurant.openingHours?.mon?.open || 'No Monday?');
console.log(restaurant?.openingHours || 'No Opening Hours?');

//Example
const days = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at: ${open}`);
}

// Methods

// we can check if a method exists before calling it.
//exists
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// does not exist
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

//optional chaining on arrays , check if array is empty

const users = [{ name: 'Jiji', email: 'hello@jiji.co.uk' }];

console.log(users[0]?.name ?? 'User array Empty');
*/
/*
//property NAMES // Keys
const properties = Object.keys(openingHours);
//console.log(properties);
let openStr = `We are open ${properties.length} days a week: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}

//console.log(openStr);

// Properly VALUES
const values = Object.values(openingHours);
//console.log(values);

// entries are names + values together
//entries with objects returns keys and values

// Entire object
const entries = Object.entries(openingHours);
//console.log(entries);
for (const [day, { open, close }] of entries) {
  console.log(`On ${day}, we open at ${open} and close at ${close}`);
}


*/

// SETS!!!

// a set is a collection on unique values
// a set can never have any duplicates

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
// console.log(ordersSet);
//Set(3) { 'Pasta', 'Pizza', 'Risotto' }

//just like arrays, sets are iterables
// strings are also iterables

// console.log(new Set('Jijo'));
// Set(4) { 'J', 'i', 'j', 'o' }

// Sets use size, not Length to find the total amount
// console.log(ordersSet.size);

// Has is like "includes" in Arrays, you can check for a value
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));

//You can add to sets, like "Push"
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
// console.log(ordersSet);

// You can "pull" with delete
ordersSet.delete('Pasta');
// console.log(ordersSet);

// This will DELETE ALL
// ordersSet.clear();

// console.log('Jijo');
// Sets  are iterables therefore we can loop over them
for (const order of ordersSet) console.log(order);

// How do we retrieve values out of a set?
// There are no indexes
// There is no need to get data out of a set, because they are unique, and order does not matter
// We only need check if the set contains a value or no (has method)

// The main use case of sets is to remove duplicate values of arrays
//
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

let staffUnique = new Set(staff);
// console.log(staffUnique);

//convert Set to Array
staffUnique = [...new Set(staff)];
// Spread works on all iterables

// counting how many unique values
staffUnique = new Set(staff);
// console.log(staffUnique.size);

// console.log(new Set('JijoFox').size);

// Sets ARE NOT intended to replace arrays at all.
// this is true to when needing to handle orders, dupes and manipulate data
// Sets are good for unique values, but otherwise use Arrays

// sets have some new methods to make them useful!
// ES2025.. sets got 7 more methods

//

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'avocado',
  'tomatoes',
  'garlic',
]);

//Intersection , finds common elements between two sets
const commonFoods = italianFoods.intersection(mexicanFoods);
//console.log('Common Foods: ', commonFoods);
//This will note work with node.js as node.js currently supports up to ES2024.. run in live server for ES2025

//we can then turn set into an array
//console.log('Array Common Foods: ', [...commonFoods]);

//It also works on arrays, but you have to convert array to set
// then there's the limitation of duplication.

// JOIN TWO SETS WITH UNION!
const italianMexicanFusion = italianFoods.union(mexicanFoods);
//console.log('Union: ', italianMexicanFusion);

//Log all entries of each set with destructuring
// This will allow duplicates between the two datasets
//console.log([...italianFoods, ...mexicanFoods]);

//Difference
// Show all the items from Italian Set, which aren't found in Mexican set.
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
//console.log('Difference Italian: ', uniqueItalianFoods);

const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
//console.log('Difference Mexican: ', uniqueMexicanFoods);

//Symmetric Difference
// Shows the unique values of either dataset, excluding matches
const uniqueItalianAndMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);
//console.log('Unique Italian and Mexican Foods: ', uniqueItalianAndMexicanFoods);

//Is Subset of

// Is superset of

//Is disjoined from
// Returns false because there are items in both datasets that match
// Would return TRUE if they were wholly unique
//console.log(italianFoods.isDisjointFrom(mexicanFoods));

console.log('== MAPS ==');
// Maps are a lot more useful than sets
// A Map is a data structure we can use to map values to keys
//
//Maps can have any type of keys.. objects arrays,nested maps

//Easiest to create empty map
const rest = new Map();

rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Dordon, Warwickshire');

//console.log(rest);

// You can chain set commands at maps
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open 🦊')
  .set(false, 'We are closed 🥲');

//These are added after the console log above.. but do show on it

// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));

//create a var for current datetimestamp
let now = new Date();
// Use getHours to pull current hour
const time = now.getHours();

// compare current hour to opening  and closing hours.

//As we've set "We are Open" to true, it'll return if open
// "We are closed" is false.. so that will return outoside of hours
//console.log('It is currently: ', now, ' therefore..');
//console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// HAS - return true false if contains
console.log(rest.has('categories'));
// Remove from map with .delete
rest.delete('categories');
//console.log(rest.has('categories'));

//console.log('size: ', rest.size);

// DELETE ALL - CLEAR MAP
// rest.clear();

// we can infact use arrays or objects as map keys

//fails - this array being supplied may look the same, is a different object in memory
//rest.set([1, 2], 'Test');
//console.log(rest.get([1, 2]));

// to make work

const arr = [1, 2];

rest.set(arr, 'Test');
//console.log(rest.get(arr));

//You can add documetn
rest.set(document.querySelector('h1'));
//console.log(rest);

//Another way to populate map without set method
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct 🦊'],
  [false, 'Try Again 😱'],
]);

// console.log(question);

//this is the same structure as calling form object.entries
//easy way to convert from objects to Maps
// console.log(Object.entries(openingHours));

const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

//QUIZ
// console.log(question.get('question'));
//Maps are iterables, so for loops work
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer: ${key}: ${value}`);
}
//const answer = Number(prompt('Your Answer: '));
// console.log('You answered:', answer);
// console.log(question.get(answer === question.get('correct')));

// Sometimes we need to convert a map back to an array
// console.log([...question]);
// //same as?33
// console.log([...question.entries()]);

// console.log([...question.keys()]);
// console.log([...question.values()]);

// WHICH DATA STRUCTURE TO USE?

//  Sources of Data
// From the Program itself, data writted directly into source code (e.g status messages)
// From the UI: Data Input from the user or data written in DOM (tasks in todo app)
// From external sources: Data fetched for example from web API (Application Programming Interface)

// where do we store collection of data?
// Data structures?

// 4 built in data structures in js

// DO WE JUST NEED A SIMPLE LIST OF VALUES?
// YES: Array or Set

// DO WE NEED KEY/VALUE PAIRS?
// YES:  Object or Map

//The most common source from WEB API usually comes in JSON format
// These are key/value, so they are stored in Object

// Creating an array of objects is extremely common in js
// If you figure this out, surely G2 will be more understandables

/*

ARRAYS
- Arrays are good for values that you do not need a description on (no key)
- Use Arrays when you need ordered list of values (might contain duplciates)
- Use when you need to manipulate data

vs

SETS
- Use when you ned to work with unique values
- Use when high-performance is really important
- Use to remove duplicates from arrays

*/

/*
OBJECTS

- More "traditional" key/value store 
- Easier to write and read/ access values with . and []
- Most developers are used to objects
- Can include functions (methods)
- Use when working within JSON (can convert to map)

vs

MAPS
- Better Performance
- keys can be any data type
- easy to iterate
- easy to compute size
- Use when you simply need to map key to values
- Use when you need keys that are not strings

*/

//STRINGS
console.log('=== STRINGS ===');

const airline = 'FlyLo Flights';
const plane = 'A320';
/*
// using the index number to split string into arrays.. return one character
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);

//Works on strings directly
console.log('B737'[0]);

//Length works on strings
console.log(airline.length);
console.log('B737'.length);

//Strings also have methods, similar to array methods
// find first instance of F (Case sensitive)
console.log(airline.indexOf('F'));
// find last instance of F
console.log(airline.lastIndexOf('F'));

console.log(airline.indexOf('Flights'));

//What can we do with these indexes
// Good to extracts parts of strings with slice method, which needs index

//Slices off first three characters
console.log(airline.slice(3));

//with negative number, it goes right to left.. returns last 6 characters
console.log(airline.slice(-6));
console.log(airline.slice(6, -2));

// We can also specify and end slice, as well as a a start
// Slices off first three characters, and anything after 7th
console.log(airline.slice(3, 7));

// Pull back just the first word
// const endPoint = airline.indexOf(' ');
// console.log(airline.slice(0, endPoint));
console.log(airline.slice(0, airline.indexOf(' ')));
//Last Word
console.log(airline.slice(airline.lastIndexOf(' ') + 1));




const checkMiddleSeat = function (seat) {
  const seatRow = seat.slice(0, -1);
  const seatPosition = seat.slice(-1, seat.length);
  console.log(
    `You are on row ${seatRow}, and are ${
      seatPosition === 'B' || seatPosition === 'E'
        ? 'in the middle position 💀'
        : 'not in the middle position, lucky barstool 💺'
    }`
  );
};

checkMiddleSeat('11A');
checkMiddleSeat('23D');
checkMiddleSeat('2B');
checkMiddleSeat('17E');

// Whenever we call a method on a string
// JS will convert string proimitive to string object with same context
// called boxing.. takes arr string and puts it in a box

console.log(new String('Jijo'));
console.log(typeof new String('Jijo'));

// All string methods return primitives, even if called on a string object
// le example
console.log(typeof new String('Jijo').slice(1));
*/
// Changing case of a string

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//Fix Capitalization in name

const passenger = 'jIjO'; //Jijo
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passengerCorrect);

const correctNameCase = function (name) {
  name = name.toLowerCase();
  name = name[0].toUpperCase() + name.slice(1);
  console.log(name);
};

correctNameCase('jIJo');

// Comparing emails

// Make email string lower case, and remove any preceding or succeeding spaces NP characters

const email = 'hello@jiji.io';
const loginEmail = '  Hello@JiJo.Io \n';

const checkEmail = function (emailAddress) {
  /*
  emailAddress = emailAddress.toLowerCase();
  emailAddress = emailAddress.trim();
  */
  emailAddress = emailAddress.toLowerCase().trim();
  console.log(emailAddress);
  console.log(
    (emailAddress = email
      ? `Successful email entered 🦊`
      : `Email address not valid, please try again ⁉️`)
  );
};
console.log(loginEmail);
checkEmail(loginEmail);

//since ES2019, you can use trimStart() or trimEnd()
// like LTRIM and RTRIM in SQL c:

// REPLACE! (LIKE SQL REPLACE)
// In UK, we use period, so this lecture was weird.
// Crazy europeans and their weird ways
/*
const priceGB = '£288,97';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceGB, priceUS);

const announcement = `All Passengers come to boarding door 23. Boarding door 23!`;

// Replace will only update the first instance
console.log(announcement.replace('door', 'gate'));
// Replace ALL will replace ALL INSTANCES!
console.log(announcement.replaceAll('door', 'gate'));

// Regular Expressions are one of the most confusing topics of programming.
// case sensitive
console.log(announcement.replace(/door/g, 'gate')); //g stands for global

// 3 simple methods that return booleans
const plane2 = 'A320neo';

//Includes
console.log(plane2.includes('Airbus A320'));
console.log(plane2.includes('boeing'));

//startsWith
//endsWith
console.log(plane2.startsWith('Air'));
if (plane2.startsWith('A32') && plane2.endsWith('neo')) {
  console.log('Part of the new Airbus family');
}

// Practise exercise

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  console.log(`===========================`);
  console.log(`WELCOME!`);
  console.log(`You have declared: ${items}`);
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not permitted on board');
  } else {
    console.log('Welcome aboard Traveller');
  }
  console.log(`===========================`);
};

checkBaggage('I have a Laptop, some Food and a Pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got two flare guns and a Dirty Mag');

// SPLIT STRINGS
// Split allows us to split string into multiple parts based on divider string
// BIT LIKE CSV AINT IT?

// Splits the result into an array
console.log('a+very+nice+string'.split('+'));

// Common way to split name from a value
console.log('Jiji Fox'.split(' '));

const [firstName, lastname] = 'Jiji Fox'.split(' ');
console.log(firstName, lastname);

//JOIN into one string, and put spaces in between
const newName = ['Mr.', firstName, lastname.toUpperCase()].join(' ');
console.log(newName);

const passengerName = 'jessica ann smith davies';

const caseName = function (name) {
  let arrNameChars = name.split(' ');
  let correctedName;
  for (const names of arrNameChars) {
    correctedName = [
      correctedName,
      names.replace(names[0], names[0].toUpperCase()), //this alt method doesn't lower the remaining.. mine was better
    ].join(' ');
  }

  /*
for (const names of arrNameChars) {
    correctedName = [
      correctedName,
      names[0].toUpperCase() + names.slice(1).toLowerCase(),
    ].join(' ');
  }


  console.log(correctedName.trim());
};
*/
/*
caseName(passengerName);
caseName('jiji FOX the SLEEPIEST');

// Padding a string
// to add a number of characters to a string until it has a desired length

const message = 'Go to Gate 23!';
console.log(message.padStart(25, '!'));
console.log(message.padStart(35, '!').padEnd(50, '!'));

const maskCreditCard = function (number) {
  const str = number + ''; //String(number)
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(12356548));
console.log(maskCreditCard(4564831325646548));
console.log(maskCreditCard('4685452132132154649848'));

// REPEAT

// Allows is to repeat a string multiple times
// Returns as 1 string
const message2 = 'BAD WEATHER... ALL DEPARTURES DELAYED...';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(
    `There ${
      n == 1 ? 'is 1 plane' : 'are ' + n + ' planes'
    } in line ${'✈️'.repeat(n)}`
  );
};

planesInLine(6);
planesInLine(1);
planesInLine(10);


// concat
// reverse
//  Visit MDN for more string methods

*/

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

/*
  🔴 Delayed Departure from FAO to TXL 11h25)
  Arrival from BRU TO FAO (11h45) 
  🔴 Delayed Arrival from HEL  to FAO  (12h05)
  Departure from  FAO to LIS (12h30')
*/
/*
const formatFeed = function (flightFeed) {
  for (const message of flightFeed.split('+')) {
    const messageLine = message.split(';');
    if (messageLine[0]) {
      messageLine[0] = messageLine[0]
        .replaceAll('_', ' ')
        .replace('Delayed', '🔴 Delayed')
        .trim();
    }
    if (message[1] || message[2]) {
      messageLine[1] = messageLine[1].slice(0, 3).toUpperCase();
      messageLine[2] = messageLine[2].slice(0, 3).toUpperCase();
    }
    if (messageLine[3]) {
      messageLine[3] = messageLine[3].replace(':', 'h');
    }

    const returnStr = `${messageLine[0]} from ${messageLine[1]} to ${messageLine[2]} (${messageLine[3]})`;

    console.log(returnStr.padStart(45, '.'));
  }
};*/

const formatFeed = function (flightFeed) {
  for (const message of flightFeed.split('+')) {
    let [type, from, to, time] = message.split(';');
    const returnStr = `${type
      .replaceAll('_', ' ')
      .replace('Delayed', '🔴 Delayed')
      .trim()} from ${from.slice(0, 3).toUpperCase()} to ${to
      .slice(0, 3)
      .toUpperCase()} (${time.replace(':', 'h')})`.padStart(45, ' ');

    console.log(returnStr);
  }
};

formatFeed(flights);
