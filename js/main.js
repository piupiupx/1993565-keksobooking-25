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
//import { createOfferTemplate } from './template.js';
import { getSimilarApparts } from './data.js';
import './form.js';
import './slider.js';

import { createMap } from './map.js';

const similarApparts = getSimilarApparts();

const cardTemplate = document.querySelector('#card');

//const mapCanvas = document.querySelector('#map-canvas');
// eslint-disable-next-line no-undef
const { setMarkers } = createMap();

setMarkers(similarApparts, cardTemplate);

//mapCanvas.appendChild(clone); // добавляем уже заполненную карточку нашими
