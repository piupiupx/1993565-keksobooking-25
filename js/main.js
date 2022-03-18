куку;

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

const photo = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const checkinout = ['12:00', '13:00', '14:00'];

const feat = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const typeArr = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const pict = 'img/avatars/user{{xx}}.png';

const getRandomArrayElement = (elements) =>
  elements[getRandom(0, elements.length - 1)];

// eslint-disable-next-line no-unused-vars
const createAppart = () => {
  const location = {
    lat: getDot(35.65, 35.7),
    lng: getDot(139.7, 139.8),
  };
  const ind4 = getRandom(0, 4); // рандомно ищет индекс для типа жилища
  const typeApp = typeArr[ind4]; // рандомный тип жилища
  const rand10 = getRandom(1, 10);
  const newstr = pict.replace('{{xx}}', rand10 < 10 ? `0${rand10}` : rand10); // заменяет в строке avatar {{хх}} на число от 01 до 10

  return {
    location,
    author: {
      avatar: newstr,
    },
    offer: {
      title: 'Временное описание',
      guests: getRandom(1, 10),
      address: `${location.lat}, ${location.lng}`,
      prise: getRandom(1, 500),
      type: typeApp,
      rooms: getRandom(1, 10),
      // eslint-disable-next-line no-dupe-keys
      guests: getRandom(1, 10),
      checkin: getRandomArrayElement(checkinout),
      checkout: getRandomArrayElement(checkinout),
      features: getRandLengthArray(feat),
      description: 'Временное описание',
      photos: getRandLengthArray(photo),
    },
  };
};
// eslint-disable-next-line no-unused-vars
const similarAppart = Array.from({ length: 10 }, createAppart); // создает 10 объектов с рандомными значениями
//console.log(similarAppart);
