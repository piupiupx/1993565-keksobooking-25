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
import { createOfferTemplate } from './template.js';
import { getSimilarApparts } from './data.js';
import './form.js';
import {
  // eslint-disable-next-line no-unused-vars
  activElementList,
  // eslint-disable-next-line no-unused-vars
  disableElementList,
} from './hide.js';

const similarApparts = getSimilarApparts();

const cardTemplate = document.querySelector('#card');

const mapCanvas = document.querySelector('#map-canvas');
// eslint-disable-next-line no-undef
const clone = createOfferTemplate(similarApparts[0], cardTemplate); // создаем карточку из первго элемента массива

mapCanvas.appendChild(clone); // добавляем уже заполненную карточку нашими
