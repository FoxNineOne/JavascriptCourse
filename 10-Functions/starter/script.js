'use strict';

// // DEFAULT PARAMETERS!

// const bookings = [];

// const createBooking = function (
//   flightNum = 'XX123',
//   //ES6  - Default values
//   numPassengers = 1,
//   // This only works as numPassengers is declared before Price.
//   price = 50 * numPassengers
// ) {
//   // This would also work.. ES5
//   //numPassengers = numPassengers ||   1;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// //createBooking('LH123');
// //createBooking('LH123', 2, 800);
// //createBooking('LH123', 3);

// // we cannot skip arguments to push default values.

// //FAILS
// // createBooking('LH123', , 3);

// //WORKS
// //createBooking('LH123', undefined, 3);

// // HOW PASSING ARGUMENTS WORK!
// const flight = 'SS234';
// const jiji = {
//   name: 'Jiji Fox',
//   passport: 4567896544,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 4567896544) {
//     alert('Check in!');
//   } else {
//     alert('Wrong Passport Number!');
//   }
// };

// //checkIn(flight, jiji);
// //console.log(flight);
// // the flight didn't change

// //console.log(jiji);
// //The jiji.name value has changed because of the function

// // When we pass a reference type to a function
// // what is copied, is just a reference to the object in memory heap
// // but they both point to the same object in memory
// // Hence Jiji.name being overwritten!
// // Whatever we change

// // when we pass an object to a function, it is just like copying an object
// // it is still referencing the same object in the memory heap
// //whatever we change in the copy, will change in the original

// // we need to be mindful of this behaviour

// // It's the same as doing

// // Because they both are the same object in the memory heap!!
// // In summary: Passing a primitive type to a function
// // Is really just the same as creating a copy, outside of the function
// // The value is simply copied
// const flightnum = flight;

// // However, when we pass an object to a function it is really just like copying an object like this.
// // Whatever we change in the copy, will change in the original
// const passenger = jiji;

// // I keep writing this, because it makes sense, but I don' truly understand it yet

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000);
// };

// //console.log(jiji);
// newPassport(jiji);
// //console.log(jiji);
// //checkIn(flight, jiji);

// // Javascript DOES NOT HAVE passing by reference
// // Only passing by value

// // There are languages like C++ where you can
// // pass a reference to any value, instead of the value itself
// // This works with primitives, but does not work with objects

// // First Class and Higher Order Functions

// /*
// FIRST CLASS FUNCTIONS
// JS is a language that has first class functions
// JS treats functions as first-class citizens
// This means that functions are simply values
// Functions are just another "type" of object

// Since functions are values, there's a bunch of things we can do
// like storing them in variables, or object properties

// We can pass functions as arguments to other functions
// We do this with event listeners and event handlers to DOM objects

// We can also return a function form another function
// Functions are objects, many objects have methods

// Functions have methods!
// */
// /*
// HIGHER-ORDER FUNCTIONS
// A function that receives another function as an argument,
// that returns a new function, or both.

// This is only possibly beacuse of the first-class
// functions
// */

// // Function that receives anothe rfunction

// // const greet = () => console.log('Hey Jijo');
// // btnClose.addEventListener('click', greet)

// //addEventListener can be a higher order functions
// // greet is a callback functions
// // That's because the callback function
// // will be called later by the addEventListener,
// // as soon as the click Event happens

// // We can also have functions that will
// // return other functions
// //
// /*
// //Higher-order function
// function count() {
//   let counter = 0;
//   // returned function
//   return function () {
//     counter++;
//   };
// }
// */
// // There seems to be confusion between first-class and higher order

// // thgey mean diferent
// // First Class is a feature a programming language has, or doesn't have
// // All it means is that all functions are values

// // There are no first-class functions in practise

// // There are howevher higher order functions in practise
// // which as possible, because the langage supports first-class functions
// /*
// const oneWord = function (str) {
//   return str.replaceAll(/ /g, '').toLowerCase();
// };
// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //Higher order function
// const transformer = function (str, fn) {
//   console.log(`String: ${str}`);
//   console.log(`Transformed String: ${fn(str)}`);
//   // return the function's name!
//   console.log(`Transformed By: ${fn.name}`);
// };
// // we call the function we pass into another function the "Callback function"
// // because we do not call them ourselves, but tell Javascript
// // to call them later
// transformer('JavaScript is the best', upperFirstWord);
// transformer('JavaScript is the best', oneWord);
// */
// //js uses callbacks all the time.
// const foxInvasion = function () {
//   console.log('🦊');
//   document.body.append('🦊');
// };

// document.body.addEventListener('click', foxInvasion); /*
// ['Jonas', 'Martha', 'Adam'].forEach(foxInvasion);
// */
// // callbacks allow us to makes it easy to split up code into more resable
// // and inter-connected parts
// // call back functiosn allow us to create abstraction
// // we hide the detail of code implementation because we don't really care about
// // all that details
// // this allows us to think at a higher, more abstract leve

// //transformer doesn't care about the detail of the string transformation
// // it just needs a string, and a function that will process the string
// // how isn't a care for transformer
// /*
// const jijiIsCool = function (nameStr) {
//   if (nameStr.toLowerCase() === 'jiji') {
//     //console.log('Jiji is cool');
//     return 'Jiji is cool';
//   } else {
//     //console.log('You are no Jiji, Jiji is cool');
//     return 'You are no Jiji, Jiji is cool';
//   }
// };

// const bigBoi = function (fn, str) {
//   console.log(`String supplied: ${str}`);
//   console.log(`Function applied: ${fn.name}`);
//   console.log(`String returned: ${fn(str)}`);
// };

// bigBoi(jijiIsCool, 'JIJI');
// bigBoi(jijiIsCool, 'FIJI');
// */
// //Functions returning functions

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// // Stored function to a const
// const greeterHey = greet('Hey');

// // We can now call the const like a function
// //greeterHey('Jijo');
// //greeterHey('Eggo');

// //This works because of closure
// // complex and difficult to understand

// //This will satisfy both leverls of the parameter and run the function,
// // returning the inner function
// //greet('Ey up')('Uth');

// //Reducing the above function to an arrow function
// //const greet2 = greeting => name => console.log(`${greeting} ${name}`);
// //greet2('Hello')('Jijo');

// //Call and Apply methods

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   //Object linteral function
//   book(flightNum, name) {
//     console.log(
//       // this is used to reference the lufthansa object
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// //lufthansa.book(239, 'Jijo Fox');
// //lufthansa.book(666, 'Lance Vance');

// const book = lufthansa.book;

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
//   //  book: lufthansa.book,
// };

// //eurowings.book(789, 'Graham Davies');

// // Call, Apply, and Bind

// // CALL
// //book.call(eurowings, 23, 'Sausage McTurd');
// //console.log(eurowings);

// // We didn't call the book function, we called the CALL method,
// // with the THIS method, set to eurowings , so whatever is passed as the
// // first arugment of the call method will declare the this keyword.

// //Then the followign arguments are simply the required arguments
// // for the inital function

// //book.call(lufthansa, 288, 'Doris GravyLegs');
// //console.log(lufthansa);

// const ryanair = {
//   airline: 'RyanAir',
//   iataCode: 'RY',
//   bookings: [],
// };

// book.call(ryanair, 488, 'Zorro');
// console.log(ryanair);

// // There is a similar method, called the Applied method
// // Same thing, except Apply doesn't receive  a list arguments after the
// // this keyword, it will take an array instead.

// const flightData = [583, 'George Cooper'];
// // book.apply(ryanair, flightData);

// // The apply method isn't used often in modern js
// // we hav a better way of doing the exact same thing

// //Using the spread operator and call method 🦊
// book.call(ryanair, ...flightData);

// // THE BIND METHOD!
// //Bind does not call the function, it returns a new function

// // Bind also allows us to manually set the this keyword for any function call
// // the difference is that bind does not immediately call the function

// //This will create a new function with the "this" permanently set to eurowings
// const bookEW = book.bind(eurowings);
// // The parameter are back to just being arguments to pass objects
// bookEW(1, 'PLOPPO!');
// console.log(eurowings);

// const bookLu = book.bind(lufthansa);
// const bookRy = book.bind(ryanair);
// bookRy(322, "Ryan's hair");
// console.log(ryanair);

// bookLu(775, 'Hoffen Heifen!');
// console.log(lufthansa);

// //in the call method, we cna pass mulutple arguments and the this
// // in the bind, we can do the same, and these arguments are set in stone
// //Permanently set flight number to 23
// const bookEW23 = book.bind(eurowings, 23);

// //Now we only need to supply the name
// bookEW23('Kreepy Keith');
// bookEW23('Carol with the big personalities');

// //This allows us to set in stone certain arguments to make functions even easier

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// //in an event handler function, the "this" keyword always points
// // to the element it's attached to.

// //Bind is used here instead of call because..
// // Call will calls the function, but we need to pass in a function,
// // Bind will return a new function, so that is what we need

// // Partial application
// // Many times are are not even interested in the this keyword,
// // But we still use bind for this, all right?

// //partial application means we can preset parameters
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));
// const addVAT = addTax.bind(null, 0.23);
// // const addVAT =  value => value + value * 0.23;

// console.log(addVAT(50));

// // be mindful the order the parameters are supplied to functions
// // the ones you can/want to default, you should have at the start.

// //CHALLENGE

// /**
//  And actually now I have a nice challenge for you

// which is to essentially
// rewrite this whole example here,
// but using the technique of one function returning another function.

// So we have one lecture about that
// and maybe you can go back and take a look at that.

// create a function that can return a function
// which will do just what this one (add Tax) does.
// */

// const addTaxVal = function (value) {
//   return function (rate) {
//     return value + value * rate;
//   };
// };

// // Stored function to a const
// const testTax01 = addTaxVal(200);
// console.log(testTax01(0.25));

// */

//immediately invoked function expression (IIFE)
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

//Function is now an expression - not assigned to a variable, just a function value/expression
(function () {
  console.log('This will never run again');
  //const isPrivate = 23;
})(); //we immediately call it. IIFE!

//Arrow Function IIFE
(() => console.log('This will also never run again'))();

//Why?
/*
Functions create scopes, and one scope does not have access to variables from an inner scope

All data inside a scope is private.. 
isPrivate (425) is inside the function on (423)

This allows for data privacy, and protection from overwriting values
*/

// let or const create their own scopeblock

{
  const isPrivate = 23;
  var isNOTPrivate = 45;
}
//console.log(isPrivate);
console.log(isNOTPrivate); //var ignores

// If we want to create a new scope for data privacy, we can simply create a new block.
// If you need to invoke a method just once, IIFE is great for this.

// CLOSURES!

// Apparently this is the hardest concept to understand.

//we don't create closures manually, it simply happens automatically in certain situations

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(
      `${passengerCount} ${passengerCount === 1 ? ' passenger' : ' passengers'}`
    );
  };
};

const booker = secureBooking();
// Although the secureBooking() EC has finished execution, (the execution context is no longer on the stack)
// the passengerCount is still in Memory and values are added to if you keep calling the function

// A closure, makes a function remember all the variables that existed at the functions birthplace
// SecureBooking is the birthplace of the function.
//This apparently cannot be explained with the scope chain alone.

booker(); // 1 passenger
booker(); // 2 passegners
booker(); // 3 passengers

//The execuion context of the secureBooking was popped off the callstack after that function finished running,
// together with its variable environment
// This envirnoment which contains the passengeger Coutn is still stored in memoy.

//Why?
//  Usually with garbage collection, variables that are stored in the stack are destroyed as soon as the execution  pops off the stack?
// One exception is the existence of a closure.

// if an object is reachable by a closure it cannot be gargbage collected, and will stay in the heap indefinitely
// and this applies to objects in the heap, and variable environments for variable environments for variables that are stored in the stack
// as long as they're reachable by a closure.

//So how do we access the passengerCount?

// Any function always has access to the variable environment of the execution context
// in which the function was created
// Booker was created in the execution context of secureBooking, therefore Booker will get access to the variable environment of secureBooking
// This is how the Booker function can read and manipulate the passengerCount variable
// This is the closure
