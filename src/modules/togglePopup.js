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

export default togglePopup;
