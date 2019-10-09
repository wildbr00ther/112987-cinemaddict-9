import {Position, render, unrender, END_POINT, AUTHORIZATION} from '../utils';
import FilmDetails from '../components/film-details';
import Film from '../components/film';
import Rating from '../components/rating';
import Comments from '../components/comments';
import API from '../api/api';
import ModelComment from '../api/model-comment';
import moment from 'moment';

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._data = data;
    this._rating = new Rating(data);
    this._filmCard = new Film(data);
    this._filmDetails = new FilmDetails(data);
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
    this.init();
  }

  init() {
    let ratingContainer = null;
    // let emoji = null;
    // let emojiContainer = null;
    let commentContainer = null;

    // const film = new Film(this._data);
    // const filmDetails = new FilmDetails(this._data);
    const entry = JSON.parse(JSON.stringify(this._data));
    const filmPopUpSelectors = this._filmCard.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);

    const getContainer = () => {
      const formContainer = this._filmDetails.getElement().querySelector(`.film-details__inner`);
      const topContainer = this._filmDetails.getElement().querySelector(`.form-details__bottom-container`);
      ratingContainer = document.createElement(`div`);
      ratingContainer.classList.add(`form-details__middle-container`);
      formContainer.insertBefore(ratingContainer, topContainer);
      return ratingContainer;
    };

    const showFilmDetails = () => {
      this._onChangeView();
      render(document.body, this._filmDetails.getElement(), Position.BEFOREEND);
      this._filmCard.removeElement();
      if (this._data.inWatched) {
        render(getContainer(), this._rating.getElement(), Position.BEFOREEND);
      }
      renderComment();
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

    const onCommentsAdd = (evt, idFilm, newComm) => {
      this._api.createComment({id: idFilm, data: ModelComment.toRAW(newComm)})
        .then(() => {
          evt.target.disabled = false;
          evt.target.value = ``;
          evt.target.blur();
          this._onDataChange(entry, this._data);
          updateComments();
        })
        .catch(() => {
          evt.target.disabled = false;
        });
    };

    const onCommentsDelete = (evt, index, comments) => {
      evt.target.disabled = true;
      evt.target.textContent = `Deleting…`;
      this._api.deleteComment({id: comments[index].id})
        .then(() => {
          evt.target.disabled = false;
          evt.target.textContent = `Delete`;
          this._onDataChange(entry, this._data);
          updateComments();
        })
        .catch(() => {
          evt.target.disabled = false;
          evt.target.textContent = `Delete`;
        });
    };

    const renderComment = () => {
      this._api.getComments({id: this._data.id}).then((comments) => {
        comments.forEach((commentCurr, index) => {
          const comment = new Comments(commentCurr);
          comment.getElement()
            .querySelector(`.film-details__comment-delete`)
            .addEventListener(`click`, (evt) => {
              evt.preventDefault();
              onCommentsDelete(evt, index, comments);

              let quantityComments = this._filmDetails.getElement().querySelector(`.film-details__comments-count`).innerHTML;
              this._filmDetails.getElement().querySelector(`.film-details__comments-count`).innerHTML = `${+quantityComments - 1}`;
            });

          commentContainer = this._filmDetails.getElement().querySelector(`.film-details__comments-list`);
          render(commentContainer, comment.getElement(), Position.BEFOREEND);
        });
      });
    };

    const updateComments = () => {
      commentContainer = this._filmDetails.getElement().querySelector(`.film-details__comments-list`);
      commentContainer.innerHTML = ``;
      renderComment();
      entry.comments = this._data.comments;
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
          unrender(ratingContainer);
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

    this._filmDetails.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((element) => {
      element.addEventListener(`click`, () => {
        const imageElement = element.querySelector(`img`);
        const emojiContainer = document.createElement(`div`);
        emojiContainer.innerHTML = `<img src="${imageElement.src}" width="55" height="55" alt="emoji">`;
        this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
        this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label`)
          .appendChild(emojiContainer.firstChild);
      });
    });

    this._filmDetails.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {

        const commentFieldElement = this._filmDetails.getElement().querySelector(`.film-details__comment-input`);
        const checkedInputElement = this._filmDetails.getElement().querySelector(`.film-details__emoji-item:checked`);
        const chosenEmoji = this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label img`);

        if ((evt.key === `Enter` && evt.metaKey) || (evt.key === `Enter` && evt.ctrlKey)) {
          if (!commentFieldElement.value || !checkedInputElement) {
            return;
          }
          const createComment = (emoji) => {
            const textaria = this._filmDetails.getElement().querySelector(`.film-details__comment-input`);
            const newComment = {
              text: textaria.value,
              author: ``,
              date: moment(),
              emoji: {
                id: emoji.src.slice(emoji.src.lastIndexOf(`/`) + 1, emoji.src.lastIndexOf(`.png`)),
              },
            };

            onCommentsAdd(evt, this._data.id, newComment);

            this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
            textaria.value = ``;
            textaria.placeholder = `Select reaction below and write comment here`;
          };
          let quantityComments = this._filmDetails.getElement().querySelector(`.film-details__comments-count`).innerHTML;
          this._filmDetails.getElement().querySelector(`.film-details__comments-count`).innerHTML = `${+quantityComments + 1}`;
          createComment(chosenEmoji);
        }
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
