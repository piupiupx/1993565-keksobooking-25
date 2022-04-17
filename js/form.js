import { sendForm } from './api.js';
import { isEscapeKey } from './util.js';

// форма валидности
function createForm(resetMap) {
  const adFormTitle = document.querySelector('.ad-form');
  const MAX_ROOMS = 100;
  const sliderElement = document.querySelector('.ad-form__slider');

  // eslint-disable-next-line no-unused-vars
  const pristine = new Pristine(adFormTitle, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorClass: 'ad-form--invalid',
    successClass: 'ad-form--valid',
    errorTextTag: 'p',
    errorTextClass: 'ad-form__error-text',
  });

  const targetForm = document.querySelector('#address');
  targetForm.value = '35.679938, 139.759498';
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
    if (rooms === MAX_ROOMS) {
      return 'Выберите "не для гостей"';
    }

    return `не больше ${roomsField.value} гостя`;
  }
  function validateCapacity() {
    const capacity = Number(capacityField.value);
    const rooms = Number(roomsField.value);
    return (
      (rooms >= capacity && rooms < MAX_ROOMS && capacity !== 0) ||
      (rooms === MAX_ROOMS && capacity === 0)
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

  pristine.addValidator(
    typeField,
    validatePrice,
    getPriceErrorMessage,
    1,
    true
  );
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
  const resetButton = adFormTitle.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', () => {
    adFormTitle.reset();
    sliderElement.noUiSlider.set(0);
    resetMap();
  });

  adFormTitle.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      // eslint-disable-next-line no-unused-vars

      const formData = new FormData(evt.target);
      sendForm(
        // эта функция отправляет данные заполненной формы на сервер

        'https://25.javascript.pages.academy/keksobooking',
        formData, //
        () => {
          adFormTitle.reset();
          sliderElement.noUiSlider.set(0);
          resetMap();

          const body = document.body;
          const successTemplate = document.querySelector('#success');
          const clone = successTemplate.content.cloneNode(true); //создаем копию карточки-шаблона
          const container = document.createElement('div');

          container.append(clone);
          body.append(container);

          const removeContainer = () => {
            container.remove();
            document.removeEventListener('click', removeContainer);
          };

          const removeContainerOnEsc = (e) => {
            if (isEscapeKey(e)) {
              container.remove();
              document.removeEventListener('keydown', removeContainerOnEsc);
            }
          };

          document.addEventListener('click', removeContainer);
          document.addEventListener('keydown', removeContainerOnEsc);
        },

        () => {
          const body = document.body;
          const errorTemplate = document.querySelector('#error');
          const clone = errorTemplate.content.cloneNode(true); //создаем копию карточки-шаблона
          const containerErr = document.createElement('div');

          containerErr.append(clone);
          body.append(containerErr);

          const errorButton = document.querySelector('.error__button');

          const removeContainer = () => {
            containerErr.remove();
            errorButton.addEventListener('click', removeContainer);
            document.removeEventListener('click', removeContainer);
          };

          const removeContainerOnEsc = (e) => {
            if (isEscapeKey(e)) {
              containerErr.remove();
              document.removeEventListener('keydown', removeContainerOnEsc);
            }
          };

          errorButton.addEventListener('click', removeContainer);
          document.addEventListener('click', removeContainer);
          document.addEventListener('keydown', removeContainerOnEsc);
        }
      );
    }
  });
}
export { createForm };
