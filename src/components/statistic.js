import {createElement} from '../utils';

export class Statistic {
  constructor(count) {
    this._count = count;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate().trim());
    }
    return this._element;
  }

  getTemplate() {
    return `<p>${this._count} movies inside</p>`;
  }
}
