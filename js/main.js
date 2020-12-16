'use strict';
window.addEventListener('DOMContentLoaded', () => {
  console.log(document.documentElement.clientWidth);
  //Таймер
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
    const updateClockInterval = setInterval(updateClock, 1),
      timeEdit = timeElem => ((timeElem < 10) ? '0' + timeElem : timeElem);
    function updateClock() {
      const timer = getTimeRemaining();

      timerHour.textContent = timeEdit(timer.hours);
      timerMinutes.textContent = timeEdit(timer.minutes);
      timerSeconds.textContent = timeEdit(timer.seconds);

      if (timer.timeRemaining <= 0) {
        clearInterval(updateClockInterval);
        timerHour.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
  };

  countTimer('31 december 2020 23:59:59');

  //Меню
  const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu'),
      menu = document.querySelector('menu');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    menuBtn.addEventListener('click', () => {
      handlerMenu();
    });

    menu.addEventListener('click', event => {
      if (event.target.classList.contains('close-btn') || event.target.tagName === 'A') {
        handlerMenu();
      }
    });
  };

  toggleMenu();

  //Модальное окно
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content');

    popupBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    if (window.innerWidth > 768) {
      popupContent.style.transform = 'translateY(100%)';
      popupContent.style.opacity = '0';
      popupContent.style.transition = 'all 1s';
      const animatePopup = () => {
        requestAnimationFrame(animatePopup);
        if (popup.style.display === 'block') {
          popupContent.style.transform = 'translateY(0)';
          popupContent.style.opacity = '1';
        }
        if (popup.style.display === 'none') {
          popupContent.style.transform = 'translateY(100%)';
          popupContent.style.opacity = '0';
        }
      };
      animatePopup();
    }
  };

  togglePopup();

});
