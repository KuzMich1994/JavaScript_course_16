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
    const updateClockInterval = setInterval(updateClock, 1);
    function updateClock() {
      const timer = getTimeRemaining();
      if (timer.timeRemaining >= 0) {
        timerHour.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;
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
      }
    }
  };

  countTimer('15 december 2020 22:00:00');

  //Меню
  const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      menuItems = document.querySelectorAll('ul>li'),
      closeBtn = document.querySelector('.close-btn');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    menuBtn.addEventListener('click', () => {
      handlerMenu();
    });
    closeBtn.addEventListener('click', () => {
      handlerMenu();
    });
    menuItems.forEach(elem => {
      elem.addEventListener('click', () => {
        handlerMenu();
      });
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

    if (document.documentElement.clientWidth > 768) {
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
