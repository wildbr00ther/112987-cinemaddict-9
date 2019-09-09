import {Search} from './components/search.js';
import {Rank} from './components/rank.js';
import {Filters} from './components/filters.js';
import {Sort} from './components/sort.js';
import {Films} from './components/films.js';
import {FilmsList} from './components/films-list.js';
import {TopRated} from './components/films-top-rated.js';
import {MostCommented} from './components/films-most-commented.js';
import {Film} from './components/film.js';
import {FilmDetails} from './components/film-details.js';
import {ButtonLoad} from './components/show-more-btn.js';
import {Statistic} from './components/statistic.js';
import {NoFilms} from './components/no-films';
import {mockArray, getFilmCard} from './data.js';
import {Position, render, unrender} from './utils';

// Main и Header
const siteMainContainer = document.querySelector(`.main`);
const siteHeaderContainer = document.querySelector(`.header`);
export const FILM_COUNT = 5;
export const FILM_EXTRA_COUNT = 2;
// export const films = mockArray;
let filmsForLoad = mockArray;

const filmsMocks = new Array(FILM_COUNT)
  .fill(``)
  .map(getFilmCard);

const renderFilm = (container, filmMock) => {
  const film = new Film(filmMock);
  const filmDetails = new FilmDetails(filmMock);
  const filmPopUpSelectors = document.querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      unrender(filmDetails.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const showFilmDetails = () => {
    render(document.body, filmDetails.getElement(), Position.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const hideFilmDetails = () => {
    unrender(filmDetails.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  Array.from(filmPopUpSelectors).forEach((selector) => {
    selector.addEventListener(`click`, showFilmDetails);
  });

  filmDetails.getElement()
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, hideFilmDetails);

  filmDetails.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  filmDetails.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  render(container, film.getElement(), Position.BEFOREEND);
};
const renderFilms = (container, films, count) => {
  count = count <= filmsForLoad.length ? count : filmsForLoad.length;
  for (let i = 0; i < count; i++) {
    renderFilm(container, films[i]);
  }
  filmsForLoad = filmsForLoad.slice(count);
};

// Добавляем основные блоки
const search = new Search();
render(siteHeaderContainer, search.getElement(), Position.BEFOREEND);

const rank = new Rank();
render(siteHeaderContainer, rank.getElement(), Position.BEFOREEND);

const filters = new Filters();
render(siteMainContainer, filters.getElement(), Position.BEFOREEND);

const sort = new Sort();
render(siteMainContainer, sort.getElement(), Position.BEFOREEND);

const mainFilmsContainer = new Films();
render(siteMainContainer, mainFilmsContainer.getElement(), Position.BEFOREEND);

// Добавляем в Films списки
const filmsContainer = siteMainContainer.querySelector(`.films`);

const filmsMarkup = new FilmsList();
render(filmsContainer, filmsMarkup.getElement(), Position.BEFOREEND);

const filmsList = filmsContainer.querySelector(`.films-list`);
if (mockArray.length === 0) {
  const noTask = new NoFilms();
  filmsContainer.replaceChild(noTask.getElement(), filmsList);
} else {

  const topRated = new TopRated();
  render(filmsContainer, topRated.getElement(), Position.BEFOREEND);

  const mostCommented = new MostCommented();
  render(filmsContainer, mostCommented.getElement(), Position.BEFOREEND);

  // Показать еще
  const buttonLoad = new ButtonLoad();
  render(filmsList, buttonLoad.getElement(), Position.BEFOREEND);

  const buttonLoadHandler = () => {
    renderFilms(filmsListContainer, filmsForLoad, FILM_COUNT);

    if (filmsForLoad.length === 0) {
      unrender(buttonLoad.getElement());
      buttonLoad.set();
    }
  };
  buttonLoad.getElement().addEventListener(`click`, buttonLoadHandler);

  // films-list__container
  const filmsListContainer = filmsContainer.querySelector(`.films-list__container`);
  renderFilms(filmsListContainer, filmsMocks, FILM_COUNT);

  // films-list-extra
  const filmsListExtraArray = filmsContainer.querySelectorAll(`.films-list--extra`);
  for (let i = 0; i < filmsListExtraArray.length; i++) {
    const extraListContainer = filmsListExtraArray[i].querySelector(`.films-list__container`);
    renderFilms(extraListContainer, filmsMocks, FILM_EXTRA_COUNT);
  }

  const statisticContainer = document.querySelector(`.footer__statistics`);
  const statistic = new Statistic(mockArray.length);
  render(statisticContainer, statistic.getElement(), Position.BEFOREEND);
}


