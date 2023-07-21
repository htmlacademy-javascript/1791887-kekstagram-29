import {renderThumbnails} from './thumbnail.js';
import {setupFormValidation} from './form.js';
import './scale.js';
import './effects.js';
import { showAlert} from './utils.js';
import { getData } from './api.js';
//import { renderGallery } from './gallery.js';

setupFormValidation();

try {
  const data = await getData();
  renderThumbnails(data);
} catch(err) {
  showAlert(err.message);
}

