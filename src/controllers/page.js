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
import {Position, typeSorting, typeFilters, render, unrender} from '../utils';
import {FILM_COUNT, FILM_EXTRA_COUNT} from '../main';
import {Menu} from '../components/menu';
import FilmCardsController from './film-cards';

export default class PageController {
  constructor(mainContainer, headerContainer, searchController, statistics, films) {
    this._mainContainer = mainContainer;
    this._headerContainer = headerContainer;
    this._searchController = searchController;
    this._statistics = statistics;
    this._films = films;
    this._showedFilms = FILM_COUNT;
    this._menu = new Menu();
    this._board = new Board();
    this._filmsList = new FilmsList();
    this._sort = new Sort();
    this._noFilms = new NoFilms();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();
    this._buttonLoad = new ButtonLoad();
    this._statistic = new Statistic(films.length);
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._filmCardsController = new FilmCardsController(null, null, this._onDataChange.bind(this));
  }

  init() {
    // Добавляем основные блоки
    render(this._mainContainer, this._sort.getElement(), Position.BEFOREEND);
    // render(this._mainContainer, this._board.getElement(), Position.BEFOREEND);
    render(this._mainContainer, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._filmsList.getElement(), Position.BEFOREEND);
    if (mockArray.length === 0) {
      this._board.getElement().replaceChild(this._noFilms.getElement(), this._filmsList.getElement());
    } else {
      this._renderMenu(this._films);
      this._renderFilmsBoard();
    }

    this._selectedSorting = typeSorting.BY_DEFAULT;
    this._selectedFilter = typeFilters.ALL;
  }

  hide() {
    this._sort.getElement().classList.add(`visually-hidden`);
    this._board.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._sort.getElement().classList.remove(`visually-hidden`);
    this._board.getElement().classList.remove(`visually-hidden`);
    this._renderFilmsBoard();
  }

  _renderFilmsBoard() {
    unrender(this._board.getElement());
    this._board.removeElement();
    unrender(this._filmsList.getElement());
    this._filmsList.removeElement();

    render(this._mainContainer, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._filmsList.getElement(), Position.BEFOREEND);

    const filmsListElement = this._mainContainer.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    this._filmCardsController = new FilmCardsController(this._mainContainer, filmsListContainerElement, this._onDataChange.bind(this));
    this._filmCardsController.setFilmCards(this._films);

    // const buttonLoadHandler = () => {
    //   this._films.slice(this._showedFilms, this._showedFilms + FILM_COUNT)
    //     .forEach((film) => this._renderFilm(filmsListContainerElement, film));
    //
    //   this._showedFilms += FILM_COUNT;
    //
    //   if (this._showedFilms >= this._films.length) {
    //     unrender(this._buttonLoad.getElement());
    //     this._buttonLoad.removeElement();
    //   }
    // };

    // unrender(this._buttonLoad.getElement());
    // this._buttonLoad.removeElement();
    //
    // if (this._showedFilms < this._films.length) {
    //   render(this._board.getElement(), this._buttonLoad.getElement(), Position.BEFOREEND);
    // }
    // this._films.slice(0, this._showedFilms).forEach((film) => this._renderFilm(filmsListContainerElement, film));

    // this._buttonLoad.getElement()
    //   .addEventListener(`click`, () => buttonLoadHandler());

    unrender(this._topRated.getElement());
    unrender(this._mostCommented.getElement());
    this._topRated.removeElement();
    this._mostCommented.removeElement();

    render(this._board.getElement(), this._topRated.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._mostCommented.getElement(), Position.BEFOREEND);
    const filmsListExtraArray = this._board.getElement().querySelectorAll(`.films-list--extra`);
    for (let i = 0; i < filmsListExtraArray.length; i++) {
      const extraListContainer = filmsListExtraArray[i].querySelector(`.films-list__container`);
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
    }

    const statisticContainer = document.querySelector(`.footer__statistics`);
    render(statisticContainer, this._statistic.getElement(), Position.BEFOREEND);

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderMenu() {

    unrender(this._menu.getElement());
    this._menu.removeElement();

    render(this._mainContainer, this._menu.getElement(), Position.AFTERBEGIN);

    const filmsListElement = this._mainContainer.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
    this._filmCardsController = new FilmCardsController(this._mainContainer, filmsListContainerElement, this._onDataChange.bind(this));

    this._menu.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      evt.preventDefault();
      const activeClass = `main-navigation__item--active`;
      const activeLinkElement = this._menu.getElement().querySelector(`.${activeClass}`);
      activeLinkElement.classList.remove(activeClass);
      evt.target.classList.add(activeClass);

      switch (evt.target.dataset.screen) {
        case `all`:
          this.show();
          this._selectedFilter = typeFilters.ALL;
          this._searchController.hide();
          unrender(this._statistic.getElement());
          break;
        case `stats`:
          this.hide();
          this._searchController.hide();
          render(this._mainContainer, this._statistics.getElement(), Position.BEFOREEND);
          break;
        case `watchlist`:
          this.show();
          this._selectedFilter = typeFilters.WATCHLIST;
          this._searchController.hide();
          unrender(this._statistic.getElement());
          break;
        case `history`:
          this.show();
          this._selectedFilter = typeFilters.WATCHED;
          this._searchController.hide();
          unrender(this._statistic.getElement());
          break;
        case `favorites`:
          this.show();
          this._selectedFilter = typeFilters.FAVORITE;
          this._searchController.hide();
          unrender(this._statistic.getElement());
          break;
      }

      this._selectedCards = this._films.slice().filter(this._selectedFilter.FILTER).sort(this._selectedSorting.SORT);
      this._filmCardsController.setFilmCards(this._selectedCards);
    });
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
        this._selectedSorting = typeSorting.BY_DATE;
        break;
      case `rating`:
        this._selectedSorting = typeSorting.BY_RATING;
        break;
      case `default`:
        this._selectedSorting = typeSorting.BY_DEFAULT;
        break;
    }
    this._selectedCards = this._films.slice().filter(this._selectedFilter.FILTER).sort(this._selectedSorting.SORT);
    this._filmCardsController.setFilmCards(this._selectedCards);
  }

  _onDataChange(newData, oldData) {
    const index = this._films.findIndex((film) => film === oldData);

    if (newData === null) {
      this._films = [...this._films.slice(0, index), ...this._films.slice(index + 1)];
      this._showedFilms = Math.min(this._showedFilms, this._films.length);
    } else {
      this._films[index] = newData;
    }

    this._renderFilmsBoard();
    this._renderMenu();
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
}
