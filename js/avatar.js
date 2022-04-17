const fileChooserAvatar = document.querySelector(
  '.ad-form__field input[type=file]'
);
const preview = document.querySelector('.ad-form-header__preview');
const img = preview.getElementsByTagName('img');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];

  const fileName = file.name.toLowerCase();

  // eslint-disable-next-line arrow-body-style
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    img[0].src = URL.createObjectURL(file);
  }
});

const fileChooserAdvertise = document.querySelector(
  '.ad-form__upload input[type=file]'
);
const previewAdvertise = document.querySelector('.ad-form__photo');

fileChooserAdvertise.addEventListener('change', () => {
  const file = fileChooserAdvertise.files[0];
  const fileName = file.name.toLowerCase();

  // eslint-disable-next-line arrow-body-style
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    previewAdvertise.insertAdjacentHTML(
      'afterbegin',
      '<img src="img/muffin-grey.svg" alt="Фото жилья" width="70" height="70" />'
    );
    const imgadv = previewAdvertise.getElementsByTagName('img');

    imgadv[0].src = URL.createObjectURL(file);
  }
});
