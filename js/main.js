import {renderThumbnails} from './thumbnail.js';
import {setupFormValidation, unblockSubmitButton, setFormSubmit} from './form.js';
import './scale.js';
import './effects.js';
import { showAlert} from './utils.js';
import { getData, sendData} from './api.js';
import { showFilters, setDebouncedSort } from './filters.js';
import { previewPicture } from './upload.js';
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
  renderThumbnails(data);
  showFilters();
  previewPicture();
  setDebouncedSort(data);
} catch(err) {
  showAlert(err.message);
}

