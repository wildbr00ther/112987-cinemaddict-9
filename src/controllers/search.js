import SearchResult from '../components/search-result';
import SearchNoResult from '../components/search-no-result';
import FilmCardsController from './film-cards';
import {FilmsList} from '../components/films-list';
import {Position, unrender, render} from '../utils';


export default class SearchController {
  constructor(container, search, data, onDataChange) {
    this._container = container;
    this._search = search;
    this._films = data;
    this._onDataChangeMain = onDataChange;
    this._searchResult = new SearchResult();
    this._noResult = new SearchNoResult();
    this._filmsList = new FilmsList();
    this._filmCardsController = new FilmCardsController(null, null,  this._onDataChange.bind(this));
  }

  init() {
    this.hide();
    this._search.getElement().querySelector(`input`).addEventListener(`keyup`, (evt) => {
      const films = this._films.filter((film) => (film.title.includes(evt.target.value) || film.title.toLowerCase().includes(evt.target.value)));
      this._showSearchResult(films);
    });
  }

  hide() {
    this._filmsList.getElement().classList.add(`visually-hidden`);
    this._searchResult.getElement().classList.remove(`visually-hidden`);
    this._noResult.getElement().classList.remove(`visually-hidden`);
  }

  show() {
    this._filmsList.getElement().classList.remove(`visually-hidden`);
    this._searchResult.getElement().classList.remove(`visually-hidden`);
    this._noResult.getElement().classList.remove(`visually-hidden`);
  }

  _showSearchResult(films) {
    if (this._searchResult) {
      unrender(this._searchResult.getElement());
      this._searchResult.removeElement();
    }

    if (films.length) {
      unrender(this._noResult.getElement());
      this._noResult.removeElement();

      this._searchResult = new SearchResult(films.length);
      render(this._container, this._searchResult.getElement(), Position.BEFOREEND);
      render(this._container, this._filmsList.getElement(), Position.BEFOREEND);

      this._filmCardsController = new FilmCardsController(null, this._filmsList.getElement().querySelector(`.films-list__container`), this._onDataChange.bind(this));
      this._filmCardsController.setFilmCards(films);
    } else {
      unrender(this._filmsList.getElement());
      this._filmsList.removeElement();
      render(this._container, this._noResult.getElement(), Position.BEFOREEND);
    }
  }

  _onDataChange(films) {
    this.films = films;
    this._onDataChangeMain(this.films);
  }
}
