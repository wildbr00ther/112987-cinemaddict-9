import MovieController from './movie';

export default class FilmCardsController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChangeMain = onDataChange;

    this._films = [];
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  setFilmCards(films) {
    this._films = films;
    this._subscriptions = [];
    this._container.innerHTML = ``;
    this._films.forEach((card) => this._renderFilmCard(card));
  }

  _renderFilmCard(card) {
    const movieController = new MovieController(this._container, card, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
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
