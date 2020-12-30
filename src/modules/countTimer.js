const countTimer = deadLine => {
  const timerHour = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds');

  const getTimeRemaining = () => {
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
  };
  const timeEdit = timeElem => ((timeElem < 10) ? '0' + timeElem : timeElem);

  let updateClockInterval;

  const updateClock = () => {
    const timer = getTimeRemaining();
    updateClockInterval = requestAnimationFrame(updateClock, 1000);

    timerHour.textContent = timeEdit(timer.hours);
    timerMinutes.textContent = timeEdit(timer.minutes);
    timerSeconds.textContent = timeEdit(timer.seconds);

    if (timer.timeRemaining <= 0) {
      clearInterval(updateClockInterval);
      timerHour.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
  };
  updateClockInterval = requestAnimationFrame(updateClock);
};

export default countTimer;
