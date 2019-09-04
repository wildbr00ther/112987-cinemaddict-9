import resultArray from './../data.js';

const titleFilter = [`All movies`, `Watchlist`, `History`, `Favorites`, `Stats`];
const films = resultArray;

export const getMenuMarkup = ({title, setCount}) =>
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">${title[0]}</a>
    <a href="#watchlist" class="main-navigation__item">${title[1]}<span class="main-navigation__item-count">${setCount(`watchlist`)}</span></a>
    <a href="#history" class="main-navigation__item">${title[2]}<span class="main-navigation__item-count">${setCount(`history`)}</span></a>
    <a href="#favorites" class="main-navigation__item">${title[3]}<span class="main-navigation__item-count">${setCount(`favorites`)}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">${title[4]}</a>
  </nav>`.trim();

export const getFilter = () =>({
  title: titleFilter,
  setCount(value) {
    let count = 0;

    switch (value) {
      case `watchlist`:
        films.forEach((film) => film.inWatchlist ? count++ : null);
        getFilter.count = count;

        return count;

      case `history`:
        films.forEach((film) => film.inWatched ? count++ : null);
        getFilter.count = count;

        return count;

      case `favorites`:
        films.forEach((film) => film.inFavorites ? count++ : null);
        getFilter.count = count;

        return count;
    }
    return count;
  }
});
