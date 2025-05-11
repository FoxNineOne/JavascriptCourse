'use strict';

/*
What is Object Oriented Programming?

OOP is programming paradigm on the concept of objects

We use objects to model (describe) real world or abstract features like a user, or to-do list item, a HTML element, data structure.
Objects can contain data (properties) and code (methods). By using objects,
we pack the data and coresponding behaviour into one block.

This makes it super easy to act directly on the data.

Blocks are what objects are meant to be

Objects are self contained pieces(blocks) of code, we then use these 
objects as building blocks of our applications, and make objects interact
with one another.

Interactions happen through a Public Interfact (API) methods 
that the code outside of the object can access and use to 
communicate with the object


Why does OOP exist? 
This was developed with the goal of organising code, to make it more fliexible
and easier to mantain

Before OOP, we mighjt have a bunch of code scattered across multiple functions,
or even in the fglobal scope without any strcture.
This is called Spagehetti code, which can be difficult to mantain large or complex code bases.

(sounds like things I've tried to work on before I jumped on this course.)

OOP is one of the most popular paradigms used in large scale software engineering.

Another type is functional programming - same goal to avoid spagehetti code.


Traditional OOP
Classes, like  a blueprint which can then be used to create new objects.
It is just a plan, it does not contain any data, but can create objects that will
(js does not support classes)

All objects created from a class are known as an instance of that class.
Instance is a real object we can use in our code, which is created from the class.
The class itself, is not an object.


//How do we design a class?

There is no single correct way of designing classes
but there are 4 princicpals that can help us

Abstraction - Ignore or hide details that don't matter, allowing us to get an overview perspective of the thing we're implementing, instead f messing with details that don't really matter to our implmeentation
Kinda like data work.. only store the data needed.

Encapsulation - Keep properties and methods private inside the class, so they are not accessible outside the class. 
Great examples would be user data, especailly passwords. 
Some methods can be exposed as a public interface (API)

Prevents external code from accidentally manipulating internal properties/state
Allows to change internal implmentation without the risks of breaking external code

Inhertiance - When we have two classes that are closesly related, we can have one class inherit from another. 
Child class extends parent class. 
A child class inhertis all the properties and methods from its parent class.
A child class can have it's own methods and properties (for example: admin user class will have more properties than user class)

Polymophism - A child class can overwrite a method it inhertied from a prent class.
In each class we write a new method of the same name as an inhertied method, and we can overwrite it.

*/
/* //OOP - Javascript Edition

//  How does OOP work in Javascript

In js we have prototypes, all objects are linked to a prototype object.

// protoypal inheritance
The prototype object contains methods and properties that all the objects linked can access and use
This is called protoypal inheritance.
Objects inherit methods and properties from the prototype.
This inhertiance differs from classic OOP inheritance, where that is basically an instance inherting from a class

// Delegation
We can also say objects delegate behaviour to the linked prototype object
Objects delegate their behaviour to the prototype
In Classic OOP the behaviour (methods) are COPIED from the class to the object.. this is different.

example: When we have used the array method "map" we are able to use map due to prototypal inheritance. "array,protype.map"
array.protype is the protoype object of all the arrays we create in javascript.
This protoype object contains all the methods like map, reduce, slice etc.
In a sense our array inherits the map method, or the array delegated the behaviour of mapping to its prototype



// How do we actiually create prototype? and how to we link objects to prototypes? Hjow can we create new objects without having classes?

//Constructor functions - a way of creating objects programmatically using functions
    This is how built-in objects lik arrays, maps or sets are actually implemented.

// ES6 Classes
    ES6 Classes are more modern way of doing OOP in js
    "Syntactic Sugar": behind the scenes, ES6 classes work exactly like constructor functions; 
        Basically just obstruction over constructor function. 
    Use prototypal inheritance.
    ES6 classes do NOT behave like classes in "Classical OOP"

// Object.create
    The easiest and most straightforward way of linking an object to a prototype object
    Not used often.

The 4 pillars of OOP are still valid and important here
*/

// Using Constructor Functions
// The only difference between a function and constructor function is that we call a constructor function with the "new" operator

//Constructor functions always start with a capital letter..
// Arrow functions do not work as consturctor functions.. as there is no this keyword.

const Person = function (firstName, birthYear) {
  // Instance properties - will be available on all instances created with this constructor function
  this.firstName = firstName;
  this.birthYear = birthYear;

  //methods - DO NOT CREATE A METHOD INSIDE OF CONSTRUCTOR FUNCTION
  // Each instance will have a copy of this function.. bad memory management
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jiji = new Person('Jiji', 1991);
// console.log(jiji);

// Behind the scenes 4 steps

// 1. A new empty object {} is created
// 2. Function is called, this = {}
// 3. Newly created object is linked to a protype
// 4. Object that was created in the beginning is automatically returned from constructor function

const matilda = new Person('Matilda', 2017);
const keith = new Person('Keith', 1999);

// console.log(matilda, keith);

//We've created 3 instances of person and can confirm this with the below:
//console.log(jiji instanceof Person); //returns true
//console.log(jiji.calcAge);

// PROTOTYPES
// console.log(Person.prototype);
// Each and every function in javascript automatically has a property called Prototype
// Every object that is created by a certain constructor function, will get access to all the methods and properties that we define on the constructor's prototype property

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// This isn't on the jiji object, but prototypal inheritance means we can call it!
// jiji.calcAge();

// This is much more performant, as to add the method in after stops it being copied to every instance object, yet they can all use the one that exists at constructor level

// Any object always has access to the methods and properties from its prototype
// console.log(jiji.__proto__);

// The protoype of the jiji obect is essentially the prototype property of the constructor function
// console.log(jiji.__proto__ === Person.prototype);
// console.log(Person.prototype.isPrototypeOf(jiji));
//Person . prototype is not actually the prototype of Person,
// but the prototype that will be used to objects created with the Person constructor function.

// we can also set properties on the prototype, which instances will inherit.
Person.prototype.species = 'Homo Sapiens';
// console.log(jiji);
// console.log(matilda);

// Inherited objects are not directly in the object, it's not its own property.
// Own properties are the only ones declared in the object directly iteself
// We can check for this

// console.log(jiji.hasOwnProperty('firstName')); //returns true - own property
// console.log(jiji.hasOwnProperty('species')); // returns false - inherited, protoyupe property, not object property

/* 

Person consturctor function
has a prototype property wqhich is an object, and inside that object, we define the calcAge method.
person.prototype has a refrence back to person, which is the consturctor property
person.prototoyupe.constructor is gonna point back to person itself
person.prototype is not the prototype of person, but all the objects that are created through the person function.


When we call a function with the new opersator, the first thing is
new empty object is created
then the this keyword is set to the new created object
thats why in the functions code, we set the birithyear and name on the this keyword.
doing so sets them on the new objects

the new object is now linked to the constructor function's prototype property (Person.prototype  jiji.__proto__)

The new wobject i9s returned from the function - unless we explicitlyreturn something else. In a constructor function like Person, we ususally never do that.

The result of the new operator and person  constructor function is a new object that we've created programittically.

This is useful because we can call jiji.calcAge(), even though it's not in the objects content. 
It is in the prototype, so calcAge works because of this. jiji inherits prototype, or Person delegated calcAge() to jiji.


This is essential for code performance, if there was 1000 instances, the alternative is the function being copied to each one, that's 1000 in heap.
So this way, there's 1 function, that can be accessed and executed by 1000 instances.



person.prototype itself is also an object
All objects in javascript have a prototype
The prototype for person.prototybe is object.prototype

Because person.prototype is just a simple object, which means it has been built by the object() constructor function.
This function is called behind the scenes whenever we create an object literal (an object with curly braces {} )

Person.prototype itself needs to have a prototype, so as it's an object, and created with Object() constructor, it is object.prototype

jiji.prototype => person.prototype => object.protoytype => null
This relationsip of protytpes is called the prototype chain

object.prototype is usually the top of the chain. 
Null marks the end of the chain.

Prototype chain is similar to scope chain, but for prototypes
In the scope chain, when js can't find a variable in a certain scope, it looks up to the next scope in the scope chain to find the variable there.
Prototype behaviour is the same here.

// hasOwnProperty
jiji.haswOwnProperty('name');

js is going to start looking for this method on jiji, but can't find it. 
It'll then look at Person.prototype. 
It is not there
It will then look into object.prototype, and will find it there.
hasOwnProperty is one of these stored methods. Therefore, this can be used.


*/
//Person..prototype
console.log(jiji.__proto__);
// object.prototype
console.log(jiji.__proto__.__proto__);
// NULL - nothying above object.prototype
console.log(jiji.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

// Prototype of arrays
const arr = [3, 6, 2, 4, 64, 4, 4, 5, 8, 5, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

//Add a new method to the prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};

// All arrays inherit this
// console.log(arr.unique());

// This isn't good practise but we can do it.. just not good practise

// const h1 = document.querySelector('h1');
// console.dir(h1);

//Prototype of a function

//console.log();
console.dir(x => x + 1);
