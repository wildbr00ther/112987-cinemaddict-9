import {Position, render, unrender} from '../utils';
import {FilmDetails} from '../components/film-details';
import {Film} from '../components/film';
import Rating from '../components/rating';
import Comments from '../components/comments';

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._data = data;
    this._rating = new Rating(data);
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
      ratingViewer: this._data.ratingViewer,
    };
  }

  init() {
    let containerRating = null;
    let emoji = null;
    let emojiContainer = null;
    let commentsList = null;

    // const film = new Film(this._data);
    // const filmDetails = new FilmDetails(this._data);
    const entry = this._entry();
    const filmPopUpSelectors = this._filmCard.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);

    const getContainer = () => {
      const formContainer = this._filmDetails.getElement().querySelector(`.film-details__inner`);
      const containerTop = this._filmDetails.getElement().querySelector(`.form-details__bottom-container`);
      containerRating = document.createElement(`div`);
      containerRating.classList.add(`form-details__middle-container`);
      formContainer.insertBefore(containerRating, containerTop);
      return containerRating;
    };

    const showFilmDetails = () => {
      this._onChangeView();
      render(document.body, this._filmDetails.getElement(), Position.BEFOREEND);
      this._filmCard.removeElement();
      if (this._data.inWatched) {
        render(getContainer(), this._rating.getElement(), Position.BEFOREEND);
      }
      this._data.comments.forEach((comment) => renderComment(comment));
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

    const renderComment = (comments) => {
      const comment = new Comments(comments);

      comment.getElement()
        .querySelector(`.film-details__comment-delete`)
        .addEventListener(`click`, () => {
          onCommentsChange(null, comment);
          let countComments = this._filmDetails.getElement().querySelector(`.film-details__comments-count`).innerHTML;
          this._filmDetails.getElement().querySelector(`.film-details__comments-count`).innerHTML = `${+countComments - 1}`;
        });

      commentsList = this._filmDetails.getElement().querySelector(`.film-details__comments-list`);
      render(commentsList, comment.getElement(), Position.BEFOREEND);
    };

    const updateComments = () => {
      commentsList = this._filmDetails.getElement().querySelector(`.film-details__comments-list`);
      commentsList.innerHTML = ``;
      this._data.comments.forEach((comment) => renderComment(comment));
      entry.comments = this._data.comments;
    };

    const onCommentsChange = (newData, oldData) => {
      const index = this._data.comments.findIndex((comments) => {
        return oldData !== null && comments.comment === oldData._comment && comments.emoji === oldData._emoji
          && comments.author === oldData._author && comments.date === oldData._date;
      });

      if (newData === null) {
        this._data.comments = [...this._data.comments.slice(0, index), ...this._data.comments.slice(index + 1)];
      } else {
        this._data.comments.unshift(newData);
      }

      updateComments();
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
        entry.inWatchlist = !this._data.inWatchlist;
        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.inWatched = !this._data.inWatched;
        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        entry.inFavorites = !this._data.inFavorites;
        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        entry.inWatchlist = !this._data.inWatchlist;
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        entry.inFavorites = !this._data.inFavorites;
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        entry.inWatched = !this._data.inWatched;
        if (document.querySelector(`.film-details__user-rating-wrap`)) {
          unrender(containerRating);
          entry.ratingViewer = null;
        } else {
          render(getContainer(), this._rating.getElement(), Position.BEFOREEND);
        }
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._rating.getElement()
      .querySelector(`.film-details__user-rating-score`)
      .addEventListener(`change`, () => {
        const radio = Array.from(this._rating.getElement().querySelectorAll(`.film-details__user-rating-input`));
        entry.ratingViewer = Number(radio.length && radio.find((r) => r.checked).value);
      });

    this._filmDetails.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, (event) => {
        emoji = event.target.closest(`img`).cloneNode();
        emoji.width = 60;
        emoji.height = 60;
        emojiContainer = this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label`);
        emojiContainer.innerHTML = ``;
        emojiContainer.append(emoji);
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
