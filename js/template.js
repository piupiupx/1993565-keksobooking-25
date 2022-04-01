import { createAppart } from './data.js';

// eslint-disable-next-line prefer-const
let appart = createAppart();
const cardElement = document.querySelector('#card');

const mapCanvas = document.querySelector('#map-canvas');
const clone = cardElement.content.cloneNode(true);
createOfferTemplate(appart, clone);
mapCanvas.appendChild(clone);

// eslint-disable-next-line no-shadow
function createOfferTemplate(appart, clone) {
  const popupTitle = clone.querySelector('.popup__title');

  if (!appart.offer.title) {
    popupTitle.classList.add('.hidden');
  }

  popupTitle.innerText = appart.offer.title;

  const popupAddress = clone.querySelector('.popup__text--address');
  popupAddress.innerText = appart.offer.address;

  const popupPrise = clone.querySelector('.popup__text--price');
  if (!appart.offer.prise) {
    popupPrise.classList.add('.hidden');
  }
  popupPrise.innerText = `${appart.offer.prise} ₽/ночь`;

  const mapTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  const popupType = clone.querySelector('.popup__type');
  popupType.innerText = mapTypes[appart.offer.type];

  const popupCapacity = clone.querySelector('.popup__text--capacity');
  popupCapacity.innerText = `${appart.offer.rooms} комнаты для ${appart.offer.guests} гостей`;

  const popupTime = clone.querySelector('.popup__text--time');
  popupTime.innerText = `Заезд после ${appart.offer.checkin}, выезд до ${appart.offer.checkout}`;

  const popupFeatures = clone.querySelector('.popup__features');
  popupFeatures.innerText = appart.offer.features.join(', ');

  const popupDescription = clone.querySelector('.popup__description');
  if (!appart.offer.description) {
    popupDescription.classList.add('.hidden');
  }
  popupDescription.innerText = appart.offer.description;

  const popupPhotos = clone.querySelector('.popup__photos');
  popupPhotos.innerHTML = appart.offer.photos
    // eslint-disable-next-line arrow-body-style
    .map((photoSrc) => {
      return `<img src='${photoSrc}'> `;
    })
    .join('');

  const popupAvatar = clone.querySelector('.popup__avatar');
  popupAvatar.src = appart.author.avatar;
  return clone;
}
