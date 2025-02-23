/*
// activating strict mode >.<
'use strict';

// strict mode forbids certain things, such as:
// set values to undeclared variables (helps find typos!)
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log(`I can drive!`);
if (!hasDriversLicense) console.log(`Better get a bus pass!`);


// Reserved words that can't be used as variable names
// const interface = `Audio`;
// const private = `534`;
// const if = 46;



'use strict';


// a function is a piece of code we can reuse over and over
// variable holds value, a function holds code

function logger() {
    console.log(`My name is Shaheen`);
}

//invoking / calling / running the function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples, and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
//console.log(appleJuice);
console.log(fruitProcessor(5, 0));


const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);



'use strict';
// Function declaration
function calcAge1(birthYear) {
    return 2037 - birthYear;
}
const age1 = calcAge1(1991);

// Function expression
// if function returns a value, we can store function as a variable!
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}
const age2 = calcAge2(1991);
console.log(age1, age2);

/*
Function declarations can be called before the function is written.
Function expressions must be declared before calling.

Aim to use function expression, as you'll then declare functions before calling.
Easier to read


'use strict';
// Function declaration
function calcAge1(birthYear) {
    return 2037 - birthYear;
}


// Arrow function
//             = parameter => code
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);


const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    //return retirement;
    return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, 'Shaheen'));
console.log(yearsUntilRetirement(1980, 'Bob'));


/*
    Which functions to use?

Arrow functions do not get a this keyword, so we'll learn later what is best.
Arrows are great for 1 liners (like line 85)



// Functions using functions
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} pieces of apple, and ${orangePieces} pieces of orange.`;
    return juice;
}

console.log(fruitProcessor(22, 13));


const currentYear = 2024;

const calcAge = function (yearBirth) {
    return currentYear - yearBirth;
}

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear)
    const retirement = 65 - age;
    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years`);

    } else {
        console.log(`${firstName} has already retired`);
    }
    //return retirement;
    //return
}

console.log(yearsUntilRetirement(1991, `Shaheen`));
console.log(yearsUntilRetirement(1950, `Mike`));

*/

// 1
// Create an arrow function calcAverage to calculate the average of 3 scores.
// This function should have three parameters and return a single number(the average score).
/*
function calcAverage(a, b, c) {
    const averageScore = (a + b + c) / 3;
    return averageScore;
}


// Arrow function
//             = parameter => code
const calcAverage = (a, b, c) => (a + b + c) / 3;


// 2
// Create two new variables — scoreDolphins and scoreKoalas,
// and assign the value returned from the calcAverage function to them(you will need to call this function, and pass scores as arguments).

let scoreDolphins = calcAverage(44, 23, 71)
let scoreKoalas = calcAverage(65, 54, 49)

//console.log(`Dolphins: ${scoreDolphins}, Koalas: ${scoreKoalas}`);

// 3
// Create a function checkWinner that takes the average score of each team as parameters
//  (avgDolphins and avgKoalas),
//  and then logs the winner to the console, together with the victory points,
//  according to the rule above.Example: Koalas win(30 vs. 13)
//  (use avgDolphins and avgKoalas instead of hard - coded values).


function checkWinner(avgDolphins, avgKoalas) {
    if (scoreDolphins > scoreKoalas) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`)
    } else if (scoreDolphins === scoreKoalas) {
        console.log(`No team wins...`);
    } else {
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    }
}


// 4
// Use the checkWinner function to determine the winner for both DATA 1 and DATA 2.
// Round 1
checkWinner(scoreDolphins, scoreKoalas);
// Round 2
scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 24, 27);
checkWinner(scoreDolphins, scoreKoalas);
// 5
// Ignore draws this time.Instead, log No team wins... to the console if there is no winner




'use strict';

// ARRAYS!
// const friend1 = 'Michael';
// const friend2 = 'Steven';
// const friend3 = 'Peter';



const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);


const years = new Array(1991, 1984, 2008, 2020);
console.log(years);

console.log(friends[0]);
console.log(friends[2]);
// ".length" Returns HOW MANY elements are in an array
console.log(friends.length);
//".length - 1" can pull back last element in an array
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';

console.log(friends);


//Arrays can mutate as const variable. But you can't do a "Vegetables = [Sausage] as that's an illegal move.

const shaheen = ['Shaheen', 'Shaikh', 2024 - 1991, 'Data guy', friends];

console.log(shaheen);



// Function declaration
const calcAge1 = function (birthYear) {
    return 2037 - birthYear;
}
const years = [1990, 1967, 2002, 2010, 2018];


const age1 = calcAge1(years[0]);
const age2 = calcAge1(years[1]);
const age3 = calcAge1(years[years.length - 1]);

console.log(age1, age2, age3);
const ages = [calcAge1(years[0]), calcAge1(years[1]), calcAge1(years[years.length - 1])]
console.log(ages);



'use strict';

const friends = ['Michael', 'Steven', 'Peter'];

// Add elements
const newLength = friends.push('Jay');        // Adds to array!
// friends.push('Keith', 'Kenneth');        // Adds to array!
console.log(friends);
console.log(newLength);

friends.unshift('John');                //Adds Value to front of the array
console.log(friends);

// Remove elements
friends.pop();                          //Last element gets removed
const removedFriend = friends.pop();    //Last element gets removed, logs out the value removed
console.log(removedFriend);
console.log(friends);

friends.shift();                                    //First element in array gets removed
console.log(friends);

friends.push(23);
console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Vic'));               // -1 is returned when no match is found
console.log(friends.includes('Steven'));         // returns a true/false if match is found or not
console.log(friends.includes('Creepy Pete'));
console.log(friends.includes('23'));                // type coercion doesn't work here uth

if (friends.includes('Steven')) {
    console.log(`There is a Steven among us.. get your knives and bats!`);
}



'use strict';
const calctips = (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}
console.log(calctips(555));

const bills = [125, 555, 44];
const tips = [calctips(bills[0]), calctips(bills[1]), calctips(bills[2])];
//tips.push = bills[1];
//tips.push = bills[bills.length - 1];

console.log(bills);
console.log(tips);
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(totals);



'use strict'


const shaheenArray = [
    'Shaheen',
    'Shaikh',
    2024 - 1991,
    'Musician',
    ['Ritchie', 'Chaz', 'Jay']
];

const shaheen = {
    firstName: "Shaheen",
    lastName: "Shaikh",
    age: 2024 - 1991,
    job: 'musician',
    friends: ['Ritchie', 'Chaz', 'Jay']
};

console.log(`Name: ` + shaheen.firstName + ' ' + shaheen.lastName);
// console.log(shaheen['lastName']);

const nameKey = 'Name';
console.log(shaheen['first' + nameKey]);
console.log(shaheen['last' + nameKey]);

// When we need to first compute the propertyname, then use bracket notation
// This is useful for software when a choice commands what data to retrieve.

//const interestedIn = prompt(`What do you want to know about Shaheen? Choose between firstName, lastName, age, job and friends`);

// if (shaheen[interestedIn]) {
// console.log(shaheen[interestedIn]);
// } else {
// console.log(`Refresh, Choose between firstName, lastName, age, job and friends`);
// };


// add new properies to object!
shaheen.location = 'Derby';
shaheen['twitter'] = '@jijithefox';
console.log(shaheen);


// Challenge
// "Shaheen has 3 friends and his best friend is called Ritchie" //first friend is best friend.

//console.log(shaheen.friends.length);
//console.log(shaheen['firstName']);      // Remember to put the output in string! quote dat!
console.log(`${shaheen.firstName} has ${shaheen.friends.length} friends, and his best friend is called ${shaheen.friends[0]}`);

'use strict'

const shaheen = {
    firstName: "Shaheen",
    lastName: "Shaikh",
    birthyear: 1991,
    job: 'musician',
    friends: ['Ritchie', 'Chaz', 'Jay'],
    hasDriversLicense: true,
    // functions can be placed into objects.
    // any function that is attached to an object, is called a method
    // calcAge: function (birthYear) {
    //     return 2024 - birthYear;
    // }
    calcAge: function () {
        console.log(this);
        this.age = 2024 - this.birthyear;
        return 2024 - this.birthyear, this.age
    }

};

// two ways to call it
console.log(shaheen.calcAge());
console.log(shaheen['calcAge']());
console.log(shaheen['calcAge']());


console.log(shaheen.age);


// Challenge
// "Shaheen is a 32-year old musician, and he has a driver's license"

'use strict'


const shaheen = {
    firstName: "Shaheen",
    lastName: "Shaikh",
    birthyear: 1991,
    job: 'musician',
    friends: ['Ritchie', 'Chaz', 'Jay'],
    hasDriversLicense: true,

    calcAge: function () {
        //console.log(this);
        this.age = 2023 - this.birthyear;
        return 2023 - this.birthyear, this.age
    }
    , getSummary: function () {
        //this.firstName = firstName;
        //return this.firstName + " is a " + this.age + "-year old " + this.job + ", and he has " + (this.hasDriversLicense ? 'a ' : 'no ') + "driver's license";
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a ' : 'no '}driver's license`
    }

};
shaheen.calcAge();
//shaheen.hasDriversLicense = false;
//console.log(` ${shaheen.firstName} is a ${shaheen.age}-year old ${shaheen.job}, and he has ${shaheen.hasDriversLicense ? 'a ' : 'no '}driver's license`);
console.log(shaheen.getSummary());



'use strict';

// CHALLENGE
//BMI = mass / (height * height)

const mark = {
    firstname: "Mark"
    , lastname: "Miller"
    , fullName: function () {
        return this.firstname + " " + this.lastname
    }


    , mass: 78
    , height: 1.69
    , calcBMI: function () {

        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

// console.log(mark);
// console.log(mark.fullname());
// console.log(mark.calcBMI());


const john = {
    firstname: "John"
    , lastname: "Smith"
    , fullName: function () {
        return this.firstname + " " + this.lastname
    }
    , mass: 92
    , height: 1.95
    , calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

// "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!".

john.calcBMI();
mark.calcBMI();


if (john.bmi > mark.bm) {
    outCome = `${john.fullName()}'s BMI(${john.bmi}) is higher than ${mark.fullName()}'s (${mark.bmi})!`;
} else if (mark.bmi > john.bmi) {
    outCome = `${mark.fullName()}'s (${mark.bmi}) is higher than ${john.fullName()}'s BMI(${john.bmi})!`;
}






// Loops

// console.log(`Lifting weights repetition 1 🏋️`);
// console.log(`Lifting weights repetition 2 🏋️`);
// console.log(`Lifting weights repetition 3 🏋️`);
// console.log(`Lifting weights repetition 4 🏋️`);
// console.log(`Lifting weights repetition 5 🏋️`);
// console.log(`Lifting weights repetition 6 🏋️`);
// console.log(`Lifting weights repetition 7 🏋️`);
// console.log(`Lifting weights repetition 8 🏋️`);
// console.log(`Lifting weights repetition 9 🏋️`);
// console.log(`Lifting weights repetition 10 🏋️`);

//initial value of counter ; the true condition to keep loop running ; increase counter {}
// for loops keeps running while condition is TRUE
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋️`);
}



const shaheen = [
    'Shaheen',
    'Shaikh',
    2024 - 1991,
    'Musician',
    ['Ritchie', 'Chaz', 'Jay']
    , true
];
const types = [];

for (let i = 0; i < shaheen.length; i++) {
    // Reading for shaheen Array
    console.log(shaheen[i], typeof shaheen[i]);

    // Filling types array
    //types[i] = typeof shaheen[i];
    types.push(typeof shaheen[i]);
}

console.log(types);


let currentDate = new Date(); //Pull current date
const currentYear = currentDate.getFullYear(); //pull year from current date
const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(currentYear - years[i]);
}

console.log(ages);




// continue and break

const shaheen = [
    'Shaheen',
    'Shaikh',
    2024 - 1991,
    'Musician',
    ['Ritchie', 'Chaz', 'Jay']
    , true
];

console.log('--- ONLY STRINGS ---');
for (let i = 0; i < shaheen.length; i++) {
    // Reading for shaheen Array
    if (typeof shaheen[i] !== 'string') continue; //if type of is not a string, then continue (skip iteration)
    console.log(shaheen[i], typeof shaheen[i]);

}

console.log('--- BREAK WITH NUMBER ---');
for (let i = 0; i < shaheen.length; i++) {
    // Reading for shaheen Array
    if (typeof shaheen[i] === 'number') break; //if type of is not a string, then continue (skip iteration)
    console.log(shaheen[i], typeof shaheen[i]);

}



//LOOP ARRAY BACKWARDS

const shaheen = [
    'Shaheen',
    'Shaikh',
    2024 - 1991,
    'Musician',
    ['Ritchie', 'Chaz', 'Jay']
];

for (i = shaheen.length - 1; i >= 0; i--) {
    console.log(i, shaheen[i], typeof shaheen[i]);
}


// LOOP INSIDE A LOOP

for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`------ Starting Exercise ${exercise}`);

    for (let rep = 1; rep < 6; rep++) {
        console.log(`Exercise ${exercise}: Lifting weights repetition ${rep} 🏋️`);
    }

}

// the WHILE Loop!



// for (let rep = 1; rep <= 10; rep++) {
// console.log(`For: Lifting weights repetition ${rep} 🏋️`);
// }
// 
// let rep = 1
// while (rep <= 10) {
// console.log(`While: Lifting weights repetition ${rep} 🏋️`);
// rep++;
// }

//I could never get this to work.. it just crashed browser inf

let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log(`Loop is about to end...`);
};

console.log(`Finally! a ${dice}!`);

*/

const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

/* Write your code below. Good luck! 🙂 */


const bills = [
    22
    , 295
    , 176
    , 440
    , 37
    , 105
    , 10
    , 1100
    , 86
    , 52
];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
    //tips.push(calcTip(bills[i]));
    //totals.push(bills[i] + tips[i]);

    const tip = calcTip(bills[i]);
    tips.push(tip);
    totals.push(tip + bills[i]);
}

console.log(bills, tips, totals);

// console.log(`Bills: ${bills}`);
// console.log(`Tips: ${tips}`);
// console.log(`Totals: ${totals}`);


let sum = 0;

const calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum / arr.length;
};

//console.log(calcAverage([2, 3, 7]));
console.log(calcAverage(totals));

/*
function calcAverage(arr) {
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];

    }
    return sum / arr.length;
};

//console.log(totals);
console.log(calcAverage(totals));

*/