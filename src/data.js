import {getRandomBoolean, getRandomItem} from './utilities';

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.` +
  ` Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.` +
  ` Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.` +
  ` Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.` +
  ` Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.` +
  ` Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.` +
  ` Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`
    .split(`.`)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .join(`. `);

const titles = Array.from(new Set([
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
]));

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const directors = [
  `Guillermo del Toro	The Shape of Water Award winner`,
  `Paul Thomas Anderson`,
  `Greta Gerwig`,
  `Christopher Nolan`,
  `Jordan Peele`,
  `Alfonso Cuarón`,
  `Yorgos Lanthimos`,
  `Spike Lee`,
  `Adam McKay`,
  `Paweł Pawlikowski`,
];

const screenwriters = new Set([
  `Paul Schrader`,
  `lfonso Cuarón`,
  `Adam McKay`,
  `Taylor Sheridan`,
  `Damien Chazelle`,
  `Efthymis Filippou & Yorgos Lanthimos`,
  `Mike Mills`,
]);

const actors = new Set([
  `Gary Oldman Award`,
  `Timothée Chalamet`,
  `Daniel Day-Lewis`,
  `Daniel Kaluuya`,
  `Denzel Washington`,
  `Rami Malek Award`,
  `Christian Bale`,
  `Bradley Cooper`,
  `Willem Dafoe`,
  `Viggo Mortensen`,
]);

const countries = [
    `Russia`,
    `USA`,
    `India`,
    `Englan`,
    `Ukrain`,
    `Turkey`,
    `France`,
    `Spain`,
];

const genres = new Set([
  `Horror`,
  `Musical`,
  `Comedy`,
  `Romcom`,
  `Thriller`,
  `Cartoon`,
  `Sci-fi`,
  `Adventure`,
]);

const ageLimit = [
  `6`,
  `12`,
  `14`,
  `16`,
  `18`,
];

const comments = [
  `Cool`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Nice try`,
  `Fantastic`,
];

const emojis = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`,
  `trophy.png`
];

const users = [
  `Tim Macoveev`,
  `John Doe`,
  `Random Men`,
  `Child`,
];

const getComment = () => ({
  emoji: getRandomItem(emojis),
  date: [Math.floor(Math.random() * 4)],
  comment: getRandomItem(comments),
  author: getRandomItem(users),
});

const getComments = (count) => {
  return new Array(count).fill(``)
    .map(getComment);
};

export const getFilmCard = () => ({
  title: getRandomItem(titles),
  originalTitle: getRandomItem(titles),
  poster: getRandomItem(posters),
  director: getRandomItem(directors),
  screenwriters: screenwriters,
  actors: actors,
  rating: (Math.random() * 10).toFixed(1),
  year: new Date().getFullYear() - Math.floor(Math.random() * 50),
  releaseDate: Date.now(),
  country: getRandomItem(countries),
  duration: Math.floor(Math.random() * 2) + ` h ` + Math.floor(Math.random() * 60) + ` m`,
  genre: genres,
  description: descriptionText,
  ageLimit: getRandomItem(ageLimit),
  comments: getComments(Math.floor(Math.random() * comments.length)),
  inWatchlist: getRandomBoolean(),
  inWatched: getRandomBoolean(),
  inFavorites: getRandomBoolean(),
});


const resultArray = [];
const addObjToArr = () => {
  for (let i = 0; i < 22; i++) {
    resultArray.push(getFilmCard());
  }
};

addObjToArr();

export default resultArray;
