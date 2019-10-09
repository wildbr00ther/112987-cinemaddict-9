import {emojis} from "../data";
import moment from "moment";

export default class ModelComment {
  constructor(data) {
    this.id = data[`id`];
    this.comment = data[`comment`];
    this.date = moment(data[`date`]).fromNow();
    this.author = data[`author`];
    this.emoji = {
      id: data[`emotion`],
      source: emojis.reduce((acc, emoji) => {
        if (emoji.id === data[`emotion`]) {
          acc = emoji.source;
        }

        return acc;
      }, ``),
    };
  }

  static parseComment(data) {
    return new ModelComment(data);
  }

  static parseComments(data) {
    return data.map(ModelComment.parseComment);
  }

  static toRAW(comment) {
    return {
      'comment': comment.comment,
      'date': comment.date,
      'emotion': comment.emoji.id,
    };
  }
}
