window.addEventListener('DOMContentLoaded', () => {
  function countTimer(deadLine) {
    const timerHour = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      const dateStop = new Date(deadLine).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }
    const updateClockInterval = setInterval(updateClock, 1);
    function updateClock() {
      const timer = getTimeRemaining();
      if (timer.timeRemaining >= 0) {
        timerHour.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;
        console.log('if', timer.timeRemaining);
        if (timer.hours < 10) {
          timerHour.textContent = '0' + timer.hours;
        }
        if (timer.minutes < 10) {
          timerMinutes.textContent = '0' + timer.minutes;
        }
        if (timer.seconds < 10) {
          timerSeconds.textContent = '0' + timer.seconds;
        }
      } else {
        clearInterval(updateClockInterval);
        timerHour.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        console.log('else', timer.timeRemaining);
      }
    }
  }

  countTimer('15 december 2020 22:00:00');
});
