import PageController from './controllers/page.js';
import {mockArray} from './data.js';


// Main и Header
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);
export const FILM_COUNT = 5;
export const FILM_EXTRA_COUNT = 2;
// export const films = mockArray;
// let filmsForLoad = mockArray;

// const filmsMocks = new Array(FILM_COUNT)
//   .fill(``)
//   .map(getFilmCard);

const pageController = new PageController(mainContainer, headerContainer, mockArray);
pageController.init();

