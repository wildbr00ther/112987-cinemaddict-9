const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.` +
  ` Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.` +
  ` Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.` +
  ` Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.` +
  ` Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.` +
  ` Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.` +
  ` Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

export const getFilmCard = () => ({
  title: Array.from(new Set([
    `Inseption`,
    `Dart Knight`,
    `Joker`,
    `Avengers`,
    `Superman`,
    `Aquaman`,
    `Spider-man`,
    `Upgrade`,
    `Fight Club`,
    `God Father`,
    `King Kong`,
    `Lords Of The Rings`,
    `The Hobbit`,
    `8 mile`,
    `The Simpsons`,
    `South Park`,
  ]))[Math.floor(Math.random() * 16)],
  poster: [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
  ][Math.floor(Math.random() * 7)],
  rating: (Math.random() * 10).toFixed(1),
  year: new Date().getFullYear() - Math.floor(Math.random() * 50),
  duration: Math.floor(Math.random() * 2) + ` h ` + Math.floor(Math.random() * 60) + ` m`,
  genre: Array.from(new Set([
    `Horror`,
    `Musical`,
    `Comedy`,
    `Romcom`,
    `Thriller`,
    `Cartoon`,
    `Sci-fi`,
    `Adventure`,
  ])),
  description: descriptionText
    .split(`.`)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .join(`. `),
  comments: [
    `Cool`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
    `Nice try`,
    `Fantastic`,
  ],
  inWatchlist: Boolean(Math.round(Math.random())),
  inWatched: Boolean(Math.round(Math.random())),
  inFavorites: Boolean(Math.round(Math.random())),
});


const resultArray = [];
const addObjToArr = () => {
  for (let i = 0; i < 22; i++) {
    resultArray.push(getFilmCard());
  }
};

addObjToArr();

export default resultArray;
