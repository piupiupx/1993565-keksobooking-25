// eslint-disable-next-line arrow-body-style
const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

function calculatePrice(value, price) {
  if (value === 'low') {
    return price < 10000;
  }
  if (value === 'middle') {
    return price >= 10000 && price <= 50000;
  }
  if (value === 'high') {
    return price > 50000;
  }
  if (value === 'any') {
    return true;
  }
}

const cutAdvertises = (adv) => adv.slice(0, 10);

export { isEscapeKey, debounce, calculatePrice, cutAdvertises };
