import {Search} from '../components/search.js';
import {Rank} from '../components/rank.js';
import {Filters} from '../components/filters.js';
import {Sort} from '../components/sort.js';
import {Board} from '../components/board.js';
import {FilmsList} from '../components/films-list.js';
import {FilmsListContainer} from '../components/film-list-container.js';
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
    this._filmsList = new FilmsList();
    this._filmsListContainer = new FilmsListContainer();
    this._sort = new Sort();
    this._noFilms = new NoFilms();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();
    this._buttonLoad = new ButtonLoad();
    this._statistic = new Statistic();
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    // Добавляем основные блоки
    render(this._headerContainer, this._search.getElement(), Position.BEFOREEND);
    render(this._headerContainer, this._rank.getElement(), Position.BEFOREEND);
    render(this._mainContainer, this._filters.getElement(), Position.BEFOREEND);
    render(this._mainContainer, this._sort.getElement(), Position.BEFOREEND);
    // render(this._mainContainer, this._board.getElement(), Position.BEFOREEND);

    render(this._mainContainer, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._filmsList.getElement(), Position.BEFOREEND);
    if (mockArray.length === 0) {
      this._board.getElement().replaceChild(this._noFilms.getElement(), this._filmsList.getElement());
    } else {
      render(this._filmsList.getElement(), this._filmsListContainer.getElement(), Position.BEFOREEND);
      this._renderFilmsBoard(this._films);
    }
  }

  _renderFilmsBoard(films) {
    unrender(this._board.getElement());
    this._board.removeElement();
    unrender(this._filmsList.getElement());
    this._filmsList.removeElement();
    unrender(this._filmsListContainer.getElement());
    this._filmsListContainer.removeElement();

    render(this._mainContainer, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._filmsList.getElement(), Position.BEFOREEND);
    render(this._filmsList.getElement(), this._filmsListContainer.getElement(), Position.BEFOREEND);

    const filmsListElement = this._mainContainer.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    let count = FILM_COUNT <= this._filmsForLoad.length ? FILM_COUNT : this._filmsForLoad.length;
    // const firstArrayFilmCards = (FILM_COUNT < 22) ? this._films.slice(0, FILM_COUNT) : films;
    this._filmsForLoad.slice(0, count).forEach((film) => this._renderFilm(filmsListContainerElement, film));
    this._filmsForLoad = this._filmsForLoad.slice(count);

    const buttonLoadHandler = () => {
      // this._renderFilms(this._filmsListContainer, this._filmsForLoad, FILM_COUNT);

      // let count = FILM_COUNT;
      count = FILM_COUNT <= this._filmsForLoad.length ? FILM_COUNT : this._filmsForLoad.length;
      for (let i = 0; i < count; i++) {
        this._renderFilm(this._filmsListContainer.getElement(), films[i]);
      }
      this._filmsForLoad = this._filmsForLoad.slice(count);
      if (this._filmsForLoad.length === 0) {
        unrender(this._buttonLoad.getElement());
        this._buttonLoad.set();
      }
    };
    render(filmsListElement, this._buttonLoad.getElement(), Position.BEFOREEND);
    this._buttonLoad.getElement().addEventListener(`click`, buttonLoadHandler);

    // let count = FILM_COUNT;
    // count = count <= this._filmsForLoad.length ? count : this._filmsForLoad.length;
    // for (let i = 0; i < count; i++) {
    //   this._renderFilm(this._filmsListContainer.getElement(), films[i]);
    // }
    // this._filmsForLoad = this._filmsForLoad.slice(count);

    // this._renderFilms(this._filmsListContainer, this._films, FILM_COUNT);

    unrender(this._topRated.getElement());
    unrender(this._mostCommented.getElement());
    this._topRated.removeElement();
    this._mostCommented.removeElement();

    render(this._board.getElement(), this._topRated.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._mostCommented.getElement(), Position.BEFOREEND);
    const filmsListExtraArray = this._board.getElement().querySelectorAll(`.films-list--extra`);
    for (let i = 0; i < filmsListExtraArray.length; i++) {
      const extraListContainer = filmsListExtraArray[i].querySelector(`.films-list__container`);
      // this._renderFilms(extraListContainer, this._films, FILM_EXTRA_COUNT);
      switch (i) {
        case 0:
          const sortedRate = this._films.slice().sort((a, b) => b.rating - a.rating);
          sortedRate.slice(0, FILM_EXTRA_COUNT).forEach((film) => this._renderFilm(extraListContainer, film));
          break;

        case 1:
          const sortedComment = this._films.slice().sort((a, b) => b.comments.length - a.comments.length);
          sortedComment.slice(0, FILM_EXTRA_COUNT).forEach((film) => this._renderFilm(extraListContainer, film));
          break;
      }
      // this._renderFilm(extraListContainer, this._films[i]);
    }

    const statisticContainer = document.querySelector(`.footer__statistics`);
    render(statisticContainer, this._statistic.getElement(), Position.BEFOREEND);

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderFilm(container, filmMock) {
    const movieController = new MovieController(container, filmMock, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    let filmsListContainerElement = this._mainContainer.querySelector(`.films-list__container`);

    if (evt.target.tagName !== `A`) {
      return;
    }
    filmsListContainerElement.innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortedByDate = this._films.slice().sort((a, b) => a.releaseDate - b.releaseDate);
        sortedByDate.forEach((filmMock) => this._renderFilm(filmsListContainerElement, filmMock));
        break;
      case `rating`:
        const sortedByRating = this._films.slice().sort((a, b) => b.rating - a.rating);
        sortedByRating.forEach((filmMock) => this._renderFilm(filmsListContainerElement, filmMock));
        break;
      case `default`:
        this._films.forEach((filmMock) => this._renderFilm(filmsListContainerElement, filmMock));
        break;
    }
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((it) => it === oldData)] = newData;
    this._renderFilmsBoard(this._films);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
}
