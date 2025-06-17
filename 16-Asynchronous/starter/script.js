'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};
// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

//XML HTTP REQUEST - OLD SKOOL WAY
/*
const getCountryData = function (country) {
  // create request variable
  const request = new XMLHttpRequest();
  //open request
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  //send request
  request.send();

  // Event listener to return response
  request.addEventListener('load', function () {
    // console.log(this.responseText);

    //Convert JSON to object - [data] to destructure!
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
        <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}m people</p>
            <p class="country__row"><span>🏠</span>${data.nativeName}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('GB');
getCountryData('Spain');
getCountryData('Holland');
getCountryData('Italy');
*/

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}m people</p>
            <p class="country__row"><span>🏠</span>${data.nativeName}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbour = function (country) {
  // AJAX Call country 1 create request variable
  const request = new XMLHttpRequest();
  //open request
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  //send request
  request.send();

  // Event listener to return response
  request.addEventListener('load', function () {
    // console.log(this.responseText);

    //Convert JSON to object - [data] to destructure!
    const [data] = JSON.parse(this.responseText);

    // Render country
    renderCountry(data);

    // get neighbour country (2)
    const [neighbour] = data.borders;
    if (!neighbour) return;

    // AJAX Call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText); //Not returned as array this time!
      renderCountry(data2, 'neighbour');
    });
  });
};

//getCountryAndNeighbour('gb');

//Call back hell!
// setTimeout(() => {
//   console.log(`1 second passed`);
//   setTimeout(() => {
//     console.log(`2 seconds passed`);
//     setTimeout(() => {
//       console.log(`3 seconds passed`);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Call back hell makes code look messy, hard to mantain and hard to understand
// Code that is hard to understand is bad code, as it'll have more bugs.

// in ES6, we escape callback hell with promises.

//FETCH API

// const country = 'GB';
// const request = fetch(`https://restcountries.com/v2/name/${country}`);
// console.log(request); //returns promise <pending>

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`).then(function (
//     response
//   ) {
//     return response
//       .json() // this becomes another promise as JSON is asynchronous
//       .then(function (data) {
//         //using then on second promise
//         // retrieve that sweet, sweeet data
//         console.log(data[0]);
//         renderCountry(data[0]);
//       });
//   });
//   // we can call .then on all returned promises
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`${errorMsg.toUpperCase()} (${response.status})`); // "throw"  will immediately terminate the current function, like return
    return response.json();
  });
};

const getCountryData = function (country) {
  //Country1
  getJSON(
    `https://restcountries.com/v2/name/${country}`,
    `Country not found: ${country}`
  )
    .then(data => {
      renderCountry(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders?.[0];
      //const neighbour = 'keith';

      if (!neighbour) throw new Error('No Neighbour found');
      //Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        `Country not found: ${country}`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(
      err => {
        console.error(`${err} ⚠️⚠️😱`);
        renderError(`Something went wrong 😱 : 
          \r\n
          ${err.message}
          \r\n
          Try again later`);
      } //This will catch any errors in the chain
    )
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(
//       response => {
//         if (!response.ok)
//           throw new Error(
//             `Country not found: ${country.toUpperCase()} (${response.status})`
//           ); // "throw"  will immediately terminate the current function, like return

//         return response.json();
//       }
//       // ,err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data[0]);
// const neighbour = data[0].borders?.[0];

//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(
//           `Country not found: ${country.toUpperCase()} (${response.status})`
//         ); // "throw"  will immediately terminate the current function, like return

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(
//       err => {
//         console.error(`${err} ⚠️⚠️😱`);
//         renderError(`Something went wrong 😱 :
//           ${err.message}
//           Try again later`);
//       } //This will catch any errors in the chain
//     )
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// Handle errors in promises! (Promise rejections)
// a promise in which an error happened is a rejected promise
// the only way in the fetch promise rejects , is when the user loses internet connection

// btn.addEventListener('click', function () {
//   getCountryData('Brazil');
// });

// two ways to handle rejections
// pass a second callback in then method
// use a .catch(err => <function>) at end of fetch chain

//besides then and catch, there is finally
// Then is called when promise is fulfilled
// catch is called when promise s rejected
// finally is always called
// not always useful but has its uses

// THE EVENT LOOP

// JS Runtime - a container which includes all the pieces necessary to execute JS code
// JS Engine - the Heart of the runtime. Where code is executed (code stack), and where objects are stored in memory (heap)
// js has only one thread of execution, no multitasking happens in js

// Web API - APIs provided to engine, but are not part of js language itself
// like the DOM , timers, fetch API, geolocation API etc.

// Callback queue - ready-to-be-executed callback functions (coming from events)

// EVENT LOOP -  Whenever callstack is empty, the event loop takes callbacks from the callback queue
// and puts them in the callstack so they can be executed. Event loop is essential piece that makes
// asynchronous javascript possible

// It's the reason we have a non blocking concurrency model in javascript
// (the code doesn't stop waiting for previous execution to complete)

// A Javascript engine is built around a single thread,

// everything related to DOM is not part of javascript, but the web APIs
// In the web APIs env is where the asynchronous tasks related to the DOM will run
// This includes AJAX calls,  loading images, timers etc.

// When the task has completed/loaded/responded, it is then placed in the callback queue
// This is an ordered list of callback functions in order to be executed
// Because of this queue , it does mean a timer callback can take longer than the time yo uset
// to callback, as there may be a queue of callbacks ahead of it to process
// if you set a 5 second timer, and there's 1 second of execution in the queue prior,
// then your timer is actually 6 seconds.

// The callback queue also contains callbacks coming from DOM events, such as clicks, key presses, hovering etc.
// DOM events are not asynchronous behaviour, but they use the callback queue to run their callbacks

//  EVENT LOOP
// Event loop looks into callstack and sees if it's empty or not.
// If Call stack is empty, then the first callback in Callback Queue is placed
// in call stack to be executed. This is an event loop tick (each time event loop takes a callback from queue to stack)
//

// Javascipt language itself has no sense of time.
// Everything that is asynchronous does not happen in engine, the runtime manages asynchronous behaviour

// The engine simply executes any code that it is given

//How does fetch come into all of this?
// Promises

// Promises are slightly different.
// callbacks related to promises do not go into callback queue
// instead callbacks of promises have their own queue (micotasks queue)

// Microtasks queue has priority over callbackqueue
// All microtasks queue has to be emptied before callbacks are considered for event loop

//Which order will the below run in?
// First - top level and first in script
/*
console.log(`Test Start`);
// Fourth - Callback queue
setTimeout(() => console.log(`0 second timer`), 0);
// Third - MicoTasks Queue
Promise.resolve('Resolved Promise 1').then(res => console.log(res)); // create a promise that is immediately resolved
// Second - Top level
console.log(`Test End`);
*/
// console.log(`Test Start`);
// // Fifth and Last - Callback queue (the microtask queue pushes it back)
// setTimeout(() => console.log(`0 second timer`), 0);
// // Third - MicoTasks Queue
// Promise.resolve('Resolved Promise 1').then(res => console.log(res)); // create a promise that is immediately resolved
// // Fourth
// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log(`Test End`);
/*
//Building our own promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log(`Lottery Draw is happening 🔮`);
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`You WIN 🤑`); //mark promise as fulfilled promise
    } else {
      reject(new Error(`You lost! 💔`));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Usually on build promises to wrap old callback based functions into promises
// This is a process we call promisifying
// means to convert callback based  asynchropnous behaviour to promise based

// Promisifying setTimeout
const wait = seconds => {
  return new Promise(resolve =>
    //Rejection not needed cos impossible for timer to fail
    setTimeout(resolve, seconds * 1000)
  );
};
wait(2)
  .then(() => {
    console.log(`I waited for 2 seconds`);
    return wait(1);
  })
  .then(() => {
    console.log(`I waited for 1 more second`);
  });

// This promise will resolve immediately
Promise.resolve(' I HAVE RESOLVEN!').then(x => console.log(x));
//This will reject immediately
Promise.reject(' I HAVE NOT RESOLVEN!').catch(x => console.error(x));
*/
//Promisifying the Geolocation API
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),

//   err => console.error(err)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    //This will do same as above
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// This will log before above API call
// console.log(`Meowth 😸`);

// getPosition()
//   .then(pos => console.log(pos))
//   .catch(err => console.error(err));

const whereAmI = function () {
  getPosition().then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;

    return fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    )
      .then(response => {
        if (!response.ok) throw new Error(`No reponse ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log(`You are in ${data.city}, ${data.countryName}`);
        return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
      })

      .then(response => {
        if (!response.ok)
          throw new Error(
            `Country not found: ${country.toUpperCase()} (${response.status})`
          ); // "throw"  will immediately terminate the current function, like return

        return response.json();
      })
      .then(data => renderCountry(data))
      .catch(err => {
        console.error(`${err} ⚠️⚠️😱`);
        renderError(`Something went wrong 😱 : 
          \r\n
          ${err.message}
          \r\n
          Try again later`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  });
};

btn.addEventListener('click', whereAmI);
