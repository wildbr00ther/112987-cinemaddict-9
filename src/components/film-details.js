import {AbstractComponent} from './abstract-component';
import moment from 'moment';

export class FilmDetails extends AbstractComponent {
  constructor({title, originalTitle, poster, director, screenwriters, actors, rating, releaseDate, country, duration, genre, description, ageLimit, inWatchlist, inWatched, inFavorites, comments}) {
    super();
    this._title = title;
    this._originalTitle = originalTitle;
    this._poster = poster;
    this._director = director;
    this._screenwriters = screenwriters;
    this._actors = actors;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._country = country;
    this._duration = duration;
    this._genre = genre;
    this._description = description;
    this._ageLimit = ageLimit;
    this._inWatchlist = inWatchlist;
    this._inWatched = inWatched;
    this._inFavorites = inFavorites;
    this._comments = comments;
  }

  getTemplate() {
    return `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
  <div class="form-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="">

        <p class="film-details__age">${this._ageLimit}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${this._title}</h3>
            <p class="film-details__title-original">Original: ${this._originalTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${this._rating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tbody><tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${this._director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${Array.from(this._screenwriters)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .map((screenwriter) => `${screenwriter} `).join(``)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${Array.from(this._actors)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .map((actor) => `${actor} `).join(``)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${moment(this._releaseDate).format(`D MMM YYYY`)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${this._duration}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${this._country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              ${Array.from(this._genre)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
          </tr>
        </tbody></table>

        <p class="film-details__film-description">
          ${this._description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._inWatchlist ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._inWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._inFavorites ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>
  </div>

  <div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

        <ul class="film-details__comments-list"></ul>

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
          <label class="film-details__emoji-label" for="emoji-gpuke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  </div>
</form>
    </section>`;
  }
}
