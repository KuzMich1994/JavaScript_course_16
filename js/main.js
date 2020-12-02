'use strict';
const bookCard = document.querySelectorAll('.book'),
bookBlock = document.querySelector('.books'),
listItem = document.querySelectorAll('.book > ul > li'),
body = document.querySelector('body'),
headerLinks = document.querySelectorAll('h2 > a'),
advertising = document.querySelector('.adv');

console.log(headerLinks);
console.log(listItem);
console.log(bookCard);

bookBlock.prepend(bookCard[1]);
bookBlock.append(bookCard[2]);
bookCard[4].after(bookCard[3]);
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
headerLinks[4].textContent = 'Книга 3. this и Прототипы Объектов';
advertising.remove();
listItem[3].after(listItem[6]);
listItem[4].before(listItem[8]);
listItem[9].after(listItem[2]);
listItem[47].after(listItem[55]);
listItem[55].after(listItem[49]);
listItem[50].after(listItem[48]);
listItem[48].after(listItem[52]);
listItem[52].after(listItem[53]);
listItem[25].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');

