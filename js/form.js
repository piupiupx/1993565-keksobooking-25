const adFormTitle = document.querySelector('.ad-form');
const maxRooms = 100;
// eslint-disable-next-line no-unused-vars
const pristine = new Pristine(adFormTitle, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error-text',
});

pristine.addValidator(
  adFormTitle.querySelector('#title'),
  validateNickname,
  'От 30 до 100 символов'
);
function validateNickname(value) {
  return value.length >= 30 && value.length <= 100;
}

const roomsField = adFormTitle.querySelector('[name="rooms"]');
const capacityField = adFormTitle.querySelector('[name="capacity"]');

function getCapacityErrorMessage(value) {
  // возвращает текст ошибки
  const rooms = Number(value);
  if (rooms === maxRooms) {
    return 'Выберите "не для гостей"';
  }

  return `не больше ${roomsField.value} гостя`;
}
function validateCapacity() {
  const capacity = Number(capacityField.value);
  const rooms = Number(roomsField.value);
  return (
    (rooms >= capacity && rooms < maxRooms && capacity !== 0) ||
    (rooms === maxRooms && capacity === 0)
  );
}

pristine.addValidator(
  roomsField,
  validateCapacity,
  getCapacityErrorMessage,
  1,
  true
);
pristine.addValidator(
  capacityField,
  validateCapacity,
  'Количество гостей должно соответствовать количеству комнат',
  1,
  true
);

adFormTitle.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

const typeField = adFormTitle.querySelector('[name="type"]');
const priceField = adFormTitle.querySelector('#price');
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const validatePrice = () =>
  priceField.value ? !(priceField.value < minPrice[typeField.value]) : true;

function getPriceErrorMessage() {
  return `Минимальная цена за ночь ${minPrice[typeField.value]} `;
}

pristine.addValidator(typeField, validatePrice, getPriceErrorMessage, 1, true);
typeField.addEventListener('change', () => {
  priceField.min = minPrice[typeField.value];
  priceField.placeholder = `От ${minPrice[typeField.value]} ₽/ночь`;
});

const timeInField = adFormTitle.querySelector('[name="timein"]');
const timeOutField = adFormTitle.querySelector('[name="timeout"]');

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});
timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});
