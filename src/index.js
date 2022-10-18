import './css/styles.css';
import ImgApiService, { getData } from './js/fetchImg';
import { createMarkup } from './js/createMarcup';
import Notiflix from 'notiflix';
import ImgApiService from './js/fetchImg';

const ref = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
};
const ImgApiService = new ImgApiService();

ref.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  ImgApiService.inputValues = e.target.searchQuery.value.trim();

  if (ImgApiService.inputValue === '') {
    return;
  }

  try {
    const dataFetch = await ImgApiService.fetchData();
    console.log('good');

    const arrData = dataFetch.data.hits;
    const cards = createMarkup(arrData);
    if (arrData.length === 0) {
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    ref.gallery.insertAdjacentHTML('beforeend', cards);
  } catch (error) {
    console.log(error);
  }
}

function clearUI() {
  ref.gallery.innerHTML = '';
}
