import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  lightbox,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMoreDiv,
} from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';

let currentPage = 1;
let searchQuery = null;
export let firstItemHeight = 0;
// const card = document.querySelector('.gallery.item');
// const cardHeight = card?.firstChild.getBoundingClientRect().height || 0;

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
  currentPage = 1;
  firstItemHeight = 0;
  clearGallery();

  if (!form.checkValidity()) {
    errorToast(
      'Sorry, there are no images matching your search query. Please, try again!'
    );
    hideLoadMoreButton();
    return;
  }
  showLoader();
  searchQuery = searchInput.value.trim();

  fetchAndRenderImages(searchQuery, currentPage);

  searchInput.value = '';
});

loadMoreDiv.addEventListener('click', () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();
  fetchAndRenderImages(searchQuery, currentPage);
});

const PER_PAGE = 15;

async function fetchAndRenderImages(searchQuery, page = 1) {
  try {
    const data = await getImagesByQuery(searchQuery, page);

    const totalHits = data?.totalHits ?? 0;
    const hits = data?.hits ?? [];

    if (hits.length === 0) {
      if (page === 1) {
        errorToast(
          'Sorry, there are no images matching your search query. Please, try again!'
        );
      }
      hideLoadMoreButton();
      return;
    }

    createGallery(hits);

    if (page > 1) {
      const cardHeight =
        document
          .querySelector('.gallery')
          ?.firstElementChild?.getBoundingClientRect().height ?? 0;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const totalPages = Math.ceil(totalHits / PER_PAGE);
    const hasMore = page < totalPages;

    if (hasMore) {
      showLoadMoreButton();
      return;
    }

    hideLoadMoreButton();
    errorToast("We're sorry, but you've reached the end of search results.");
  } catch (error) {
    errorToast(
      'Sorry, there are no images matching your search query. Please, try again!'
    );
  } finally {
    hideLoader();
  }
}
