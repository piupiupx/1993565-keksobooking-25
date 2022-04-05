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
