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

export default scroll;
