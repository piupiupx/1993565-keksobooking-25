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

const capacity = {
  1: 'для 1 гостя',
  2: ['для 2 гостей', 'для 1 гостя'],
  3: ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  100: 'не для гостей',
};

function getCapacityErrorMessage(value) {
  const rooms = Number(value);
  if (rooms === maxRooms) {
    return 'Выберите "не для гостей"';
  }

  return `не больше ${roomsField.value} гостя`;
}
function validateCapacity() {
  return capacity[roomsField.value].includes(capacity[capacityField.value]);
}

pristine.addValidator(
  roomsField,
  validateCapacity,
  getCapacityErrorMessage,
  2,
  true
);
pristine.addValidator(
  capacityField,
  validateCapacity,
  'Количество гостей должно соответствовать количеству комнат',
  2,
  true
);

const submitButton = adFormTitle.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  // блокирует отправку
  submitButton.disabled = true;
  submitButton.textContent = 'Заполните обязательные поля';
};

adFormTitle.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    blockSubmitButton();
  }
});
