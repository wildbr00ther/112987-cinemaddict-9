import moment from 'moment';

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

const calcWatched = (cards) => {
  let value = 0;

  for (let filmObj of cards) {
    if (filmObj.inWatched) {
      value++;
    }
  }

  return value;
};

const findCounts = (array) => {
  const counts = array.reduce((accum, current) => {
    accum[current] = (accum[current] || 0) + 1;
    return accum;
  }, {});

  return Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .reduce((obj, key) => (Object.assign({}, obj, {[key]: counts[key]})), {});
};
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;

const chartFilters = {
  ALL_TIME: {
    TYPE: `all-time`,
    FILTER: ``
  },
  TODAY: {
    TYPE: `today`,
    FILTER: (film) => moment().isSame(moment(film.watchingDate), `day`)
  },
  WEEK: {
    TYPE: `week`,
    FILTER: (film) => moment(film.watchingDate) > moment().subtract(1, `w`)
  },
  MONTH: {
    TYPE: `month`,
    FILTER: (film) => moment(film.watchingDate) > moment().subtract(1, `month`)
  },
  YEAR: {
    TYPE: `year`,
    FILTER: (film) => moment(film.watchingDate) > moment().subtract(1, `y`)
  },

};

const ChartConfig = {
  TYPE: `horizontalBar`,
  DATASETS: {
    BACKGROUNDCOLOR: `#ffe800`,
    DATALABELS: {
      ANCHOR: `start`,
      ALIGN: `start`,
      OFFSET: 50,
      COLOR: `#ffffff`,
      FONT: {
        SIZE: 16,
      },
    }
  },
  OPTIONS: {
    LEGEND: {
      DISPLAY: false,
    },
    TOOLTIPS: {
      ENABLED: false,
    },
    LAYOUT: {
      PADDING: {
        LEFT: 200,
      },
    },
    SCALES: {
      XAXES: {
        DISPLAY: false,
        TICKS: {
          BEGINATZERO: true,
          STEPSIZE: 1,
        },
      },
      YAXES: {
        display: false,
        barThickness: 25,
      },
    },
  }
};

const getMostFrequents = (array) => {
  const counts = findCounts(array);
  const maxCount = Math.max(...Object.values(counts));

  return Object.keys(counts).filter((k) => counts[k] === maxCount);
};
export {
  getRandomBoolean,
  getRandomItem,
  Position,
  typeSorting,
  typeFilters,
  createElement,
  render,
  unrender,
  calcWatched,
  AUTHORIZATION,
  END_POINT,
  ChartConfig,
  findCounts,
  chartFilters,
  getMostFrequents
};
