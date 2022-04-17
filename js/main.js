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
