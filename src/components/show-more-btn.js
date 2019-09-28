import {AbstractComponent} from './abstract-component';

export class ButtonLoad extends AbstractComponent {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  set() {
    this._element = null;
  }
}
