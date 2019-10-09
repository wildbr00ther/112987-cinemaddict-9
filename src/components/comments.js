import AbstractComponent from './abstract-component';

export default class Comments extends AbstractComponent {
  constructor({emoji, date, comment, author}) {
    super();
    this._emoji = emoji;
    this._date = date;
    this._comment = comment;
    this._author = author;
  }

  getTemplate() {
    return `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="${this._emoji.source}" width="55" height="55" alt="emoji">
          </span>
          <div>
            <p class="film-details__comment-text">${this._comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${this._author}</span>
              <span class="film-details__comment-day">${this._date}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
      `;
  }

}
