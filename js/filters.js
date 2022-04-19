import { cutAdvertises, calculatePrice } from './util.js';
const RERENDER_DELAY = 500;

const filterFeatures = (featuresData) => {
  if (!featuresData) {
    return true;
  }
  const wifi = document.querySelector('#filter-wifi');
  const dishwasher = document.querySelector('#filter-dishwasher');
  const parking = document.querySelector('#filter-parking');
  const washer = document.querySelector('#filter-washer');
  const elevator = document.querySelector('#filter-elevator');
  const conditioner = document.querySelector('#filter-conditioner');
  return (
    (featuresData.includes(wifi.value) ? wifi.checked : true) &&
    (featuresData.includes(dishwasher.value) ? dishwasher.checked : true) &&
    (featuresData.includes(parking.value) ? parking.checked : true) &&
    (featuresData.includes(washer.value) ? washer.checked : true) &&
    (featuresData.includes(elevator.value) ? elevator.checked : true) &&
    (featuresData.includes(conditioner.value) ? conditioner.checked : true)
  );
};
const houseType = document.querySelector('[name="housing-type"]');
const housingPrice = document.querySelector('[name="housing-price"]');
const housingRooms = document.querySelector('[name="housing-rooms"]');
const housingGuests = document.querySelector('[name="housing-guests"]');

const filterAdvertise = (advertises) =>
  advertises.filter(
    (advertise) =>
      (advertise.offer.type === houseType.value || houseType.value === 'any') &&
      calculatePrice(housingPrice.value, advertise.offer.price) &&
      (advertise.offer.rooms === Number(housingRooms.value) ||
        housingRooms.value === 'any') &&
      (advertise.offer.guests === Number(housingGuests.value) ||
        housingGuests.value === 'any') &&
      filterFeatures(advertise.offer.features)
  );

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const createFilters = (
  data,
  removeMarkers,
  resetPopUps,
  setMarkers,
  cardTemplate
) => {
  setMarkers(cutAdvertises(filterAdvertise(data)), cardTemplate);

  function createFilter() {
    removeMarkers();
    resetPopUps();

    setMarkers(cutAdvertises(filterAdvertise(data)), cardTemplate);
  }

  const featuresInput = document.querySelector('.map__features');

  featuresInput.addEventListener(
    'input',
    debounce(createFilter, RERENDER_DELAY)
  );
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
};

export { createFilters, filterAdvertise, filterFeatures };
