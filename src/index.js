import './css/styles.css';
import axios from 'axios';
import { createMarkup } from './js/createMarcup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const KEY = '30638186-bb770c9b9d6e6a40dc9ec3884';
const BASE_URL = 'https://pixabay.com/api/';
let page = 0;
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
const lightbox = new SimpleLightbox(`.gallery a`);

ref.form.addEventListener('submit', onSubmit);
// ref.gallery.addEventListener('click', onOpenPicture);
const observer = new IntersectionObserver(onLoad, option);

function onSubmit(e) {
  e.preventDefault();
  page = 1;
  inputValue = e.target.searchQuery.value.trim();
  clearUI();
  if (inputValue === '') {
    return;
  }
  insertMarkup(inputValue);
  console.log(ref.gallery);
  if (ref.gallery.firstElementChild) {
    console.log('good');
    const { height: cardHeight } =
      ref.gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
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
    const cards = createMarkup(arrData);

    if (arrData.length === 0) {
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    ref.gallery.insertAdjacentHTML('beforeend', cards);
    lightbox.refresh();
    const { height: cardHeight } =
      ref.gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    Notiflix.Notify.success(
      `Hooray! We found ${fetchData.data.total} images. `
    );

    observer.observe(ref.guard);
  } catch (error) {
    console.log(error);
  }
}
async function onLoad(entries) {
  entries.forEach(entry => {
    console.log(entries);
    if (entry.isIntersecting) {
      page += 1;
      insertMarkup(inputValue);
      observer.unobserve(ref.guard);
    }
  });
}

// function onOpenPicture(e) {
//   e.preventDefault();
//   console.log(instance.on('show.simplelightbox'));
//   instance.on('show.simplelightbox');
// }

console.log('GO');
