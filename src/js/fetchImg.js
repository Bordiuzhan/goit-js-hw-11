import axios from 'axios';
const KEY = '30638186-bb770c9b9d6e6a40dc9ec3884';
const BASE_URL = 'https://pixabay.com/api/';
// let page = 1;

// export async function getData(value) {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}?image_type=photo&key=${KEY}&q=${value}&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
//     );
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

export default class ImgApiService {
  constructor() {
    this.inputValue = '';
    this.page = 1;
  }

  async fetchData() {
    try {
      console.log('good');
      const response = await axios.get(
        `${BASE_URL}?image_type=photo&key=${KEY}&q=${this.inputValue}&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      this.incrementPage();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get inputValues() {
    return this.inputValue;
  }
  set inputValues(newValue) {
    return (this.inputValue = newValue);
  }
}
