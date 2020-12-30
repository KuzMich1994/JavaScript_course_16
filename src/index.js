
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scroll from './modules/scroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import hoverImg from './modules/hoverImg';
import validationInputs from './modules/validationInputs';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Таймер
countTimer('31 december 2020 23:59:59');
//Меню
toggleMenu();
//Модальное окно
togglePopup();
// кнопка скролла
scroll();
//Табы
tabs();
//Слайдер
slider();
//Ховер для картинок
hoverImg();
//Валидация инпутов калькулятора
validationInputs();
//Калькулятор
calc(100);
//send-ajax-form
sendForm('form1', 'form2', 'form3');
