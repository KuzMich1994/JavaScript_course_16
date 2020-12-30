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

export default toggleMenu;
