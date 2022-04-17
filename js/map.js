import { createOffer } from './template.js';
import { activElementList } from './hide.js';

function createMap() {
  const map = L.map('map');
  const mainPinLat = 35.679938;
  const mainPinLng = 139.759498;

  map.on('load', () => {
    activElementList();
  });

  map.setView(
    {
      lat: mainPinLat,
      lng: mainPinLng,
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
      lat: mainPinLat,
      lng: mainPinLng,
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
  function resetMap() {
    mainPinMarker.setLatLng({
      lat: mainPinLat,
      lng: mainPinLng,
    });

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
    resetMap,
    removeMarkers,
  };
}

export { createMap };
