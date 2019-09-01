import {getSearchMarkup} from './components/search.js';
import {getRankMarkup, getRank} from './components/rank.js';
import {getMenuMarkup, getFilter} from './components/menu.js';
import {getSortMarkup} from './components/sort.js';
import {getFilmsMarkup} from './components/films.js';
import {getFilmsListMarkup} from './components/films-list.js';
import {getFilmsListTopRatedMarkup} from './components/films-top-rated.js';
import {getFilmsListMostCommentedMarkup} from './components/films-most-commented.js';
import {getFilmMarkup} from './components/film.js';
import {getFilmDetailsMarkup} from './components/film-details.js';
import {getShowMoreMarkup} from './components/show-more-btn.js';
import resultArray from './data.js';
import {getStatisticMarkup} from './components/statistic.js';

// Main и Header
const siteMainContainer = document.querySelector(`.main`);
const siteHeaderContainer = document.querySelector(`.header`);

export const FILM_COUNT = 5;
export const films = resultArray;
let filmsForLoad = resultArray;

const renderComponent = (container, markup, position, repeat = 1, callback = () => null) => {
  for (let i = 0; i < repeat; i++) {
    container.insertAdjacentHTML(position, markup);
  }
  callback();
};

const renderFilms = (container, count) => {
  count = count <= filmsForLoad.length ? count : filmsForLoad.length;
  for (let i = 0; i < count; i++) {
    let {title, poster, description} = filmsForLoad[i];
    container.insertAdjacentHTML(`beforeend`, getFilmMarkup({title, poster, description}));
  }
  filmsForLoad = filmsForLoad.slice(count);
};

const renderRank = (container) => {
  container.insertAdjacentHTML(`beforeend`, new Array(1)
    .fill(``)
    .map(getRank)
    .map(getRankMarkup)
    .join(``));
};

const renderMenu = (container) => {
  container.insertAdjacentHTML(`beforeend`, new Array(1)
    .fill(``)
    .map(getFilter)
    .map(getMenuMarkup)
    .join(``));
};

// Добавляем основные блоки
renderComponent(siteHeaderContainer, getSearchMarkup(), `beforeend`);
// renderComponent(siteHeaderContainer, getRankMarkup(), `beforeend`);
renderRank(siteHeaderContainer);
renderMenu(siteMainContainer);
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
const loadMoreButton = document.querySelector(`.films-list__show-more`);

const loadMoreButtonHandler = () => {
  renderFilms(filmsListContainer, FILM_COUNT);
  if (filmsForLoad.length === 0) {
    loadMoreButton.removeEventListener(`click`, loadMoreButtonHandler);
    loadMoreButton.remove();
  }
};
loadMoreButton.addEventListener(`click`, loadMoreButtonHandler);

// films-list__container
const filmsListContainer = filmsContainer.querySelector(`.films-list__container`);
renderFilms(filmsListContainer, FILM_COUNT);

// films-list-extra
const filmsListExtraArray = filmsContainer.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < filmsListExtraArray.length; i++) {
  const extraListContainer = filmsListExtraArray[i].querySelector(`.films-list__container`);
  // for (let j = 0; j < 5; j++) {
  //   renderComponent(extraListContainer, getFilmMarkup(), `beforeend`);
  // }
  renderFilms(extraListContainer, 2);
}

const statisticContainer = document.querySelector(`.footer__statistics`);
renderComponent(statisticContainer, getStatisticMarkup(), `beforeend`);

// Показываем попап
renderComponent(document.body, getFilmDetailsMarkup(), `beforeend`);

// Скрываем попап
const closePopupBtn = document.querySelector(`.film-details__close-btn`);
closePopupBtn.addEventListener(`click`, () => (document.querySelector(`.film-details`).style.display = `none`));
