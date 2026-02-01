import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
axios.defaults.baseURL = BASE_URL;

axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
};

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get('', {
      params: {
        q: query,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// export async function fetchAndRenderImages(searchQuery) {
//   const imagesArray = [];
//   try {
//     const { hits } = await getImagesByQuery(searchQuery);
//     if (!hits.length) throw new Error('No images');
//     createGallery(hits);
//   } catch (error) {
//     errorToast(
//       'Sorry, there are no images matching your search query. Please, try again!'
//     );
//   } finally {
//     hideLoader();
//     showLoadMoreButton();
//   }
// }
