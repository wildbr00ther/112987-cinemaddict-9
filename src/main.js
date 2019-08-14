import {getSearchMarkup} from './components/search.js';
import {getRankMarkup} from './components/rank.js';
import {getMenuMarkup} from './components/menu.js';
import {getSortMarkup} from './components/sort.js';
import {getFilmsMarkup} from './components/films.js';
import {getFilmsListMarkup} from './components/films-list.js';
import {getFilmsListTopRatedMarkup} from './components/films-top-rated.js';
import {getFilmsListMostCommentedMarkup} from './components/films-most-commented.js';
import {getFilmMarkup} from './components/film.js';
import {getFilmDetailsMarkup} from './components/film-details.js';
import {getShowMoreMarkup} from './components/show-more-btn.js';

const renderComponent = (containerName, position, template) => {
  containerName.insertAdjacentHTML(template, position);
};

// Main и Header
const siteMainContainer = document.querySelector(`.main`);
const siteHeaderContainer = document.querySelector(`.header`);

// Добавляем основные блоки
renderComponent(siteHeaderContainer, getSearchMarkup(), `beforeend`);
renderComponent(siteHeaderContainer, getRankMarkup(), `beforeend`);

renderComponent(siteMainContainer, getMenuMarkup(), `beforeend`);
renderComponent(siteMainContainer, getSortMarkup(), `beforeend`);
renderComponent(siteMainContainer, getFilmsMarkup(), `beforeend`);

// films
const filmsContainer = siteMainContainer.querySelector(`.films`);
// Добавляем в Films списки
renderComponent(filmsContainer, getFilmsListMarkup(), `beforeend`);
renderComponent(filmsContainer, getFilmsListTopRatedMarkup(), `beforeend`);
renderComponent(filmsContainer, getFilmsListMostCommentedMarkup(), `beforeend`);

// films-list
const filmsList = filmsContainer.querySelector(`.films-list`);
// Добавляем кнопку show more
renderComponent(filmsList, getShowMoreMarkup(), `beforeend`);

// films-list__container
const filmsListContainer = filmsContainer.querySelector(`.films-list__container`);
// Добавляем фильмы в films-list__container
for (let i = 0; i < 5; i++) {
  renderComponent(filmsListContainer, getFilmMarkup(), `beforeend`);
}

// films-list-extra
const filmsListExtraArray = filmsContainer.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < filmsListExtraArray.length; i++) {
  const extraListContainer = filmsListExtraArray[i].querySelector(`.films-list__container`);
  for (let j = 0; j < 5; j++) {
    renderComponent(extraListContainer, getFilmMarkup(), `beforeend`);
  }
}

renderComponent(document.body, getFilmDetailsMarkup(), `beforeend`);
