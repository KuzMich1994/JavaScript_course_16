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

export default calc;
