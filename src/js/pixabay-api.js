import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
axios.defaults.baseURL = BASE_URL;

axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 9,
};

export function getImagesByQuery(query) {
  return axios
    .get('', {
      params: {
        q: query,
      },
    })
    .then(response => response.data);
}
