const elements = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let timerId = null;

elements.start.addEventListener('click', onClickStart);
elements.stop.addEventListener('click', onClickStop);

function onClickStart() {
  timerId = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  elements.start.disabled = true;
  elements.stop.disabled = false;
}

function onClickStop() {
  clearInterval(timerId);
  elements.stop.disabled = true;
  elements.start.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
