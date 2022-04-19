import { createOffer } from './template.js';
import { activElementList } from './hide.js';

const MAIN_PIN_LAT = 35.679938;
const MAIN_PIN_LNG = 139.759498;

function createMap() {
  const map = L.map('map');

  map.on('load', () => {
    activElementList();
  });

  map.setView(
    {
      lat: MAIN_PIN_LAT,
      lng: MAIN_PIN_LNG,
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

  const mainPinMarker = L.marker(
    {
      lat: MAIN_PIN_LAT,
      lng: MAIN_PIN_LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  mainPinMarker.addTo(map);
  const targetForm = document.querySelector('#address');

  mainPinMarker.on('moveend', (evt) => {
    targetForm.value = `${evt.target
      .getLatLng()
      .lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
  function resetMainPin() {
    mainPinMarker.setLatLng({
      lat: MAIN_PIN_LAT,
      lng: MAIN_PIN_LNG,
    });
  }

  function resetPopUps() {
    map.closePopup();
  }

  const markersArr = [];

  function setMarkers(data, cardTemplate) {
    return data.forEach((elem) => {
      const pinMarker = L.marker(
        {
          lat: elem.location.lat,
          lng: elem.location.lng,
        },
        {
          icon: advPinIcon,
        }
      );
      markersArr.push(pinMarker);
      pinMarker.addTo(map).bindPopup(createOffer(elem, cardTemplate));
    });
  }
  function removeMarkers() {
    markersArr.forEach((mark) => {
      map.removeLayer(mark);
    });
  }

  return {
    setMarkers: setMarkers,
    resetMainPin,
    removeMarkers,
    resetPopUps,
  };
}

export { createMap };
