'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

// GeoLocation API
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    //SUCCESS
    function (position) {
      console.log(position);
      const { latitude } = position.coords; //destructuring - allows cleaner code
      const { longitude } = position.coords;
      console.log(longitude, latitude);
      //   console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      // L is the global variable from Leafletjs - it is reachable on this script as this script runs after leaflet's js script file
      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 17);
      console.log(map);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //   L.marker(coords).addTo(map).bindPopup('Home').openPopup();

      //handling clicks on map
      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function (error) {
      //FAIL
      alert(`Could not get your position 😖
          Please check your browser settings and permissions.`);
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
    }
  ); // two callbacks , success and error callbacks
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputElevation.value =
    inputCadence.value =
      '';

  // Display marker

  // Pull click co-ords
  const { lat, lng } = mapEvent.latlng;
  // Add maker to map
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        midWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Running')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation;
});
