const sendForm = (form, form2, form3) => {
  const errorMessage = 'Что-то пошло не так...';
  const loadMessage = 'Загрузка...';
  const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  form = document.getElementById(form);
  form2 = document.getElementById(form2);
  form3 = document.getElementById(form3);
  const statusMessage = document.createElement('div');
  const allInputs = document.querySelectorAll('input[id]');
  statusMessage.style.cssText = `font-size: 2rem; color: #ffffff;`;

  const postData = formData => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: formData,
    credentials: 'include'
  });

  const showBoxShadow = (selector, reg) => {
    const regExp = reg.test(selector.value);
    if (regExp) {
      selector.style.boxShadow = '0 0 5px 5px green';
    } else {
      selector.style.boxShadow = '0 0 5px 5px red';
    }
  };

  const validateInputs = (selector, regPattern, regReplace) => {
    selector.setAttribute('pattern', regPattern);
    selector.value = selector.value.replace(regReplace, '');
  };

  allInputs.forEach(item => {
    item.addEventListener('input', e => {
      const currentTarget = e.currentTarget;
      if (currentTarget.matches('.form-phone')) {
        validateInputs(currentTarget, '[0-9\\+\\-\\s()]{11,18}', /[^+\-()\d]/);
        showBoxShadow(currentTarget, /[0-9\\+\-\s()]{11,18}/);
      }
      if (currentTarget.matches('[placeholder="Ваше имя"]')) {
        validateInputs(currentTarget, '[а-яА-ЯЁё\\-]{2,}', /[a-z0-9().,/-_=+!@#$%^&*№"'|]/);
        showBoxShadow(currentTarget, /[а-яА-ЯЁё\\-]{2,}/);
      }
      if (currentTarget.matches('.mess')) {
        validateInputs(currentTarget, '[а-яА-яЁё0-9\\s,.-_!":;]{0,200}', /[a-z()@#$%^&*"№_=`/]/);
      }
      if (currentTarget.matches('[type="email"]')) {
        validateInputs(currentTarget, '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$', /[а-яА-ЯЁё]/);
        showBoxShadow(currentTarget, /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
      }
    });
  });

  const showLoadMessage = () => {
    statusMessage.textContent = loadMessage;
  };

  let formData;

  document.addEventListener('submit', e => {
    e.preventDefault();
    const target = e.target;


    if (target.matches('#form1')) {
      form.append(statusMessage);
      showLoadMessage();
      formData = new FormData(form);
    }
    if (target.matches('#form2')) {
      form2.append(statusMessage);
      showLoadMessage();
      statusMessage.style.cssText = 'color: #ffffff;';
      formData = new FormData(form2);
    }
    if (target.matches('#form3')) {
      form3.append(statusMessage);
      showLoadMessage();
      formData = new FormData(form3);
    }
    postData(formData)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Status network not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch(error => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      })
      .then(() => {
        allInputs.forEach(item => {
          item.value = '';
          item.style.boxShadow = 'none';
        });
        setTimeout(() => {
          const popup = document.querySelector('.popup');
          statusMessage.remove();
          if (popup.style.display === 'block') {
            popup.style.display = 'none';
          }
        }, 3000);
      });
  });
};

export default sendForm;
