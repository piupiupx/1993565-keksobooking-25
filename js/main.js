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
import { createForm } from './form.js';
import './slider.js';
import { createLoader } from './api.js';
import { createMap } from './map.js';
import { createFilters } from './filters.js';
import './api.js';

const { setMarkers, resetMap, removeMarkers } = createMap();
const cardTemplate = document.querySelector('#card');

createLoader((data) => {
  createFilters(data, removeMarkers, resetMap, setMarkers, cardTemplate);
});
createForm(resetMap);
