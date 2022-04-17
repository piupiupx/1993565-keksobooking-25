import { calculatePrice, debounce } from './util.js';

const RERENDER_DELAY = 500;

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

function createFilters(
  data,
  removeMarkers,
  resetMap,
  setMarkers,
  cardTemplate
) {
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
    const hi = filterAdvertise(data); // нельзя импортировать функцию из main.js
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
}

export { createFilters, filterAdvertise, filterFeatures };
