'use strict';
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear < 1996) {
      var millenial = true;
      const firstName = 'Geoff';
      const str = `You're a millenial, ${firstName}`;
      console.log(str);
      console.log(millenial);

      function add(a, b) {
        return a + b;
      }

      output = 'NEW OUTPUT';
    }
    console.log(millenial);
    //add(2, 3);
    console.log(output);
  }
  printAge();
  return age;
}

const firstName = `Shaheen`;
calcAge(1991);
console.log(firstName);


//variables
console.log(me);
//console.log(job);
//console.log(year);

var me = 'Shaheen';
let job = 'Student';
const year = 1991;

//functions
//console.log(addDecl(2, 3));
//console.log(addExpr(2, 30));
//console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}
const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log(`All products Deleted!`);
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
*
//console.log(this);

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};

calcAge(1991);

//Arrow functions do not get their own THIS keyword
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(1980);

const shaheen = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
shaheen.calcAge();

const sausage = {
  year: 2017,
};
//Copying function over to Sausage from Shaheen
sausage.calcAge = shaheen.calcAge;
// Although Shaneen has the function written,
// as it was copied to Sausage,
// the Sausage object is what
// "this" will reference
sausage.calcAge();

const f = shaheen.calcAge;
f();

var firstName = `Jijo`;
const shaheen = {
  firstName: `Shaheen`,
  year: 1991,
  calcAge: function () {
    //console.log(this);
    console.log(2037 - this.year);

    // SOLUTION 1
    //   // self will be a copy of this so isMillenial can handle it
    //   const self = this;

    //   const isMillenial = function () {
    //     console.log(self);
    //     //console.log(this.year >= 1981 && this.year <= 1996);
    //     console.log(self.year >= 1981 && self.year <= 1996);
    //   };
    //   isMillenial();
    // },

    //SOLUTION 2
    // An arrow function inherits the "this" from the parent scope.
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  //greet: () => console.log(`Hey ${this.firstName}`),
  greet: function () {
    console.log(`Hey ${this.firstName}`);
  },
};

shaheen.greet();
shaheen.calcAge();

YOU SHOULD NEVER EVER USE 
AN ARROW FUNCTION AS 
A METHOOD

THATS EVEN TRUE IF YOURE NOT USING THE 
THIS KEYWORD IN THE METHOD

//regular functions can also use arguments keyword, not just this

// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
//this can be useful when we need a function to accept more parameter than we specified
addExpr(2, 5, 8, 12);

//arrow functioin does not get argument keyword
var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

addArrow(2, 5, 8);

let age = 30;
let oldAge = age;
age++;
console.log(age);
console.log(oldAge);

const me = {
  name: `Shaheen`,
  age: 30,
};

const friend = me;
friend.age = 27;

console.log(`Friend:`, friend);
console.log(`Me:`, me);
*/
/*
There are  two things 

Primitices and Objects

Primitive Data Types
Numbers
Strings
Undefined
Null
Synbol
BigInt

Object Data Types
Object literal
Arrays
Functions


Objects are also called reference types
they are named on how they're stored in memory


Objects/refrence Types are stored in the memory heap
Primitives are stored in the call stack (in the execution context of where they are declared)


Copying an object is really just creating a new variable 
that points to the exact same object!

const is not always immutable.

COMING SOON 
- Protoytpal inhertence
- Event Loop
- How the DOM really works
*/

//Primitive types
let lastName = 'Williams';
let oldLastname = lastName;
lastName = 'Davis';
console.log(`lastName: ${lastName}`);
console.log(`OldLastName: ${oldLastname}`);

// Reference Types
const jessica = {
  firstName: `Jessica`,
  lastName: `Williams`,
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log(`Before Marriage: `, jessica);
console.log(`After Marriage: `, jessica);

// Copying objects
const jessica2 = {
  firstName: `Jessica`,
  lastName: `Williams`,
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

console.log(`Before Marriage: `, jessica2);
console.log(`After Marriage: `, jessicaCopy);

// Using object.assign only works on the first level
// If we have an object inside the object,
//   then this inner object will still be the same
/// point to the same place in the heap

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
