import {
  // eslint-disable-next-line no-unused-vars
  getRandom,
  // eslint-disable-next-line no-unused-vars
  getDot,
  // eslint-disable-next-line no-unused-vars
  getRandLengthArray,
  // eslint-disable-next-line no-unused-vars
  getRandomArrayElement,
} from './util.js';
//import { getSimilarApparts } from './data.js'; // отрисовывает шаблонные аппарты
import { createForm } from './form.js';
import './slider.js';
import { createLoader } from './api.js';
import { createMap } from './map.js';

import './api.js';

const cardTemplate = document.querySelector('#card');

const { setMarkers, resetMap, removeMarkers } = createMap();

function calculatePrice(value, price) {
  if (value === 'low') {
    return price < 10000;
  }
  if (value === 'middle') {
    return price >= 10000 && price <= 50000;
  }
  if (value === 'high') {
    return price > 50000;
  }
  if (value === 'any') {
    return true;
  }
}

function filterFeatures(featuresData) {
  if (!featuresData) {
    return true;
  }
  const wifi = document.querySelector('#filter-wifi');
  const dishwasher = document.querySelector('#filter-dishwasher');
  const parking = document.querySelector('#filter-parking');
  const washer = document.querySelector('#filter-washer');
  const elevator = document.querySelector('#filter-elevator');
  const conditioner = document.querySelector('#filter-conditioner');
  //console.log(wifi.value, wifi.checked, 'wifi');
  return (
    (featuresData.includes(wifi.value) ? wifi.checked : true) &&
    (featuresData.includes(dishwasher.value) ? dishwasher.checked : true) &&
    (featuresData.includes(parking.value) ? parking.checked : true) &&
    (featuresData.includes(washer.value) ? washer.checked : true) &&
    (featuresData.includes(elevator.value) ? elevator.checked : true) &&
    (featuresData.includes(conditioner.value) ? conditioner.checked : true)
  );
}

const filterAdvertise = (advertises) => {
  const houseType = document.querySelector('[name="housing-type"]');
  const housingPrice = document.querySelector('[name="housing-price"]');
  const housingRooms = document.querySelector('[name="housing-rooms"]');
  const housingGuests = document.querySelector('[name="housing-guests"]');
  //const featuresNode = document.querySelector('[name="features"]');

  // eslint-disable-next-line arrow-body-style
  return advertises.filter((advertise) => {
    return (
      (advertise.offer.type === houseType.value || houseType.value === 'any') &&
      calculatePrice(housingPrice.value, advertise.offer.price) &&
      (advertise.offer.rooms === Number(housingRooms.value) ||
        housingRooms.value === 'any') &&
      (advertise.offer.guests === Number(housingGuests.value) ||
        housingGuests.value === 'any') &&
      filterFeatures(advertise.offer.features)
    );
  });
};
const RERENDER_DELAY = 500;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// eslint-disable-next-line no-unused-vars
const loadAppart = createLoader((data) => {
  // на первый параметр анонимная функция-инструкци
  const houseType = document.querySelector('[name="housing-type"]');
  const housingPrice = document.querySelector('[name="housing-price"]');
  const housingRooms = document.querySelector('[name="housing-rooms"]');
  const housingGuests = document.querySelector('[name="housing-guests"]');
  const wifi = document.querySelector('#filter-wifi');
  const dishwasher = document.querySelector('#filter-dishwasher');
  const parking = document.querySelector('#filter-parking');
  const washer = document.querySelector('#filter-washer');
  const elevator = document.querySelector('#filter-elevator');
  const conditioner = document.querySelector('#filter-conditioner');
  setMarkers(filterAdvertise(data).slice(0, 9), cardTemplate);

  function createFilter() {
    removeMarkers();
    resetMap();
    const hi = filterAdvertise(data);
    setMarkers(hi.slice(0, 9), cardTemplate);
    //console.log(data, 'fefe');
  }

  houseType.addEventListener('input', debounce(createFilter, RERENDER_DELAY));
  housingPrice.addEventListener(
    'input',
    debounce(createFilter, RERENDER_DELAY)
  );
  housingRooms.addEventListener(
    'input',
    debounce(createFilter, RERENDER_DELAY)
  );
  housingGuests.addEventListener(
    'input',
    debounce(createFilter, RERENDER_DELAY)
  );
  wifi.addEventListener('input', debounce(createFilter, RERENDER_DELAY));
  dishwasher.addEventListener('input', debounce(createFilter, RERENDER_DELAY));
  parking.addEventListener('input', debounce(createFilter, RERENDER_DELAY));
  washer.addEventListener('input', debounce(createFilter, RERENDER_DELAY));
  elevator.addEventListener('input', debounce(createFilter, RERENDER_DELAY));
  conditioner.addEventListener('input', debounce(createFilter, RERENDER_DELAY));
});

createForm(resetMap);
