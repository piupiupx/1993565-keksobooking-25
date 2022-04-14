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

const { setMarkers, resetMap } = createMap();

// eslint-disable-next-line no-unused-vars
const loadAppart = createLoader((data) => {
  //console.log(getSimilarApparts());
  setMarkers(data.slice(0, 10), cardTemplate);
});

createForm(resetMap);
