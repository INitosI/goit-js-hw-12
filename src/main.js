import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  lightbox,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';

const errorToast = message => {
  const toast = iziToast.error({
    message,
    position: 'topRight',
    iconUrl: new URL('./img/err-icon.svg', import.meta.url).href,
    color: 'red',
    class: 'custom-toast',
    close: false,
  });

  // Добавляем кастомный крестик
  setTimeout(() => {
    const toastElement = document.querySelector('.custom-toast');
    if (toastElement && !toastElement.querySelector('.toast-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'toast-close-btn';
      closeBtn.innerHTML = '✕';
      closeBtn.addEventListener('click', () => {
        const parent = closeBtn.closest('.iziToast-wrapper');
        if (parent) parent.remove();
      });

      const body = toastElement.querySelector('.iziToast-body');
      if (body) body.appendChild(closeBtn);
    }
  }, 0);
};

const form = document.querySelector('.form');
const searchInput = document.querySelector('.form input');

form.addEventListener('submit', event => {
  event.preventDefault();
  clearGallery();

  if (!form.checkValidity()) {
    errorToast(
      'Sorry, there are no images matching your search query. Please, try again!'
    );
    return;
  }
  showLoader();
  const searchQuery = searchInput.value.trim();
  const getedImages = getImagesByQuery(searchQuery);

  const imagesArray = [];
  getedImages
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      imagesArray.push(...data.hits);
      createGallery(imagesArray);
    })
    .catch(error => {
      errorToast(
        'Sorry, there are no images matching your search query. Please, try again!'
      );
    })
    .finally(() => {
      hideLoader();
    });

  searchInput.value = '';
});
