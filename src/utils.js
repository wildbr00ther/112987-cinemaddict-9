const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const typeSorting = {
  BY_DEFAULT: {
    TYPE: `default`,
    SORT: undefined,
  },
  BY_DATE: {
    TYPE: `date`,
    SORT: (a, b) => b.year - a.year,
  },
  BY_RATING: {
    TYPE: `rating`,
    SORT: (a, b) => b.rating - a.rating,
  },
  BY_COMMENTS: {
    TYPE: `comments`,
    SORT: (a, b) => b.commentsAmount - a.commentsAmount,
  },
};

const typeFilters = {
  ALL: {
    TYPE: `all`,
    FILTER: (n) => n,
  },
  WATCHLIST: {
    TYPE: `inWatchlist`,
    FILTER: (n) => n.inWatchlist,
  },
  WATCHED: {
    TYPE: `inWatched`,
    FILTER: (n) => n.inWatched,
  },
  FAVORITE: {
    TYPE: `inFavorites`,
    FILTER: (n) => n.inFavorites,
  },
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Рендер и анрендер для компонент
const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export {
  getRandomBoolean,
  getRandomItem,
  Position,
  typeSorting,
  typeFilters,
  createElement,
  render,
  unrender
};
