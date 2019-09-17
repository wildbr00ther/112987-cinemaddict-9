import {Search} from '../components/search.js';
import {Rank} from '../components/rank.js';
import {Filters} from '../components/filters.js';
import {Sort} from '../components/sort.js';
import {Board} from '../components/board.js';
import {FilmsList} from '../components/films-list.js';
import {TopRated} from '../components/films-top-rated.js';
import {MostCommented} from '../components/films-most-commented.js';
import MovieController from './movie';
import {ButtonLoad} from '../components/show-more-btn.js';
import {Statistic} from '../components/statistic.js';
import {NoFilms} from '../components/no-films';
import {mockArray} from '../data.js';
import {Position, render, unrender} from '../utils';
import {FILM_COUNT, FILM_EXTRA_COUNT} from '../main';

export default class PageController {
  constructor(mainContainer, headerContainer, films) {
    this._mainContainer = mainContainer;
    this._headerContainer = headerContainer;
    this._films = films;
    this._filmsForLoad = mockArray;
    this._search = new Search();
    this._rank = new Rank();
    this._filters = new Filters();
    this._board = new Board();
    this._filmList = new FilmsList();
    this._sort = new Sort();
    this._noFilms = new NoFilms();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();
    this._buttonLoad = new ButtonLoad();
    this._statistic = new Statistic();
    this._filmsListContainer = null;
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  _renderFilms(container, films, count) {
    count = count <= this._filmsForLoad.length ? count : this._filmsForLoad.length;
    for (let i = 0; i < count; i++) {
      this._renderFilm(container, films[i]);
    }
    this._filmsForLoad = this._filmsForLoad.slice(count);
  }

  _renderFilm(container, filmMock) {
    const movieController = new MovieController(container, filmMock, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._filmsListContainer.innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortedByDate = this._films.slice().sort((a, b) => a.releaseDate - b.releaseDate);
        sortedByDate.forEach((filmMock) => this._renderFilm(this._filmsListContainer, filmMock));
        break;
      case `rating`:
        const sortedByRating = this._films.slice().sort((a, b) => b.rating - a.rating);
        sortedByRating.forEach((filmMock) => this._renderFilm(this._filmsListContainer, filmMock));
        break;
      case `default`:
        this._films.forEach((filmMock) => this._renderFilm(this._filmsListContainer, filmMock));
        break;
    }
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((it) => it === oldData)] = newData;
    this._renderFilms(this._filmsListContainer, this._films, FILM_COUNT);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  init() {
    // Добавляем основные блоки
    render(this._headerContainer, this._search.getElement(), Position.BEFOREEND);
    render(this._headerContainer, this._rank.getElement(), Position.BEFOREEND);
    render(this._mainContainer, this._filters.getElement(), Position.BEFOREEND);
    render(this._mainContainer, this._sort.getElement(), Position.BEFOREEND);
    render(this._mainContainer, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._filmList.getElement(), Position.BEFOREEND);

    this._filmsListContainer = this._board.getElement().querySelector(`.films-list__container`);

    if (mockArray.length === 0) {
      this._board.getElement().replaceChild(this._noFilms.getElement(), this._filmList.getElement());
    } else {
      render(this._board.getElement(), this._topRated.getElement(), Position.BEFOREEND);
      render(this._board.getElement(), this._mostCommented.getElement(), Position.BEFOREEND);
      render(this._filmList.getElement(), this._buttonLoad.getElement(), Position.BEFOREEND);

      const buttonLoadHandler = () => {
        this._renderFilms(this._filmsListContainer, this._filmsForLoad, FILM_COUNT);

        if (this._filmsForLoad.length === 0) {
          unrender(this._buttonLoad.getElement());
          this._buttonLoad.set();
        }
      };
      this._buttonLoad.getElement().addEventListener(`click`, buttonLoadHandler);

      this._renderFilms(this._filmsListContainer, this._films, FILM_COUNT);

      const filmsListExtraArray = this._board.getElement().querySelectorAll(`.films-list--extra`);
      for (let i = 0; i < filmsListExtraArray.length; i++) {
        const extraListContainer = filmsListExtraArray[i].querySelector(`.films-list__container`);
        this._renderFilms(extraListContainer, this._films, FILM_EXTRA_COUNT);
      }

      const statisticContainer = document.querySelector(`.footer__statistics`);
      render(statisticContainer, this._statistic.getElement(), Position.BEFOREEND);
    }

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }
}
