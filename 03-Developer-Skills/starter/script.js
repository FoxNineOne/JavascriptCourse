// Remember, we're gonna use strict mode in all scripts now!
/*

"use strict";
const shaheen = `yaya`;
let x, y;
if (x == y) console.log("monkeh!");

const calcAge = birthYear => 2024 - birthYear;
console.log();
*/
/*
"use strict";

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

//calcTempAmplitude([3, 7, 4]);
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);
// max starts  = 3
// 3 < 7 so max = 7
// 7 > 4, so max = 7 still

// PROBLEM 2:
// Function should now receive 2 arrays of temps

// - with 2 arrays, should we implement the same functionality twice?
// no, just merge the two arrays
// how to merge 2 arrays?

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(`Max: ${max} Min: ${min}`);
  return `Range: ${max - min}`;
};

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);



"use strict";

// celsius + 273

const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    value: Number(prompt("Degrees celsius:")),
  };

  // console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);
  // console.table(measurement);
  // const kelvin = measurement.value + 273;
  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());


// Using a debugger
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    //debugger;  //this will stop like a breakpoint!
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(`Max: ${max} Min: ${min}`);
  return `Amplitude: ${max - min}`;
};

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
console.log(amplitudeBug);

*/

// CODING CHALLENGE #1
/*
Given an array of forecasted maximum temperatures, 
the thermometer displays a string with these temperatures  .

Example: [17,21,23] will print "... 17°C in 1 days ... 21°C in 2 days ... 23°C in 3 days ..."

Create a function 'printForecast# which takes in an array 'arr' 
and logs a string like the above to the console.

Use the problem-solving framework: 
Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

"use strict";

const testData1 = [17, 21, 23];
const testData2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  let returnString = "...";
  for (let i = 0; i < arr.length; i++) {
    returnString += ` ${arr[i]}°C in ${Number([i]) + 1} days ...`;
  }
  return returnString;
};

console.log(printForecast(testData1));
console.log(printForecast(testData2));
