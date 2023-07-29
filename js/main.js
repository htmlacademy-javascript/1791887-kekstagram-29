import {setupFormValidation, unblockSubmitButton, setFormSubmit} from './form-validate.js';
import './image-scale.js';
import './image-effects.js';
import { showAlert} from './utils.js';
import { getData, sendData} from './api.js';
import { showFilters, setDebouncedSort } from './gallery-filters.js';
import { previewPicture } from './user-upload.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

setupFormValidation();

setFormSubmit(async (data) => {
  try {
    await sendData(data);
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    unblockSubmitButton();
  }
});

try {
  const data = await getData();
  showFilters();
  previewPicture();
  setDebouncedSort(data);
} catch(err) {
  showAlert(err.message);
}

