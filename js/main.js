import { createForm } from './form.js';
import './slider.js';
import { createLoader } from './api.js';
import { createMap } from './map.js';
import { createFilters } from './filters.js';
import './api.js';
import './avatar.js';
import { disableElementList, activElementList } from './hide.js';
const { setMarkers, resetPopUps, removeMarkers, resetMainPin } = createMap();

const cardTemplate = document.querySelector('#card');

disableElementList();

createLoader((data) => {
  activElementList();
  createFilters(data, removeMarkers, resetPopUps, setMarkers, cardTemplate);
});

createForm(resetPopUps, resetMainPin);
