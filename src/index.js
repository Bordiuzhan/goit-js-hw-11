import './css/styles.css';
import axios from 'axios';
import { createMarkup } from './js/createMarcup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const KEY = '30638186-bb770c9b9d6e6a40dc9ec3884';
const BASE_URL = 'https://pixabay.com/api/';
const lightbox = new SimpleLightbox(`.gallery a`);
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

ref.form.addEventListener('submit', onSubmit);
const observer = new IntersectionObserver(onLoad, option);

function onSubmit(e) {
  e.preventDefault();
  obj.page = 1;
  obj.value = e.target.searchQuery.value.trim();
  obj.clearUI();
  if (obj.value === '') {
    return;
  }
  obj.insertMarkup();
}
function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      obj.page += 1;
      obj.insertMarkup();
      observer.unobserve(ref.guard);
    }
  });
}

const obj = {
  page: 0,
  value: '',

  async getData() {
    const response = await axios.get(
      `${BASE_URL}?image_type=photo&key=${KEY}&q=${this.value}&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    return response;
  },

  async insertMarkup() {
    try {
      const fetchData = await this.getData();
      const arrData = fetchData.data.hits;
      const cards = createMarkup(arrData);

      if (arrData.length === 0) {
        return Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (this.page === 1) {
        console.log(fetchData.data.total);
        Notiflix.Notify.success(
          `Hooray! We found ${fetchData.data.total} images. `
        );
      }
      ref.gallery.insertAdjacentHTML('beforeend', cards);
      lightbox.refresh();
      window.scrollBy({ behavior: 'smooth' });
      observer.observe(ref.guard);
    } catch (error) {
      console.log(error);
    }
  },
  clearUI() {
    ref.gallery.innerHTML = '';
  },
};

// async function getData(value) {
//   const response = await axios.get(
//     `${BASE_URL}?image_type=photo&key=${KEY}&q=${value}&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
//   );
//   return response;
// }

// async function insertMarkup(value) {
//   try {
//     const fetchData = await getData(value);
//     const arrData = fetchData.data.hits;
//     const cards = createMarkup(arrData);

//     if (arrData.length === 0) {
//       return Notiflix.Notify.info(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//     ref.gallery.insertAdjacentHTML('beforeend', cards);
//     lightbox.refresh();
//     const { height: cardHeight } =
//       ref.gallery.firstElementChild.getBoundingClientRect();
//     window.scrollBy({
//       top: 0,
//       behavior: 'smooth',
//     });

//     Notiflix.Notify.success(
//       `Hooray! We found ${fetchData.data.total} images. `
//     );

//     observer.observe(ref.guard);
//   } catch (error) {
//     console.log(error);
//   }
// }
