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
  createElement,
  render,
  unrender
};
