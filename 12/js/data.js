import { getPictures } from './mocks.js';
const photos = getPictures();
/**
 * @param
 */

const getPhotoById = (id) => photos.find((photo) => photo.id === id);

export {photos, getPhotoById};
