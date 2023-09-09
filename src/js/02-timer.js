//підключення бібліотек
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//розштрення опцій бібліотеки flatpickr та Notiflix, слухач подій на кпонку старт
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      elements.btnStart.disabled = false;
      elements.btnStart.addEventListener('click', onClickBtnStart);
    }
  },
};

//ініціалізація бібліотеки
flatpickr('#datetime-picker', options);

//збираю елементи html-розмітки
const elements = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

//кнопка старт не активна до вибору валідної дати
elements.btnStart.disabled = true;

//функція на кліку розраховує різницу у обраному часі та підставляє відповідні значення на сторінку таймера
function onClickBtnStart() {
  const finalDate = Date.parse(elements.input.value);

  const timerId = setInterval(() => {
    const differenceTime = finalDate - Date.now();
    const parameters = convertMs(differenceTime);

    elements.days.textContent = addLeadingZero(parameters.days);
    elements.hours.textContent = addLeadingZero(parameters.hours);
    elements.minutes.textContent = addLeadingZero(parameters.minutes);
    elements.seconds.textContent = addLeadingZero(parameters.seconds);

    if (differenceTime < 0) {
      clearInterval(timerId);
      elements.days.textContent = '00';
      elements.hours.textContent = '00';
      elements.minutes.textContent = '00';
      elements.seconds.textContent = '00';
    }
    return;
  }, 1000);
}

// преведення числа до необхідного формату у таймер
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
