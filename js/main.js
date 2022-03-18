import 'data.js';
import 'util.js';

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
