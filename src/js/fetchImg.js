// import axios from 'axios';
// import { createMarkup } from './createMarcup';
// const KEY = '30638186-bb770c9b9d6e6a40dc9ec3884';
// const BASE_URL = 'https://pixabay.com/api/';

//  async function getData(value) {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}?image_type=photo&key=${KEY}&q=${value}&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
//     );
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function onLoad(entries) {
//   console.log(entries);
//   entries.forEach(entry => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       page += 1;
//     }
//   });
// }
// export async function insertMarkup(value) {
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
//     observer.observe(ref.guard);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export default class ImgApiService {
//   constructor() {
//     this.inputValue = '';
//     this.page = 1;
//   }
//   goo() {
//     console.log('good');
//   }

//   //   async fetchData() {
//   //     const url = `${BASE_URL}?image_type=photo&key=${KEY}&q=${this.inputValue}&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

//   //     try {
//   //       const response = await axios.get(url);
//   //       this.incrementPage();
//   //       return response;
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   }

//   incrementPage() {
//     this.page += 1;
//   }
//   resetPage() {
//     this.page = 1;
//   }

//   get inputValues() {
//     return this.inputValue;
//   }
//   set inputValues(newValue) {
//     return (this.inputValue = newValue);
//   }
// }
