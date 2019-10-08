import {AbstractComponent} from './abstract-component';

export default class Rating extends AbstractComponent {
  constructor({title, poster, ratingViewer}) {
    super();
    this._title = title;
    this._poster = `./images/posters/` + poster;
    this._ratingViewer = ratingViewer;
  }

  getTemplate() {
    return `<section class="film-details__user-rating-wrap">
    <div class="film-details__user-rating-controls">
      <button class="film-details__watched-reset" type="button">Undo</button>
    </div>
    <div class="film-details__user-score">
      <div class="film-details__user-rating-poster">
        <img src="${this._poster}" alt="film-poster" class="film-details__user-rating-img">
      </div>
      <section class="film-details__user-rating-inner">
        <h3 class="film-details__user-rating-title">${this._title}</h3>
        <p class="film-details__user-rating-feelings">How you feel it?</p>
        <div class="film-details__user-rating-score">
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${this._ratingViewer === 1 ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-1">1</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${this._ratingViewer === 2 ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-2">2</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3" ${this._ratingViewer === 3 ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-3">3</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4" ${this._ratingViewer === 4 ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-4">4</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${this._ratingViewer === 5 ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-5">5</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6" ${this._ratingViewer === 6 ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-6">6</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7" ${this._ratingViewer === 7 ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-7">7</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8" ${this._ratingViewer === 8 ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-8">8</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" ${this._ratingViewer === 9 ? `checked` : ``}>
          <label class="film-details__user-rating-label" for="rating-9">9</label>
        </div>
      </section>
    </div>
  </section>`;
  }
}
