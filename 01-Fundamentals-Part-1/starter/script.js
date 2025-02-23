/*
let js = "amazing";
console.log(40 + 8 + 23 - 10);

//a value is a piece of data
console.log('Jonas');
console.log(23);

let firstName = "Matlida";

console.log(firstName);
console.log(firstName);
console.log(firstName);

//camel case means whenever there are multiple words in a variable name, the first word is lower followed by upper case

// Variable name conventions
let jonas_Matilda = "JM";
let $function = 27;

let person = ('jonas');
let PI = 3.1415;

let myFirstJob = 'Coder';
let myCurrentJob = 'BadAssMusicProducer';

console.log(myFirstJob);

true
let javascriptIsFun = true;
console.log(javascriptIsFun);

//console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof `Shaheen`);

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);
year = 1991;
console.log(year);
console.log(typeof year);
console.log(typeof null);


let age = 30;
age++; //31

const birthYear = 1991;
//birthYear = 1990;

var job = "Sausage";
job = "Sleepy";

lastName = "Shaikh";
console.log(lastName);

//Math Operators
let now = 2037;
//now = prompt(`What is the current year?`);
const ageShaheen = now - 1991;
const ageSarah = now - 2018;
console.log(ageShaheen, ageSarah);

console.log(ageShaheen * 2, ageShaheen / 10, 2 ** 3);
// 2 ** 3 meants 2 to the power of 3 = 2x2x2

//console.log("You will stay strong and beat this brother. ")

const firstName = "Shaheen";
const lastName = "Shaikh";

console.log(firstName + " " + lastName);

// Assignment operatiors
let x = 10 + 5; // 15
x += 10; // x = x(which is 15), then add 10
x *= 4; // x = x * 4 = 100
x++; // x =x + 1
x--; // x = x -  1
x--; // x = x -  1
console.log(x);

//Comparison operators
console.log(ageShaheen > ageSarah); // >, <, >=, <=,
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);

//Math Operators
const now = 2037;
const ageShaheen = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

// console.log(25 - 10 - 5);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10
console.log(x, y);
const averageAge = (ageShaheen + ageSarah) / 2;

console.log(ageShaheen, ageSarah, averageAge);

const firstName = 'Shaheen';
const job = 'producer';
const birthYear = 1991;
const year = 2037;
const age = (year - birthYear)

const shaheen = `I'm ${firstName}, a ${age} years old ${job}!`;

console.log(shaheen);

console.log(`sausages!`);

console.log('String with \n\
mutliple\n\
new lines!');

console.log(`New line NOW!
Sausages are in the freezer!`);


const age = 15;
const isOldEnough = age >= 18

if (age >= 18) {
    console.log(`Sarah can start driving license 🚗`);
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah cannot start driving license for another ${yearsLeft} years. 🚌`)
}

const birthYear = 1991;
let century
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);


// type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(String(23), 23);

// type coecion
console.log(`I am ` + 23 + ` years old`);
console.log(`I am ` + `23` + ` years old`);
console.log(`I am ` + String(23) + ` years old`);
console.log(`23` - `10` - 3);
console.log(`23` / `2`);


let n = `1` + 1; // string `11`
n = n - 1; // converts to number 10
console.log(n);



// 5 falsy values: 0, '' , undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(``));

const money = 0.45;

if (money) {
    console.log(`Don't spend it all. You have £${money}.`);
} else {
    console.log(`You should get a job!`);
}

let height = 0;
if (height) {
    console.log(`Yay! Height is defined`);
} else {
    console.log(`Height in UNDEFINED!`);
}


const age = '18';
// === strict equality
if (age === 18) console.log(`You just became an adult! (strict)`);
// == loose equality (type coercion)
if (age == 18) console.log(`You just became an adult! (loose)`);


const favourite = prompt("Kippers for breakfast, Aunt Helga? Is it St Trimming's day?");
console.log("Kippers for breakfast, Aunt Helga? Is it St Trimming's day?");
//console.log(`"${favourite}" said Aunt Helga`);
//console.log(typeof favourite);

if (favourite === 'Tis') {
    console.log('"Tis!" said Aunt Helga');
} else if (favourite === 'Nay') {
    console.log(`Ay, if anyone needs me I'll be on the stoop!`);
} else {
    console.log(`"${favourite}?" All you gotta say, is "Tis", or "Nay".`);
};

if (favourite !== "Tis") console.log(`Be more fun if you said "Tis"...`)



const haveDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(haveDriversLicense && hasGoodVision); // AND
console.log(haveDriversLicense || hasGoodVision); // OR
console.log(!haveDriversLicense);  // NOT



// if (haveDriversLicense && hasGoodVision) {
//     console.log(`Sarah is able to drive`);
// } else {
//     console.log(`Someone else should drive`);
// }

const isTired = false; // C

console.log(haveDriversLicense && hasGoodVision && isTired);

// Sarah is able to drive if she has a driver's licnse
// has good vision, and is NOT tired.
if (haveDriversLicense && hasGoodVision && !isTired) {
    console.log(`Sarah is able to drive`);
} else {
    console.log(`Someone else should drive`);
}


// const dolphinsScore = (96 + 108 + 89) / 3;
// const koalasScore = (88 + 91 + 110) / 3;

// //console.log(dolphinsScore,koalasScore);

// if (dolphinsScore > koalasScore) {
//     console.log("Dolphins win the trophy")
// } else if (dolphinsScore === koalasScore) {
//     console.log("Both win the trophy");
// } else {
//     console.log("Koalas win the trophy");
// }


//BONUS 1

const dolphinsScore = (97 + 112 + 90) / 3;
const koalasScore = (109 + 95 + 56) / 3;

console.log(dolphinsScore, koalasScore);

if (dolphinsScore > koalasScore && dolphinsScore >= 100) {
    console.log("Dolphins win the trophy")
} else if (dolphinsScore < koalasScore && koalasScore >= 100) {
    console.log("Koalas win the trophy");
} else if (dolphinsScore === koalasScore && dolphinsScore >= 100 && koalasScore >= 100) {
    console.log("Both win the trophy");
} else {
    console.log(`No team wins the trophy`);
}


const day = 'monday';

switch (day) {
    case 'monday':
        console.log(`Run and Study`);
        console.log(`Go to Udemy`);
        break;
    case 'tuesday':
        console.log(`Weights and music`);
        console.log(`Record the bass guitar`);
        break;
    case 'wednesday':
    case 'thursday':
        console.log(`Running and studies`);
        break;
    case 'friday':
        console.log(`takeaway and video games`);
        break;
    case 'saturday':
    case 'sunday':
        console.log(`enjoy the weekend`);
        break;
    default:
        console.log(`Not a valid day!`);

}

if (day === 'monday') {
    console.log(`Run and Study`);
    console.log(`Go to Udemy`);
} else if (day === 'tuesday') {
    console.log(`Weights and music`);
    console.log(`Record the bass guitar`);
} else if (day === 'wednesday' || day === 'thursday') {
    console.log(`Running and studies`)
} else if (day === 'friday') {
    console.log(`takeaway and video games`);
} else if (day === 'saturday' || day === 'sunday') {
    console.log(`enjoy the weekend`);
} else {
    console.log(`Not a valid day!`);
}


//expression is a piece of code that produces a value
// 3 + 4 is an expression, it produces the value 7
// 123 is a value


//conditionals - ternary?

const age = 18;
age >= 18 ? console.log(`this guy is obsessed with age`) : console.log(`I'm getting sleepy`);


const drink = age >= 18 ? 'wine' : 'water'
console.log(drink);

console.log(`You should buy a bottle of ${age >= 18 ? 'wine' : 'water'}`);



const bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2

console.log(`The bill was${bill}, the tip was ${tip}, and the total value was ${bill + tip}`);

*/