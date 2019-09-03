const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export {
  getRandomBoolean,
  getRandomItem,
};
