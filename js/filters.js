import { cutAdvertises, calculatePrice } from './util.js';
const RERENDER_DELAY = 500;

const filterFeatures = (featuresData) => {
  if (!featuresData) {
    return true;
  }

  const featureFilterElements = document.querySelectorAll('.map__checkbox');
  const checkedFeatures = Array.from(featureFilterElements)
    .filter((el) => el.checked)
    .map((el) => el.value);

  return checkedFeatures.every((feature) => featuresData.includes(feature));
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
  const filterBar = document.querySelector('.map__filters');

  setMarkers(cutAdvertises(filterAdvertise(data)), cardTemplate);

  function setFilteredMarkers() {
    removeMarkers();
    resetPopUps();

    setMarkers(cutAdvertises(filterAdvertise(data)), cardTemplate);
  }

  const resetFilters = () => {
    filterBar.reset();
    setFilteredMarkers();
  };

  const featuresInput = document.querySelector('.map__features');

  featuresInput.addEventListener(
    'input',
    debounce(setFilteredMarkers, RERENDER_DELAY)
  );
  houseType.addEventListener(
    'input',
    debounce(setFilteredMarkers, RERENDER_DELAY)
  );
  housingPrice.addEventListener(
    'input',
    debounce(setFilteredMarkers, RERENDER_DELAY)
  );
  housingRooms.addEventListener(
    'input',
    debounce(setFilteredMarkers, RERENDER_DELAY)
  );
  housingGuests.addEventListener(
    'input',
    debounce(setFilteredMarkers, RERENDER_DELAY)
  );
  return resetFilters;
};

export { createFilters, filterAdvertise, filterFeatures };
