import {Search} from './components/search.js';
import {Rank} from './components/rank.js';
import {Menu} from './components/menu.js';
import PageController from './controllers/page.js';
import SearchController from './controllers/search';
import Statistics from './components/statistics';
import {mockArray} from './data.js';
import {Position, render, unrender} from './utils';

const onDataChange = (cards) => {
  mockArray = cards;
};

// Main и Header
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);
export const FILM_COUNT = 5;
export const FILM_EXTRA_COUNT = 2;

const search = new Search();
const rank = new Rank();
// const menu = new Menu();

render(headerContainer, search.getElement(), Position.BEFOREEND);
render(headerContainer, rank.getElement(), Position.BEFOREEND);
// render(mainContainer, menu.getElement(), Position.BEFOREEND);

// export const films = mockArray;
// let filmsForLoad = mockArray;

// const filmsMocks = new Array(FILM_COUNT)
//   .fill(``)
//   .map(getFilmCard);

const statistics = new Statistics();
// render(mainContainer, statistics.getElement(), Position.BEFOREEND);

const searchController = new SearchController(mainContainer, search, mockArray, onDataChange);
const pageController = new PageController(mainContainer, headerContainer, searchController, statistics, mockArray);
searchController.init();
pageController.init();
pageController.show();


search.getElement().querySelector(`input`).addEventListener(`keyup`, (evt) => {
  if (evt.target.value.length >= 2) {
    searchController.show();
    pageController.hide();
  } else {
    searchController.hide();
    pageController.show(mockArray);
  }
});

search.getElement().querySelector(`.search__reset`).addEventListener(`click`, () => {
  searchController.hide();
  pageController.show(mockArray);
});
