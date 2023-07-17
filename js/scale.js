const imageUploadForm = document.querySelector('.img-upload__form');
const buttonScaleSmaller = imageUploadForm.querySelector('.scale__control--smaller');
const buttonScaleBigger = imageUploadForm.querySelector('.scale__control--bigger');
const inputValue = imageUploadForm.querySelector('.scale__control--value');
const imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
let value = 100;
const resetScale = () => {
  imageUploadPreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  inputValue.value = `${DEFAULT_SCALE}%`;
};
imageUploadPreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
inputValue.value = `${DEFAULT_SCALE}%`;
buttonScaleSmaller.addEventListener('click', (evt) =>{
  evt.preventDefault();
  value -= STEP_SCALE;
  if (value < MIN_SCALE) {
    value = MIN_SCALE;
  }
  inputValue.value = `${value}%`;
  imageUploadPreview.style.transform = `scale(${value / 100})`;
});
buttonScaleBigger.addEventListener('click', (evt) =>{
  evt.preventDefault();
  value += STEP_SCALE;
  if (value > MAX_SCALE) {
    value = MAX_SCALE;
  }
  inputValue.value = `${value}%`;
  imageUploadPreview.style.transform = `scale(${value / 100})`;
});

export {resetScale, imageUploadPreview, imageUploadForm};
