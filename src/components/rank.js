import resultArray from '../data.js';

export const getRankMarkup = ({setRank}) => `
          <section class="header__profile profile">
            <p class="profile__rating">${setRank(watchedCount)}</p>
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;

export const getRank = () => ({
  setRank(value) {
    if (value > 0 && value <= 10) {
      return `Novice`;
    } else if (value > 10 && value <= 20) {
      return `Fan`;
    } else {
      return `Movie buff`;
    }
  }
});
let watchedCount = 0;

for (let filmObj of resultArray) {
  if (filmObj.inWatched) {
    watchedCount++;
  }
}
