////////////////////////////////
// Asynchronous JavaScript
////////////////////////////////

////////////////////////////////
// Coding Challenge #1
///////////////////////////////
// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time �

////////////////////////////////
// PART 1
////////////////////////////////
//Render country from lexture script

//I'm gonna make this a top level URL because it looks like these APIs change often
const url_WhereAmI = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381

// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).

// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating �
const whereAmI = function (lat, lng) {
  //fetch stuff!
  retData = {};

  fetch(url_WhereAmI + `?latitude=${lat}&longitude=${lng}`)
    .then(response => {
      if (!response.ok) throw new Error(`No reponse ${response.status}`);
      return response.json();
    })
    .then(data => {
      // 3. Once you have the data, take a look at it in the console to see all the attributes
      // that you received about the provided location. Then, using this data, log a
      // message like this to the console: “You are in Berlin, Germany”
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
    })
    //Part 2 stuff
    .then(response => {
      if (!response.ok)
        throw new Error(
          `Country not found: ${country.toUpperCase()} (${response.status})`
        ); // "throw"  will immediately terminate the current function, like return

      return response.json();
    })
    .then(data => renderCountry(data))

    // 4. Chain a .catch method to the end of the promise chain and log errors to the
    // console
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
};

whereAmI(52.508, 13.381);
// whereAmI(52.98841, -1.489362);
// whereAmI(37.682, 12.59);
// whereAmI(7.682, 12.59);

// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message
// The new API doesn't seem to have the 3 second request limit..
// so I can't recreate this bug to alleviate it

////////////////////////////////
// PART 2
////////////////////////////////
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.

// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)
// The Complete JavaScript Course 31
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK �
