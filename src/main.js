import Search from './components/search.js';
import Rank from './components/rank.js';
import PageController from './controllers/page.js';
import SearchController from './controllers/search';
import StatisticsController from './controllers/statistics';
import {Position, render, END_POINT, AUTHORIZATION} from './utils';
import ModelFilm from "./api/model-film";
import API from "./api/api";

const onDataChange = (update) => {
  api.updateCard({
    id: update.id,
    data: ModelFilm.toRAW(update),
  })
    .then(() => {
      api.getCards()
        .then((updatedCards) => {
          init(updatedCards);
        });
    });
};

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

// Main и Header
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);
export const FILM_COUNT = 5;
export const FILM_EXTRA_COUNT = 2;

const search = new Search();
const rank = new Rank();

render(headerContainer, search.getElement(), Position.BEFOREEND);
render(headerContainer, rank.getElement(), Position.BEFOREEND);

const init = (cards) => {
  const statisticsController = new StatisticsController(mainContainer, cards, onDataChange);
  const searchController = new SearchController(mainContainer, search, cards, onDataChange);
  const pageController = new PageController(mainContainer, headerContainer, searchController, statisticsController, cards);
  searchController.init();
  pageController.init();
  statisticsController.init();
  pageController.show();


  search.getElement().querySelector(`input`).addEventListener(`keyup`, (evt) => {
    if (evt.target.value.length >= 2) {
      searchController.show();
      pageController.hide();
    } else {
      searchController.hide();
      pageController.show(cards);
    }
  });

  search.getElement().querySelector(`.search__reset`).addEventListener(`click`, () => {
    searchController.hide();
    pageController.show(cards);
  });
};
api.getCards().then((cards) => init(cards));
