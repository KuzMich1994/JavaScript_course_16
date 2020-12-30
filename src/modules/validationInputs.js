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

export default validationInputs;
