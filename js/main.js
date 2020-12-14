window.addEventListener('DOMContentLoaded', () => {
  const idInterval = setInterval(countTimer, 1, '14 december 2020 19:57:00');
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

    function updateClock() {
      const timer = getTimeRemaining();

      timerHour.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if (timer.timeRemaining < 1) {
        clearInterval(idInterval);
      }
      if (timer.hours < 10) {
        timerHour.textContent = '0' + timer.hours;
      }
      if (timer.minutes < 10) {
        timerMinutes.textContent = '0' + timer.minutes;
      }
      if (timer.seconds < 10) {
        timerSeconds.textContent = '0' + timer.seconds;
      }
      // console.log(timer.timeRemaining);
    }
    updateClock();
  }

  // countTimer('15 december 2020');
  // setInterval(countTimer, 1, '14 december 2020 19:04:00');
  // countTimer('14 december 2020 19:15:00');

});
