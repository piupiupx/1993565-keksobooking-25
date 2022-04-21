const mapTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

function createOffer(appart, template) {
  // функция создает карточку на основе шаблона и заполняет временными данными
  const clone = template.content.cloneNode(true); //создаем копию карточки-шаблона

  const popupTitle = clone.querySelector('.popup__title');
  if (!appart.offer.title) {
    popupTitle.classList.add('hidden');
  }

  popupTitle.innerText = appart.offer.title;

  const popupAddress = clone.querySelector('.popup__text--address');
  popupAddress.innerText = appart.offer.address;

  const popupPrice = clone.querySelector('.popup__text--price');
  if (!appart.offer.price) {
    popupPrice.classList.add('hidden');
  }
  popupPrice.innerText = `${appart.offer.price} ₽/ночь`;

  const popupType = clone.querySelector('.popup__type');
  popupType.innerText = mapTypes[appart.offer.type];

  const popupCapacity = clone.querySelector('.popup__text--capacity');
  popupCapacity.innerText = `${appart.offer.rooms} комнаты для ${appart.offer.guests} гостей`;

  const popupTime = clone.querySelector('.popup__text--time');
  popupTime.innerText = `Заезд после ${appart.offer.checkin}, выезд до ${appart.offer.checkout}`;

  const popupFeatures = clone.querySelector('.popup__features');
  if (!appart.offer.features) {
    popupFeatures.classList.add('hidden');
  } else {
    appart.offer.features.forEach((feature) => {
      const futureElem = document.createElement('li');
      futureElem.classList.add('popup__feature');
      futureElem.classList.add(`popup__feature--${feature}`);

      popupFeatures.appendChild(futureElem);
    });
  }

  const popupDescription = clone.querySelector('.popup__description');
  if (!appart.offer.description) {
    popupDescription.classList.add('hidden');
  }
  popupDescription.innerText = appart.offer.description;

  const popupPhotos = clone.querySelector('.popup__photos');
  if (!appart.offer.photos) {
    popupPhotos.classList.add('hidden');
  } else {
    appart.offer.photos.forEach((photoSrc) => {
      const img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = photoSrc;
      img.style.width = '45px';
      img.style.height = '40px';
      img.alt = 'Фотография жилья';

      popupPhotos.appendChild(img);
    });
  }

  const popupAvatar = clone.querySelector('.popup__avatar');
  popupAvatar.src = appart.author.avatar;

  const spanContainer = document.createElement('span');
  spanContainer.appendChild(clone);

  return spanContainer;
}
export { createOffer };
