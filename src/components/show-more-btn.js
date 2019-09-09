import {createElement} from '../utils';

export class ButtonLoad {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate().trim());
    }
    return this._element;
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  set() {
    this._element = null;
  }
}
