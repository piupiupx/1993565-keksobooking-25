function createLoader(onSuccess, onError) {
  // здесь возвращается промис
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
      //console.log(data, 'hhhhh');

      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
}

function sendForm(url, formData, onSuccess, onError) {
  return fetch(url, {
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
      onSuccess(data); //jnc.lf
    })
    .catch((err) => {
      onError(err);
    });
}

export { createLoader, sendForm };
