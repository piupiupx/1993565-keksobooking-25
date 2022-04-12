function getRandom(min, max) {
  if (min >= 0 && max >= 0) {
    if (min > max) {
      const c = max;
      max = min;
      min = c;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
  return 'Числа должны быть натуральными';
}

function getDot(min, max) {
  // рандомное число с плавающей точкой
  if (min > 0 && max > 0) {
    if (min > max) {
      const c = max;
      max = min;
      min = c;
    }
    return Math.random() * (max - min + 1) + min; //Максимум и минимум включаются
  }
  return 'Числа должны быть натуральными';
}

function getRandLengthArray(nameArr) {
  // первый параметр - массив, второй параметр - номер последнего элемента массива, функция создает массив случайной длины из указанного массива
  const countEl = nameArr.length - 1;
  const maxLength = nameArr.length;
  const lengthOfArray = getRandom(1, maxLength);
  const arr = [];
  for (let i = 0; i < lengthOfArray; i++) {
    const indexEl = getRandom(0, countEl);
    const el = nameArr[indexEl];

    if (!arr.includes(el)) {
      arr.push(el);
    }
  }
  return arr;
}
const getRandomArrayElement = (elements) =>
  elements[getRandom(0, elements.length - 1)];
// eslint-disable-next-line arrow-body-style
const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};
export {
  getRandom,
  getDot,
  getRandLengthArray,
  getRandomArrayElement,
  isEscapeKey,
};
