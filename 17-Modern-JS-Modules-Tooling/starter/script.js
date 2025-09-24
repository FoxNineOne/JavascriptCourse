//Importing module
//import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// import * as ShoppingCart from './shoppingCart.js';
/*console.log(`Importing Module`);

//shoppingCart log will print to console BEFORE the line3 console.log
//variables that are declared in a module are scoped to the module
// so the module itself is like the top level scope
// by default, this means that all top level variables are private inside of this vairable.

//This will fail as not defined
//console.log(shippingCost);

// if we want to use them in the script js we have to export them
// there is Named imports and Default exports
// Named is the simplest

//Named imports have to have the same name and be inside curly braces

//addToCart('bread', 5);
// ShoppingCart.addToCart('bread', 5);
//exports always need to happen in top level code, they can't be inside an if statement etc..

// Named exports are good for exporting multiple things

//console.log(totalPrice, totalQuantity);

//we can change name of inputs on importing or exporting module
//console.log(price, tq);
// console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

//We can also import all the exports of a mofule at the same time
// console.log(ShoppingCart);

//Basically, this is like exporting a public API like a class, the ShoppingCar is like an object created from a class, with methods.
// Module exports a kind of public API, cos everything else stays private inside of the module

// DEFAULT EXPORTS!
//When we use Default Exports when we want to export only one thing per module
//import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
import add, { cart } from './shoppingCart.js';
console.log(add);
add('pizza', 2);
add('bread', 5);
add('apples', 4);

// Best to use one export type per module

// Imports are a live connection to exports - the cart array was imported blank, but the add function is represented in the below log
console.log(cart);

//imoprts ARE NOT copies of exports.. they are live connections
// console.log('Start Fetch🐈');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// console.log('Finish Fetch🐟😺');
//Check video in last section, might be first video, useful, remind you things

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};
// calling an async function will always return a promise, not the data itself
const lastPost = getLastPost();
console.log(lastPost);
// Not very clean but works
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);

*/
// MODULE PATTERNS
// The main goal of a module pattern is to enacpsulate functionality to have private data
// and return values which can become our public API
/*
// IIFE
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart!
      (shipping cost is ${shippingCost})`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier.`);
  };
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
//Cannot access anything from this module in the console (global scope)
console.log(ShoppingCart2);

// this will return as error, as we chose not return shippingCost
console.log(shippingCost);
*/
//this is all possible due to closures
// Closures allow a function to have access to all variables that were present at its birthplace

// The issue with module patterns that we have is if
// we wanted one module per file, like we have with the ES6 modules,
// then we would have to create different scripts
// and link all of them in the HTML file.

// That can create a couple of problmes
//  we have to be careful with the order in which we declare them in HTML
// and we would have all of the variables living in the global scope.
// we also couldn't bundle them toegther using a module bundler

/*
//CommonJS modules

// commonJS modules are important because they have been used in Node.js for almost all of Node.js existence
// Almost all modules in npm still use the commonJS module system
// CommonJS  one file is one module


// we use export . [name of function]
// will not work in browser - would work in nodeJS

//export
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart!
      (shipping cost is ${shippingCost})`);
  };

// Import
const { addToCard } = require('./shoppingCart.js')
*/

import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
// console.log(state);
state.user.loggedIn = false;
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
state.user.loggedIn = true;
console.log(stateDeepClone);
