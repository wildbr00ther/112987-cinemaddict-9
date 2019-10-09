// import {shortDescription} from "../components/utils";
import moment from "moment";
import {getRandomBoolean} from '../utils';

export default class ModelFilm {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.originalTitle = data[`film_info`][`alternative_title`];
    this.poster = data[`film_info`][`poster`];
    this.director = data[`film_info`][`director`];
    this.screenwriters = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.rating = data[`film_info`][`total_rating`];
    this.year = moment(data[`film_info`][`release`][`date`]).format(`YYYY`);
    this.releaseDate = moment(data[`film_info`][`release`][`date`]).format(`DD MMMM YYYY`);
    this.country = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.genre = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.ageLimit = data[`film_info`][`age_rating`];
    this.comments = data[`comments`];
    this.commentsAmount = data[`comments`].length;
    this.inWatchlist = data[`user_details`][`watchlist`];
    this.inWatched = data[`user_details`][`already_watched`];
    this.inFavorites = data[`user_details`][`favorite`];
    this.ratingViewer = data[`user_details`][`already_watched`] ? data[`user_details`][`personal_rating`] : 0;
    this.watchingDate = data[`user_details`][`watching_date`];
  }

  static parseCard(data) {
    return new ModelFilm(data);
  }

  static parseCards(data) {
    return data.map(ModelFilm.parseCard);
  }

  static toRAW(card) {
    return {
      'id': card.id,
      'comments': card.comments,
      'film_info': {
        'title': card.title,
        'alternative_title': card.originalTitle,
        'total_rating': card.rating,
        'poster': card.poster,
        'age_rating': card.ageLimit,
        'director': card.director,
        'writers': [...card.screenwriters],
        'actors': [...card.actors],
        'release': {
          'date': card.releaseDate,
          'release_country': card.country,
        },
        'runtime': card.duration,
        'genre': [...card.genre],
        'description': card.description,
      },
      'user_details': {
        'personal_rating': Number(card.ratingViewer) || 0,
        'watchlist': card.inWatchlist,
        'already_watched': card.inWatched,
        'favorite': card.inFavorites,
        'watching_date': moment(card.watchingDate).toISOString() || moment().toISOString(),
      },
    };
  }
}
