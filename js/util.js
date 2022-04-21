const MIN_VALUE = 10000;
const MAX_VALUE = 50000;

const isEscapeKey = (evt) => evt.key === 'Escape';

function calculatePrice(value, price) {
  if (value === 'low') {
    return price < MIN_VALUE;
  }
  if (value === 'middle') {
    return price >= MIN_VALUE && price <= MAX_VALUE;
  }
  if (value === 'high') {
    return price > MAX_VALUE;
  }
  if (value === 'any') {
    return true;
  }
}

const cutAdvertises = (adv) => adv.slice(0, 10);

export { isEscapeKey, calculatePrice, cutAdvertises };
