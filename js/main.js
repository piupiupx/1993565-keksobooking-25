function getRandom(min, max) {
  if (min > 0 && max > 0) {
    if (min > max) {
      c = max;
      max = min;
      min = c;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
  return "Числа должны быть натуральными";
}

function getDot(min, max) {
  // рандомное число с плавающей точкой
  if (min > 0 && max > 0) {
    if (min > max) {
      c = max;
      max = min;
      min = c;
    }
    return Math.random() * (max - min + 1) + min; //Максимум и минимум включаются
  }
  return "Числа должны быть натуральными";
}

function getRandomIndx(min, max) {
  // функция возвращает рандомный индекс включая 0
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
function getRandLengthArray(nameArr, countEl) {
  // первый параметр - массив, второй параметр - номер последнего элемента массива, функция создает массив случайной длины из указанного массива
  let maxLength = nameArr.length;
  let lengthOfArray = getRandom(1, maxLength);
  let arr = [];
  for (let i = 0; i < lengthOfArray; i++) {
    let indexEl = getRandomIndx(0, countEl);
    let el = nameArr[indexEl];

    if (!arr.includes(el)) {
      arr.push(el);
    }
  }
  return arr;
}

const photo = [
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg",
];
const checkinout = ["12:00", "13:00", "14:00"];

const feat = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];
const typeArr = ["palace", "flat", "house", "bungalow", "hotel"];
let pict = "img/avatars/user{{xx}}.png";

const getRandomArrayElement = (elements) => {
  return elements[getRandomIndx(0, elements.length - 1)];
};

const createAppart = () => {
  const location = {
    lat: getDot(35.65, 35.7),
    lng: getDot(139.7, 139.8),
  };
  const ind4 = getRandomIndx(0, 4); // рандомно ищет индекс для типа жилища
  let typeApp = typeArr[ind4]; // рандомный тип жилища
  const rand10 = getRandom(1, 10);
  let newstr = pict.replace("{{xx}}", rand10 < 10 ? `0${rand10}` : rand10); // заменяет в строке avatar {{хх}} на число от 01 до 10

  return {
    author: {
      avatar: newstr,
    },
    offer: {
      title: "Временное описание",
      guests: getRandom(1, 10),
      address: `${location.lat}, ${location.lng}`,
      prise: getRandom(1, 500),
      type: typeApp,
      rooms: getRandom(1, 10),
      guests: getRandom(1, 10),
      checkin: getRandomArrayElement(checkinout),
      checkout: getRandomArrayElement(checkinout),
      features: getRandLengthArray(feat, 5),
      description: "Временное описание",
      photos: getRandLengthArray(photo, 2),
    },
  };
};
const similarAppart = Array.from({ length: 10 }, createAppart); // создает 10 объектов с рандомными значениями
console.log(similarAppart);
