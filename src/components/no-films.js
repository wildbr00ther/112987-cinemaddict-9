import {AbstractComponent} from './absctract-component';

export class NoFilms extends AbstractComponent {
  getTemplate() {
    return `<div class="no-result">
      There is no movies for your request.
    </div>`;
  }
}
