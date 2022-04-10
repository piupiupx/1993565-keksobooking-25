const sliderElement = document.querySelector('.ad-form__slider');
const priceForm = document.querySelector('[name="price"]');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },

  step: 1000,
  start: 0,
  connect: 'lower',
});
sliderElement.noUiSlider.on('update', () => {
  priceForm.value = sliderElement.noUiSlider.get();
});
