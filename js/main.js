'use strict';
const startButton = document.getElementById('start'),
addIncome = document.querySelector('.income_add'),
addExpenses = document.querySelector('.expenses_add'),
depositCheck = document.querySelector('#deposit-check'),
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
budgetMonthValue = document.querySelector('.budget_month-value'),
budgetDayValue = document.querySelector('.budget_day-value'),
expensesMonthValue = document.querySelector('.expenses_month-value'),
additionalIncomeValue = document.querySelector('.additional_income-value'),
additionalExpensesValue = document.querySelector('.additional_expenses-value'),
incomePeriodValue = document.querySelector('.income_period-value'),
targetMonthValue = document.querySelector('.target_month-value'),
salaryAmount = document.querySelector('.salary-amount'),
incomeTitle = document.querySelector('input.income-title'),
incomeAmount = document.querySelector('.income-amount'),
expensesTitle = document.querySelector('input.expenses-title'),
expensesAmount = document.querySelector('.expenses-amount'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
inputText = document.querySelectorAll('[placeholder="Наименование"]'),
inputNumbers = document.querySelectorAll('[placeholder="Сумма"]'),
resetBtn = document.querySelector('#cancel'),
depositBank = document.querySelector('.deposit-bank');
let periodAmount = document.querySelector('.period-amount'),
expensesItems = document.querySelectorAll('.expenses-items'),
incomeItems = document.querySelectorAll('.income-items');

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isStringNumber = function(n) {
  return isNaN(n);
};

class AppData {
  constructor() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.incomeMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.expensesMonth = 0;
    this.missionComplete = 0;
    this.budget = 0;
  }
  reset() {
    const allInputsText = document.querySelectorAll('[type="text"]');
    this.income = {};
    this.addIncome =  [];
    this.expenses = {};
    this.addExpenses =  [];
    this.incomeMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.expensesMonth = 0;
    this.missionComplete = 0;
    this.budget = 0;
    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonthValue.value = '';
    additionalExpensesValue.value = '';
    additionalIncomeValue.value = '';
    targetMonthValue.value = '';
    incomePeriodValue.value = '';
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    depositPercent.value = '';
    depositAmount.value = '';
    depositBank.value = '';
    depositCheck.checked = false;
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    this.clearInputs();
    for (let i = 1; i < incomeItems.length; i++) {
      if (incomeItems[i] !== 0) {
        incomeItems[i].remove();
        addIncome.style.display = 'block';
      }
    }
    for (let i = 1; i < expensesItems.length; i++) {
      if (expensesItems[i] !== 0) {
        expensesItems[i].remove();
        addExpenses.style.display = 'block';
      }
    }
    addIncome.removeAttribute('disabled', '');
    addExpenses.removeAttribute('disabled', '');
    resetBtn.style.display = 'none';
    startButton.style.display = 'block';
    startButton.setAttribute('disabled', '');
    allInputsText.forEach(function(item) {
    let disabled = item.removeAttribute('disabled');
    return disabled;
    });
  }

  clearInputs() {
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value = '';
    let cashExpenses = item.querySelector('.expenses-amount').value = '';
    return item;
  });
  incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value = '';
    let cashIncome = item.querySelector('.income-amount').value = '';
    return item;
  });
  for (let i = 0; i < additionalIncomeItem.length; i++) {
    additionalIncomeItem[i].value = '';
  }
  additionalExpensesItem.value = '';
  targetAmount.value = '';
  salaryAmount.value = '';
  }

  start() {
    const allInputsText = document.querySelectorAll('[type="text"]');
    this.budget = +salaryAmount.value;
    

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();
    
    addIncome.setAttribute('disabled', '');
    addExpenses.setAttribute('disabled', '');
    resetBtn.style.display = 'block';
    startButton.style.display = 'none';
    allInputsText.forEach(function(item) {
    let disabled = item.setAttribute('disabled', '');
    return disabled;
  });
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcSavedMoney());
  }

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let cloneInputsText = cloneExpensesItem.querySelectorAll('.expenses-title');
    cloneInputsText.forEach(function(input) {
      input.addEventListener('input', function(event) {
        let regExpText = /^[А-Яа-яЁё\s\,]+/;
        let currentInputValue = event.currentTarget.value;
        let checkStr = currentInputValue.match(regExpText);
        input.value = (checkStr && input.classList.contains('expenses-title')) ? checkStr : '';
      });
      input.value = '';
    });
    let cloneInputsNum = cloneExpensesItem.querySelectorAll('.expenses-amount');
    cloneInputsNum.forEach(function(inputNum) {
      inputNum.addEventListener('input', function(event) {
        let regExpNum = /^[0-9]+/;
        let currentInputValue = event.currentTarget.value;
        let checkNum = currentInputValue.match(regExpNum);
        inputNum.value = (checkNum && inputNum.classList.contains('expenses-amount')) ? checkNum : '';
      });
      inputNum.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      addExpenses.style.display = 'none';
    }
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  } // Добавил стрелочную функцию вместо обычной

  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    let cloneInputsText = cloneIncomeItem.querySelectorAll('.income-title');
    cloneInputsText.forEach(function(input) {
      input.addEventListener('input', function(event) {
        let regExpText = /^[А-Яа-яЁё\s\,]+/;
        let currentInputValue = event.currentTarget.value;
        let checkStr = currentInputValue.match(regExpText);
        input.value = (checkStr && input.classList.contains('income-title')) ? checkStr : '';
      });
      input.value = '';
    });
    let cloneInputsNum = cloneIncomeItem.querySelectorAll('.income-amount');
    cloneInputsNum.forEach(function(inputNum) {
      inputNum.addEventListener('input', function(event) {
        let regExpNum = /^[0-9]+/;
        let currentInputValue = event.currentTarget.value;
        let checkNum = currentInputValue.match(regExpNum);
        inputNum.value = (checkNum && inputNum.classList.contains('income-amount')) ? checkNum : '';
      });
      inputNum.value = '';
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncome);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        addIncome.style.display = 'none';
    }
  }

  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('input.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  } // Добавил стрелочную функцию вместо обычной

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  } // Добавил стрелочную функцию вместо обычной

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  } // Добавил стрелочную функцию вместо обычной

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  }
  
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners() {
    const _this = this;
    startButton.setAttribute('disabled', '');
    salaryAmount.addEventListener('input', () => startButton.disabled = salaryAmount.value.trim() === '');
    startButton.addEventListener('click', function() {
      _this.start();
    });
    resetBtn.addEventListener('click', function() {
      _this.reset();
    });
    addExpenses.addEventListener('click', this.addExpensesBlock);
    addIncome.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', function() {
      periodAmount.textContent = periodSelect.value;
    });
    inputText.forEach((input) => input.addEventListener('input', function(event) {
      let regExp = /^[А-Яа-яЁё\s\,]+/;
      let currentInputValue = event.currentTarget.value;
      let checkStr = currentInputValue.match(regExp);
      input.value = checkStr ? checkStr : '';
    }));
    inputNumbers.forEach((input) => input.addEventListener('input', function(event) {
      let regExp = /^[0-9]+/;
      let currentInputValue = event.currentTarget.value;
      let checkStr = currentInputValue.match(regExp);
      input.value = checkStr ? checkStr : '';
    }));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    depositPercent.addEventListener('input', function(event) {
      let regExp = /^[0-9]+/;
      let currentInputValue = event.currentTarget.value;
      let checkStr = currentInputValue.match(regExp);
      depositPercent.value = checkStr ? checkStr : '';
      if (depositPercent.value > 100) {
        depositPercent.value = 'Не может быть больше 100!';
      }
    });
  }
}

const appData = new AppData();
appData.eventListeners();

// console.log(appData.getTargetMonth());
//   for (let key in appData) {
//     console.log('Наша программа включает в себя данные: ' + key);
//   }
// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());