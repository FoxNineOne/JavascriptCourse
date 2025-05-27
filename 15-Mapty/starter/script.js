'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); // Create id from Datestamp
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; //[lat,lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // prettier-ignore
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on 
    ${days[this.date.getDay()]}
    ${this.date.getDate()}
    ${months[this.date.getMonth()]} `;
  }
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this;
  }
}

///////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;
  #mapLevel = 14;
  #mapZoomLevel = 17;
  #workouts = [];
  constructor() {
    // get user's position
    this._getPosition(); //This will autostart the application
    // get data from local storage
    this._getLocalStorage();
    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function (error) {
          //FAIL
          alert(`Could not get your position 😖
          Please check your browser settings and permissions.`);
          console.error('Error Code:', error.code);
          console.error('Error Message:', error.message);
        }
      ); // two callbacks , success and error callbacks
  }
  _loadMap(position) {
    //SUCCESS
    // console.log(position);
    const { latitude } = position.coords; //destructuring - allows cleaner code
    const { longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    // L is the global variable from Leafletjs - it is reachable on this script as this script runs after leaflet's js script file
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    //Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get workout data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // if workout type === running then running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert(`Inputs have to be positive numbers`);

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // if workout type === cycling then cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert(`Inputs have to be positive numbers`);

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    // add new object to workout array
    this.#workouts.push(workout);

    // render workout on map as marker
    this._renderWorkoutMarker(workout);
    // render workout on list
    this._renderWorkout(workout);

    // Hide form + Clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }
  _renderWorkoutMarker(workout) {
    // Add marker to map
    // L.marker([lat, lng])
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          midWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? `🏃‍♂️` : `🚴🏼‍♂️`} ${workout.description}`
      )
      .openPopup();
    // render new workout on list
  }
  _renderWorkout(workout) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon"> ${
              workout.type === 'running' ? `🏃‍♂️` : `🚴🏼‍♂️`
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;
    if (workout.type === 'running')
      html += `    
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
    if (workout.type === 'cycling')
      html += `    
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;
    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    else {
      const workout = this.#workouts.find(
        work => work.id === workoutEl.dataset.id
      );

      this.#map.setView(workout.coords, this.#mapZoomLevel, {
        animate: true,
        pan: { duration: 1 },
      });
      //Using the public interface
      // workout.click();
    }
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      // BUG - RESTORING DATA FROM LOCAL STORAGE HAS NO PARENT CLASS/METHODS..
      // CAN WE IMPLEMENT THEM BACK IN THIS LOOP?
    });
  }
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

// Additional ideas to implement
// Fix BUG with local storage - restore prototype chain

// Edit workout?

// Delete a workout
// Delete ALL WORKOUTS (easy - just do the rest)

// Ability to sort exercises by distance, or time?
// Change alerts of errors to popup?

// Add ability to show all workouts at once. (hard mode)
// Geocode location from coordinates ("Run in Derby, United Kingdom")
