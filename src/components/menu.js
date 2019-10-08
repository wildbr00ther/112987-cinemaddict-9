import {mockArray} from './../data.js';
import {AbstractComponent} from './abstract-component';

const films = mockArray;

export class Menu extends AbstractComponent {
  constructor() {
    super();
    this._title = [`All movies`, `Watchlist`, `History`, `Favorites`, `Stats`];
    this._count = null;
  }

  setCount(value) {
    let count = 0;

    switch (value) {
      case `watchlist`:
        films.forEach((film) => film.inWatchlist ? count++ : null);
        this._count = count;

        return count;

      case `history`:
        films.forEach((film) => film.inWatched ? count++ : null);
        this._count = count;

        return count;

      case `favorites`:
        films.forEach((film) => film.inFavorites ? count++ : null);
        this._count = count;

        return count;
    }
    return count;
  }

  getTemplate() {
    return `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active" data-screen="all">${this._title[0]}</a>
      <a href="#watchlist" class="main-navigation__item">${this._title[1]}<span class="main-navigation__item-count">${this.setCount(`watchlist`)}</span></a>
      <a href="#history" class="main-navigation__item">${this._title[2]}<span class="main-navigation__item-count">${this.setCount(`history`)}</span></a>
      <a href="#favorites" class="main-navigation__item">${this._title[3]}<span class="main-navigation__item-count">${this.setCount(`favorites`)}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional" data-screen="stats">${this._title[4]}</a>
    </nav>`;
  }
}
