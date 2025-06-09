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

btn.addEventListener('click', function () {
  getCountryData('Brazil');
});

// two ways to handle rejections
// pass a second callback in then method
// use a .catch(err => <function>) at end of fetch chain

//besides then and catch, there is finally
// Then is called when promise is fulfilled
// catch is called when promise s rejected
// finally is always called
// not always useful but has its uses
