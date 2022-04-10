import { createOfferTemplate } from './template.js';
import { activElementList } from './hide.js';

function createMap() {
  const map = L.map('map');

  map.on('load', () => {
    activElementList();
  });

  map.setView(
    {
      lat: 35.6674382,
      lng: 139.1665285,
    },
    10
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const advPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [26, 52],
  });

  /*const advPinMarker = L.marker(
    {
      lat: 35.5966979448806,
      lng: 139.5669896621257,
    },
    {
      icon: advPinIcon,
    }
  ); */
  const mainPinMarker = L.marker(
    {
      lat: 35.679938,
      lng: 139.759498,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );
  mainPinMarker.addTo(map);
  const targetForm = document.querySelector('#address');

  mainPinMarker.on('moveend', (evt) => {
    targetForm.value = `${evt.target.getLatLng().lat}, ${
      evt.target.getLatLng().lng
    }`;
  });
  function setMarkers(similarApparts, cardTemplate) {
    similarApparts.forEach((elem) => {
      const pinMarker = L.marker(
        {
          lat: elem.location.lat,
          lng: elem.location.lng,
        },
        {
          icon: advPinIcon,
        }
      );
      pinMarker.addTo(map).bindPopup(createOfferTemplate(elem, cardTemplate));
    });
  }
  return { setMarkers };
}
export { createMap };
