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
//import { createOffer } from './template.js'; // создает карточку объявления под шаблон
import { getSimilarApparts } from './data.js'; // отрисовывает шаблонные аппарты
import { createForm } from './form.js';
import './slider.js';

import { createMap } from './map.js';

import { createLoader } from './api.js';
// eslint-disable-next-line no-console
const loadAppart = createLoader(console.log, console.error);

// eslint-disable-next-line no-unused-expressions
loadAppart;
const similarApparts = getSimilarApparts();

const cardTemplate = document.querySelector('#card');

//const mapCanvas = document.querySelector('#map-canvas');
const { setMarkers, map, mainPinMarker } = createMap();
setMarkers(similarApparts, cardTemplate);
createForm(map, mainPinMarker);

/*const body = document.body;
const successTemplate = document.querySelector('#success');
const clone = successTemplate.content.cloneNode(true); //создаем копию карточки-шаблона
body.append(clone); */
