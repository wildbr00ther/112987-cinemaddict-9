export const getFilmMarkup = ({title, poster, rating, year, duration, genre, description, comments, inWatchlist, inWatched, inFavorites}) =>
  `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre[Math.floor(Math.random() * genre.length)]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${Math.floor(Math.random() * 5)} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${inWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${inFavorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`.trim();
