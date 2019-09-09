import {createElement} from '../utils';

export class Films {
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
    return `<section class="films"></section>`;
  }
}
