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

  // кнопка скролла
  const scroll = () => {
    const anchors = document.querySelectorAll('menu>ul>li>a[href]'),
      scrollButton = document.querySelector('main>a');

    scrollButton.addEventListener('click', event => {
      event.preventDefault();

      const blockID = scrollButton.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });

    anchors.forEach(anchor => {
      anchor.addEventListener('click', event => {
        event.preventDefault();

        const blockID = anchor.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  };

  scroll();

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

  // Добавляем кнопки на слайдер

  const createDots = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      newDot = document.createElement('li'),
      sliderDots = document.querySelector('.portfolio-dots');
    newDot.classList.add('dot');

    for (let i = 0; i < slide.length; i++) {
      sliderDots.prepend(newDot.cloneNode());
    }
  };

  createDots();

  //Слайдер

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dot = document.querySelectorAll('.dot'),
      sliderContent = document.querySelector('.portfolio-content');
    dot[0].classList.add('dot-active');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 1500) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    sliderContent.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    sliderContent.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });
    sliderContent.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);
  };

  slider();

  //Ховер для картинок

  const hoverImg = () => {
    const img = document.querySelectorAll('.command__photo');
    img.forEach(item => {
      const source = item.getAttribute('src');
      item.addEventListener('mouseover', e => {
        e.target.src = e.target.dataset.img;
      });
      item.addEventListener('mouseout', e => {
        e.target.src = source;
      });
    });
  };

  hoverImg();

  //Валидация инпутов калькулятора

  const validationInputs = () => {
    const calcItems = document.querySelectorAll('.calc-item');
    calcItems.forEach(item => {
      item.addEventListener('input', e => {
        const currentTarget = e.currentTarget;
        if (currentTarget.matches('.calc-square') || currentTarget.matches('.calc-count') ||
        currentTarget.matches('.calc-day')) {
          currentTarget.value = currentTarget.value.replace(/\D+/, '');
        }
      });
    });
  };

  validationInputs();

  //Калькулятор

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

    let interval;

    const countSumm = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1,
        step = 0;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      const animateSumm = () => {
        interval = requestAnimationFrame(animateSumm, 50);
        if (step < total && total < 5000) {
          step += 50;
          totalValue.textContent = step;
        } else if (step < total && total > 5000) {
          step += 1000;
          totalValue.textContent = step;
        } else if (step > total) {
          cancelAnimationFrame(interval);
          totalValue.textContent = Math.floor(total);
        }

        calcType.addEventListener('input', () => {
          totalValue.textContent = 0;
        });
      };
      interval = requestAnimationFrame(animateSumm);

      calcBlock.addEventListener('change', event => {
        const target = event.target;
        if (target.matches('select') || target.matches('input')) {
          total = 0;
        }
      });
    };

    calcBlock.addEventListener('change', e => {
      const target = e.target;

      if (target.matches('input') || target.matches('select')) {
        countSumm();
      }
    });
  };

  calc(100);

  //send-ajax-form

  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    const form = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    const form3 = document.getElementById('form3');
    const statusMessage = document.createElement('div');
    const allInputs = document.querySelectorAll('input[id]');
    statusMessage.style.cssText = `font-size: 2rem; color: #ffffff;`;

    const postData = body => new Promise((resolve, reject) => {
      const reqest = new XMLHttpRequest();

      reqest.addEventListener('readystatechange', () => {
        if (reqest.readyState !== 4) {
          return;
        }

        if (reqest.status === 200) {
          resolve();
        } else {
          reject(reqest.statusText);
        }
        allInputs.forEach(item => {
          item.value = '';
        });
      });

      reqest.open('POST', './server.php');
      reqest.setRequestHeader('Content-Type', 'application/json');
      reqest.send(JSON.stringify(body));
    });

    const showMessage = () => {
      statusMessage.textContent = successMessage;
    };

    allInputs.forEach(item => {
      item.addEventListener('input', e => {
        const currentTarget = e.currentTarget;
        if (currentTarget.matches('.form-phone')) {
          currentTarget.setAttribute('pattern', '[0-9\\+\\-\\s()]{11,18}');
          currentTarget.value = currentTarget.value.replace(/[^+\-()\d]/, '');
        }
        if (currentTarget.matches('[placeholder="Ваше имя"]')) {
          currentTarget.setAttribute('pattern', '[а-яА-ЯЁё\\-]{2,}');
          currentTarget.value = currentTarget.value.replace(/[a-z0-9().,/-_=+!@#$%^&*№"'|]/, '');
        }
        if (currentTarget.matches('.mess')) {
          currentTarget.setAttribute('pattern', '[а-яА-яЁё0-9s,.-_!":;]{0,200}');
          currentTarget.value = currentTarget.value.replace(/[a-z()@#$%^&*"№_=`/]/, '');
        }
        if (currentTarget.matches('[type="email"]')) {
          currentTarget.setAttribute('pattern', '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
          currentTarget.value = currentTarget.value.replace(/[а-яА-ЯЁё]/, '');
        }
      });
    });


    document.addEventListener('submit', e => {
      e.preventDefault();
      const target = e.target;


      if (target.matches('#form1')) {
        form.append(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form);
        const body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });

        postData(body)
          .then(showMessage)
          .catch(error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
      }
      if (target.matches('#form2')) {
        form2.append(statusMessage);
        statusMessage.textContent = loadMessage;
        statusMessage.style.cssText = 'color: #ffffff;';
        const formData = new FormData(form2);
        const body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });

        postData(body)
          .then(showMessage)
          .catch(error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
      }
      if (target.matches('#form3')) {
        form3.append(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form3);
        const body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });

        postData(body)
          .then(showMessage)
          .catch(error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
      }
    });
  };

  sendForm();

});
