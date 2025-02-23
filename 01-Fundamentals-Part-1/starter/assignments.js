const country = "England";
const continent = "Europe";
let population = 67878480;
let isIsland = true;
const language = "English";

isIsland = false;


console.log("Country: " + country);
console.log("Continent: " + continent);
console.log("Population: " + population);
if (isIsland === true)
    console.log("This country is on an island!")
else console.log("Nay, this country isn't on an island");

// 1
population = (population / 2);
console.log("There are now " + population + " people in " + country);
// 2
population = (population + 1);
console.log("One more came along, now it's " + population + ".");

const finlandPopulation = 6000000

if (population > finlandPopulation)
    console.log("This country has more people than the population of Finland!")
else
    console.log("Finland has more people than " + country);

const description = `${country} is in ${continent}, and its ${population} people speak ${language} .`;

console.log(description);

population = 3

if (population > 33000000) {
    console.log(`${country}'s population is above average`);
} else {

    console.log(`${country}'s population is ${33 - population} below average`);
}


console.log(5 + 6 + '4' + 9 - 4 - 2); // -> ?

/*

const numNeighbours = Number(
    prompt(`How many neighbour countries does ${country} have`)
);

if (numNeighbours === 1) {
    console.log(`Only ${numNeighbours} border!`)
} else if (numNeighbours > 1) {
    console.log(`More than 1 border`);

} else {
    console.log(`No borders.`)
};

*/

if (language === "English") && (population < 50000000) && (isIsland = false)
{
    console.log(`You should live in ${country} :) `);
} else {
    console.log(`${country} does not meet your criteria :(`);
};