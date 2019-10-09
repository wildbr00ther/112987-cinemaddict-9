import AbstractComponent from './abstract-component';

export class Board extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
