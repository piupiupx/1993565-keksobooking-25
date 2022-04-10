fetch('https://25.javascript.pages.academy/keksobooking/data', {
  method: 'GET',
  credentials: 'same-origin',
  body: new FormData(),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Результат', data);
  });
