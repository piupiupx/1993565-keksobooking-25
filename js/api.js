function createLoader(onSuccess, onError) {
  return fetch('https://25.javascript.pages.academy/keksobooking/data', {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
}

function sendForm(formData, onSuccess, onError) {
  return fetch('https://25.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: formData,

    credentials: 'same-origin',
    contentType: 'multipart/form-data',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      console.log(err, '2');
      console.log(onError, '1');

      onError(err);
    });
}

export { createLoader, sendForm };
