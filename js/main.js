'use strict';
window.addEventListener('DOMContentLoaded', () => {
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
    const menuBtn = document.querySelector('div.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', event => {
      if (event.target === menuBtn || event.target === menuBtn.querySelector('div.menu>img') ||
        event.target === closeBtn || event.target === menuBtn.querySelector('small') ||
        event.target.matches('ul>li>a')) {
        handlerMenu();
      } else if (!event.target.matches('ul>li') && event.target !== menu) {
        menu.classList.remove('active-menu');
      }
    });
  };

  toggleMenu();

  //Модальное окно
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content');

    popupBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
      });
    });

    popup.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      }

      target = target.closest('.popup-content');

      if (!target) {
        popup.style.display = 'none';
      }

    });

    const addStyle = () => {
      popupContent.style.transform = 'translateY(100%)';
      popupContent.style.opacity = '0';
      popupContent.style.transition = 'all 1s';
    };

    if (window.innerWidth > 768) {
      addStyle();
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
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          addStyle();
        } else {
          popupContent.style.transform = '';
          popupContent.style.opacity = '';
          popupContent.style.transition = '';
        }
      });
    }
  };

  togglePopup();

  //Табы

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((elem, i) => {
          if (elem === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

});
