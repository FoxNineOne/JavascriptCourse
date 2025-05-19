'use strict'; /*

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
/*
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

Person.hey = function () {
  console.log(`Hey there👋🏽`);
  //console.log(this);
};

Person.hey(); // Returns

//jiji.hey(); //Does not return as it is not inherited.

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
*/
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
// Person.prototype.species = 'Homo Sapiens';
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
// Person..prototype
// console.log(jiji.__proto__);
// object.prototype
// console.log(jiji.__proto__.__proto__);
// NULL - nothying above object.prototype
// console.log(jiji.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// Prototype of arrays
const arr = [3, 6, 2, 4, 64, 4, 4, 5, 8, 5, 3];
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// Add a new method to the prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};

// All arrays inherit this
//console.log(arr.unique());

// This isn't good practise but we can do it.. just not good practise

const h1 = document.querySelector('h1');
// console.dir(h1);

//Prototype of a function

//console.log();
// console.dir(x => x + 1);

/*  CODING CHALLENGE  #1 */
/* 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h  */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const jijiCar = new Car('Civic', 180);

/* 2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console */

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(
//     `Acceleration applied on ${this.make}. New speed is ${this.speed} km/h`
//   );
// };

// jijiCar.accelerate();

/* 3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console */

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(
//     `Brakes applied on ${this.make}. New speed is ${this.speed} km/h`
//   );
// };

// jijiCar.brake();

/* 4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them */

// const matizCar = new Car('Matiz', 32);
// const sillyCar = new Car('Silly', 454);

// console.log(sillyCar);
// sillyCar.accelerate();
// sillyCar.accelerate();
// sillyCar.accelerate();
// console.log(sillyCar);

// const dataCar1 = new Car('BMW', 120);
// const dataCar2 = new Car('Mercedes', 95);

/* Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h

*/
// dataCar1.accelerate();
// dataCar2.brake();

// ES6 Classes

// Classes in js do not like classess in Java or C++
// Still implement prototypal inheritance
// Classes are just a special type of function, therefore we have expressions, and declarations

// Class Expression
// const PersonCl = class{}

// // Class Declaration
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   //writing methods inside the class, but outside the constructor
//   // will be on prototype of the object - not on the object iself.
//   // Prototypal inheritance!

//   // Instance Methods
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   //Commas are not used between method declarations
//   greet() {
//     console.log(`Hey ${this.fullName}!`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   //Setting a property that already exists
//   // Data validation - check if full name is supplied by looking for a space
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     // The underscore is to stop the max stack loop error.
//     else alert(`${name} is not a full name!`);
//   }
//   // as we had create a new variable, the below will return the fullname variable with updated value.
//   get fullName() {
//     return this._fullName;
//   }

//   // Static Methods
//   static hey() {
//     console.log(`Well, hello there 👋🏽`);
//     console.log(this);
//   }
// }

// const jessica = new PersonCl('Jessica Burger', 1996);
// console.log(jessica);
// console.log(jessica.__proto__ === PersonCl.prototype); // This acts like any other function constructor
// jessica.calcAge();

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}!`);
// };

// jessica.greet();

// const walter = new PersonCl('Walter White', 1965);

// 1) Classess are NOT hoisted, even if they're class declarations
// Functions are hoisted, wew can use them before they're declared in the code

// 2) Just like functions classess are first-class citizens.
// We can pass them into functions and return them from functions.

// 3) The code in a class is always executed in strict-mode

// Constructor or Class?
// Constructor functions are not deprecated, so constructors are fine to use
// It's personal preference currently.

// Don't use Classes if you don't understand prototypal inheritance.

//Classess can look tidier, as the methods can sit inside the declaration but outside the constructor.
// Constructors can become detached and a little less easier to read.

// GETTER AND SETTERS
/*
// Every object in js can have "getter" or "setter" properties,
// we call these special properties "assessor properties" whilst the other properties are called "data properties"

const account = {
  owner: 'Jiji',
  movements: [200, 250, 450, 120],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(movement) {
    this.movements.push(movement);
  },
};
console.log(account.latest); //called as a property, not a function

//This will push 50 to the movements array , rather than call the method
account.latest = 50;

console.log(account.movements);

console.log(jessica.age);

// Setters and Getters can be useful for data validation when creating a new object
// We don't need to use getter or setters but they are useful.

// STATIC METHODS

// Array.from is a static method

// Array.from converts an array like structure to an array
const arr1 = Array.from(document.querySelectorAll('h1'));
console.log(arr1);

// This method is a method that is attached to the array constructor
// We cannot use Array.from on an array

// This is because .from is attached to the constructor, and not the prototype property
// of the constructor
// Therefore all the arrays do not inherit this method

//Array.froim here is just a simple function that is attached to the array constructor
// The reason for this is so Developer know it's related to arrays
// We can also say the from method is in the Array namespace

// Therefore, from is static, and it is static on the array constructor.
// We usually use these as "helpers" that should be related to a certain constructor

PersonCl.hey();

//Static methods are not available on instances, but are still useful to implmenet a helper function about a class or constructor function

//OBJECT.CREATE

// Object.Create there is still the idea of prototypal inheritance, howewver there are no prototypal properties involved
// and also no constructor functions, no new operator

// Instead  we can use Object.create to manually set the prototype of an object to any object we want
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  // This looks like a constructor function but it's not
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;
console.log(steven);

steven.calcAge();
// Object.create is the least used way to implement prototypal inheritance, but it is still used.

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1978);
sarah.calcAge();
*/
/////////////////////////////////
// Coding Challenge #2
/////////////////////////////////
// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')

/* 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h  */
/*
// Class Declaration
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate = function () {
    this.speed += 10;
    console.log(
      `Acceleration applied on ${this.make}. New speed is ${this.speed} km/h`
    );
  };

  brake = function () {
    this.speed -= 5;
    console.log(
      `Brakes applied on ${this.make}. New speed is ${this.speed} km/h`
    );
  };
  // 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
  // by 1.6)

  get speedUS() {
    return this.speed / 1.6;
  }

  // 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
  // converts it to km/h before storing the value, by multiplying the input by 1.6)
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.brake();
ford.accelerate();
console.log(ford);
ford.speedUS = 50;
console.log(ford);
// § Data car 1: 'Ford' going at 120 km/h

// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter.

const civic = new CarCl('Civic', 160);
civic.accelerate();
civic.accelerate();
civic.brake();
console.log(civic.speedUS);
civic.speedUS = 200;
console.log(civic.speedUS);
console.log(civic);

*/

// Inheritance between classes
/*
// Creating a new class Student, that will inherit properties from Person
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); //this essentially copies the prototype properties of Person, "inheriting" them
  this.course = course;
};

// This has to come BEFORE any methods added /updated as it will wipe them if declared after
Student.prototype = Object.create(Person.prototype);
//We use object.create because we want to create a prototype object and inherit from Person,
// not directly link to Person.Protrtype which "Student.prototype = Person.prototype;"
// would achieve.

Student.prototype.constructor = Student;
//This will rename the constructor back to Student, otherwise the Prototype constructore will report back as "Person"

//
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);

mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.dir(Student.prototype.constructor);

console.log(mike instanceof Student); //Returns true
console.log(mike instanceof Person); // Returns true as Person > Student > mike


*/

/*************************************** */
// CODING CHALLENGE 3!
/*************************************** */
/*
// Your tasks:

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(
    `Acceleration applied on ${this.make}. New speed is ${this.speed} km/h`
  );
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(
    `Brakes applied on ${this.make}. New speed is ${this.speed} km/h`
  );
};

// 1. Use a constructor function to implement an Electric Car (called 'EV') as a child
// "class" of 'Car'. Besides a make and current speed, the 'EV' also has the
// current battery charge in % ('charge' property)

const EV = function (make, speed, charge) {
  this.charge = charge;
  Car.call(this, make, speed);
  {
    this.make = make;
    this.speed = speed;
  }
};

//Manually link prototype chain
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

// 2. Implement a 'chargeBattery' method which takes an argument
// 'chargeTo' and sets the battery charge to 'chargeTo'
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`${this.make}'s battery has been charged to ${this.charge}%.`);
};

// 3. Implement an 'accelerate' method that will increase the car's speed by 20,
// and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
// km/h, with a charge of 22%'
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `Acceleration applied on ${this.make}. New speed is ${this.speed} km/h with a charge of ${this.charge}%`
  );
};

// 4. Create an electric car object and experiment with calling 'accelerate',
// 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
// you 'accelerate'! Hint: Review the definiton of polymorphism �

// Test data:
// § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.accelerate();
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();

*/
/*
//INHERITANCE BETWEWEN ES6 CLASSES

//using extends will link prototype chain behind the scenes
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //With Class, we dont call, we use Super
    // Needs to happen first
    super(fullName, birthYear);

    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  //Override parent method
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${2047 - this.birthYear}!`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
*/
//INHERITANCE BETWEEN "CLASSES" and Object.create
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  // This looks like a constructor function but it's not
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
// StudentPrototype has a parent Prototype of Person
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// jay has Student Prototype
// Person > Student > jay chain established
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
*/
// ENCAPSULATION - PRIVATE CLASS FIELDS AND METHODS
// ES 2022!

// Private fields are the only way to hide fields, we can't do similar with constructor functions

// 1) Public Fields
// 2) Prviate Fields
// 3) Public methods
// 4) Private methods
// Static version of the above 4
// Static fields and methods are not accessible on the instance, they are not inherited.
// Only accessible on the class itself.

//Public interface (API) Public methods

// getMovements() {
//   return this.#movements; // NOT CHAINABLE - unless at end of chain as it's returning movements
// }

// deposit(val) {
//   this.#movements.push(val);
//   return this;
// }

// withdraw(val) {
//   this.deposit(-val);
//   return this;
// }

// //Private method time! Add a #!
// #approveLoan(val) {
//   // Fake method
//   return true;
// }
// requestLoan(val) {
//   if (this.#approveLoan(val)) {
//     this.deposit(val);
//     console.log(`Loan approved. Please check your balance.`);
//   }
//   return this;
// }
// // Not inherited
// static test() {
//   console.log('TEST');
// }

// const acc1 = new Account('Shaheen', 'GBP', 1111);
// console.log(acc1);
// acc1.deposit(250);
// acc1.withdraw(100);

// acc1.movements = []; //This will no longer reset the movements.. it will create a new property
// console.log(acc1);
// acc1.requestLoan(1000);

// console.log(acc1.#movements); can no longer access it!

// CHAINING METHODS

// const movements = acc1;

// acc1
//   .deposit(250)
//   .withdraw(100)
//   .withdraw(5)
//   .requestLoan(25000)
//   .withdraw(4000)
//   .getMovements();

// to do  this, we need to return the object itself at the end of  each method we want to be chainable
// These methods need to be called on an instance of the class
// For them to work via chaining, they need to "return this" to then allow the object to update,
// and the  next in the chain to access it
// console.log(movements);

/* *******************************
CODING CHALLENGE 4!
******************************* */

// Class Declaration
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(
      `Acceleration applied on ${this.make}. New speed is ${this.speed} km/h`
    );
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(
      `Brakes applied on ${this.make}. New speed is ${this.speed} km/h`
    );
    return this;
  }

  // 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
  // by 1.6)

  get speedUS() {
    return this.speed / 1.6;
  }

  // 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
  // converts it to km/h before storing the value, by multiplying the input by 1.6)
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
// child class of the 'CarCl' class

class EVCl extends CarCl {
  // 2. Make the 'charge' property private
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`${this.make}'s battery has been charged to ${this.#charge}%.`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is now going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const jiji = new EVCl('Honda Civic', 180, 90);
console.log(jiji);
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl'
// class. Then experiment with chaining!
jiji.chargeBattery(100).accelerate().chargeBattery(24).brake();

// Test data:
// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
const rivian = new EVCl('Rivian', 120, 23);
rivian.chargeBattery(56).accelerate().chargeBattery(105).brake().accelerate();
