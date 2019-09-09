import {mockArray} from '../data.js';
import {createElement} from '../utils';

export class Rank {
  constructor() {
    this._element = null;
    this._watchedCount = this.calcWatched();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate().trim());
    }
    return this._element;
  }

  setRank(value) {
    if (value > 0 && value <= 10) {
      return `Novice`;
    } else if (value > 10 && value <= 20) {
      return `Fan`;
    } else {
      return `Movie buff`;
    }
  }

  calcWatched() {
    let watchedCount = 0;
    for (let filmObj of mockArray) {
      if (filmObj.inWatched) {
        watchedCount++;
      }
    }
    return watchedCount;
  }

  getTemplate() {
    return `
    <section class="header__profile profile">
      <p class="profile__rating">${this.setRank(this._watchedCount)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
  }
}


