import MovieController from './movie';
import {ButtonLoad} from '../components/show-more-btn.js';
import {FilmsList} from "../components/films-list";
import {FILM_COUNT} from '../main';
import {Position, render, unrender} from '../utils';

export default class FilmCardsController {
  constructor(mainContainer, container, onDataChange) {
    this._mainContainer = mainContainer;
    this._container = container;
    this._onDataChangeMain = onDataChange;

    this._films = [];
    this._buttonLoad = new ButtonLoad();
    this._filmsList = new FilmsList();
    this._subscriptions = [];
    this._showedFilms = FILM_COUNT;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  setFilmCards(films) {
    this._films = films;
    this._subscriptions = [];
    this._container.innerHTML = ``;
    // this._films.forEach((card) => this._renderFilmCard(card));
    this._films.slice(0, this._showedFilms).forEach((film) => this._renderFilmCard(film));
    this._renderButtonLoad();
  }

  _renderFilmCard(card) {
    const movieController = new MovieController(this._container, card, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _renderButtonLoad() {
    unrender(this._buttonLoad.getElement());
    this._buttonLoad.removeElement();

    if (this._showedFilms < this._films.length) {
      render(this._mainContainer.querySelector(`.films-list`), this._buttonLoad.getElement(), Position.BEFOREEND);
    }
    this._buttonLoad.getElement().addEventListener(`click`, () => this._buttonLoadHandler());
  }

  _buttonLoadHandler() {
    this._films.slice(this._showedFilms, this._showedFilms + FILM_COUNT)
      .forEach((film) => this._renderFilmCard(film));

    this._showedFilms += FILM_COUNT;

    if (this._showedFilms >= this._films.length) {
      unrender(this._buttonLoad.getElement());
      this._buttonLoad.removeElement();
    }
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((card) => card === oldData)] = newData;
    this.setFilmCards(this._films);
    this._onDataChangeMain(this._films);
  }
}
