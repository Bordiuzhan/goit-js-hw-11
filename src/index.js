import './css/styles.css';
import axios from 'axios';
import { createMarkup } from './js/createMarcup';
import Notiflix from 'notiflix';

const KEY = '30638186-bb770c9b9d6e6a40dc9ec3884';
const BASE_URL = 'https://pixabay.com/api/';
let page = 1;
let inputValue = '';
const ref = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.guard'),
};
const option = {
  rut: null,
  rootMargin: '50px',
  threshold: 1,
};
const observer = new IntersectionObserver(onLoad, option);

ref.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  inputValue = e.target.searchQuery.value.trim();
  clearUI();
  if (inputValue === '') {
    return;
  }
  insertMarkup(inputValue);
}

function clearUI() {
  ref.gallery.innerHTML = '';
}

async function getData(value) {
  const response = await axios.get(
    `${BASE_URL}?image_type=photo&key=${KEY}&q=${value}&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return response;
}

async function insertMarkup(value) {
  try {
    const fetchData = await getData(value);
    const arrData = fetchData.data.hits;
    if (fetchData.data.total === fetchData.data.totalHits) {
      observer.unobserve(ref.guard);
    }
    const cards = createMarkup(arrData);
    if (arrData.length === 0) {
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    ref.gallery.insertAdjacentHTML('beforeend', cards);
    observer.observe(ref.guard);
  } catch (error) {
    console.log(error);
  }
}
async function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      insertMarkup(inputValue);
      page += 1;
    }
  });
}
