import AbstractComponent from './abstract-component';
import moment from 'moment';

export default class Film extends AbstractComponent {
  constructor({title, poster, rating, year, duration, genre, description, comments, inWatchlist, inWatched, inFavorites}) {
    super();
    this._title = title;
    this._poster = poster;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._description = description;
    this._comments = comments;
    this._inWatchlist = inWatchlist;
    this._inWatched = inWatched;
    this._inFavorites = inFavorites;
  }

  getTemplate() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._year}</span>
         <span class="film-card__duration">${moment.utc(moment.duration(this._duration, `minutes`).asMilliseconds()).format(`H`) + ` h ` +
    moment.utc(moment.duration(this._duration, `minutes`).asMilliseconds()).format(`m`) + ` m`}</span>
        <span class="film-card__genre">${this._genre[Math.floor(Math.random() * this._genre.length)]}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <a class="film-card__comments">${this._comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._inWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._inWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${this._inFavorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`;
  }
}
