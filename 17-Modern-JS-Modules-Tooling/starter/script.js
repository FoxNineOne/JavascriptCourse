//Importing module
//import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// import * as ShoppingCart from './shoppingCart.js';
console.log(`Importing Module`);

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
