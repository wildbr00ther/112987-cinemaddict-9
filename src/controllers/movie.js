import {Position, render, unrender} from '../utils';
import {FilmDetails} from '../components/film-details';
import {Film} from '../components/film';

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._data = data;
    this._filmCard = new Film(data);
    this._filmDetails = new FilmDetails(data);

    this.init();
  }

  _entry() {
    return {
      title: this._data.title,
      originalTitle: this._data.originalTitle,
      poster: this._data.poster,
      director: this._data.director,
      screenwriters: this._data.screenwriters,
      actors: this._data.actors,
      rating: this._data.rating,
      year: this._data.year,
      releaseDate: this._data.releaseDate,
      country: this._data.country,
      duration: this._data.duration,
      genre: this._data.genre,
      description: this._data.description,
      ageLimit: this._data.ageLimit,
      comments: this._data.comments,
      inWatchlist: this._data.inWatchlist,
      inWatched: this._data.inWatched,
      inFavorites: this._data.inFavorites,
    };
  }

  init() {
    // const film = new Film(this._data);
    // const filmDetails = new FilmDetails(this._data);
    const entry = this._entry();
    const filmPopUpSelectors = document.querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);

    const showFilmDetails = () => {
      this._onChangeView();
      render(document.body, this._filmDetails.getElement(), Position.BEFOREEND);
      this._filmCard.removeElement();
      document.addEventListener(`keydown`, onEscKeyDown);

      this._filmDetails.getElement()
        .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, hideFilmDetails);
    };

    const hideFilmDetails = (evt) => {
      evt.preventDefault();
      unrender(this._filmDetails.getElement());
      this._filmDetails.removeElement();
      document.removeEventListener(`keydown`, hideFilmDetails);
      this._onDataChange(entry, this._data);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(this._filmDetails.getElement());
        this._filmDetails.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._onDataChange(entry, this._data);
      }
    };

    Array.from(filmPopUpSelectors).forEach((selector) => {
      selector.addEventListener(`click`, showFilmDetails);
    });

    this._filmDetails.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.watchlist = !this._data.inWatchlist;
        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.watched = !this._data.inWatched;
        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.favorite = !this._data.inFavorites;
        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        entry.watchlist = !this._data.inWatchlist;
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        entry.watched = !this._data.inWatched;
        if (document.querySelector(`.film-details__user-rating-wrap`)) {
          // unrender(containerRating);
          // entry.ratingViewer = null;
        } else {
          // render(getContainer(), this._rating.getElement());
        }
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        entry.favorite = !this._data.inFavorites;
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container, this._filmCard.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (document.body.contains(this._filmDetails.getElement())) {
      unrender(this._filmDetails.getElement());
      this._filmDetails.removeElement();
    }
  }
}
