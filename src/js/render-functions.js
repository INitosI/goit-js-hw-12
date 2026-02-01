import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
export const loadMoreDiv = document.querySelector('.load-more');

export const lightbox = new SimpleLightbox('.gallery a', {});

const gallery = document.querySelector('.gallery');

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" class="gallery-link">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-img"/>
            </a>
            <ul class="info">
                <li class="info-item">
                    <b>Likes</b>
                    ${image.likes}
                </li>
                <li class="info-item">
                    <b>Views</b>
                    ${image.views}
                </li>
                <li class="info-item">
                    <b>Comments</b>
                    ${image.comments}
                </li>
                <li class="info-item">
                    <b>Downloads</b>
                    ${image.downloads}
                </li>
            </ul>
        </li>
        `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  if (!loader) return;
  loader.classList.remove('hidden');
}

export function hideLoader() {
  if (!loader) return;
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  if (loadMoreDiv) {
    loadMoreDiv.classList.remove('hidden');
  }
}

export function hideLoadMoreButton() {
  if (loadMoreDiv) {
    loadMoreDiv.classList.add('hidden');
  }
}
