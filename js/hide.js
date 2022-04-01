const addList = document.querySelector('.ad-form');

const mapFilters = document.querySelector('.map__filters');

function disableElementList() {
  addList.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
}

function activElementList() {
  addList.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
}

export { activElementList, disableElementList };
