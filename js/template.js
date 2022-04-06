function createOfferTemplate(appart, template) {
  const clone = template.content.cloneNode(true); //создаем копию карточки-шаблона

  const popupTitle = clone.querySelector('.popup__title');

  if (!appart.offer.title) {
    popupTitle.classList.add('.hidden');
  }

  popupTitle.innerText = appart.offer.title;

  const popupAddress = clone.querySelector('.popup__text--address');
  popupAddress.innerText = appart.offer.address;

  const popupPrice = clone.querySelector('.popup__text--price');
  if (!appart.offer.price) {
    popupPrice.classList.add('.hidden');
  }
  popupPrice.innerText = `${appart.offer.price} ₽/ночь`;

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
      return `<img width="50px" height="50px" src='${photoSrc}'> `;
    })
    .join('');

  const popupAvatar = clone.querySelector('.popup__avatar');
  popupAvatar.src = appart.author.avatar;
  return clone;
}
export { createOfferTemplate };
