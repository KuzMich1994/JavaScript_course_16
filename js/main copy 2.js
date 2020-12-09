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
resetBtn = document.querySelector('#cancel');
let periodAmount = document.querySelector('.period-amount'),
expensesItems = document.querySelectorAll('.expenses-items'),
incomeItems = document.querySelectorAll('.income-items');


const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isStringNumber = function(n) {
  return isNaN(n);
};

function AppData() {
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

let appData = new AppData ();

AppData.prototype.reset = function() {
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
  };
  AppData.prototype.clearInputs = function() {
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
  };

  AppData.prototype.start = function() {
    const allInputsText = document.querySelectorAll('[type="text"]');
    this.budget = +salaryAmount.value;
    

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
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
  };
  AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcSavedMoney());
  };
  AppData.prototype.addExpensesBlock = function() {
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
  };
  AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, this);
  };
  AppData.prototype.addIncomeBlock = function() {
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
  };
  AppData.prototype.getIncome = function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('input.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    }, this);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };
  AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
  };
  AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this);
  };
  AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  };
  AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };
  AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
    
  };
  AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  };
  AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?');
      }
      while (!isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = prompt('Какая сумма заложена?');
      }
      while (!isNumber(this.moneyDeposit));
    }
  };
  AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
  };
  AppData.prototype.eventListeners = function() {
    const _this = this;
    startButton.setAttribute('disabled', '');
    salaryAmount.addEventListener('input', () => startButton.disabled = salaryAmount.value.trim() === '');
    startButton.addEventListener('click', function() {
      _this.start.apply(appData);
    });
    resetBtn.addEventListener('click', function() {
      _this.reset.apply(appData);
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
  };

AppData.prototype.eventListeners();


// console.log(appData);


// salaryAmount.addEventListener('input', () => startButton.disabled = salaryAmount.value.trim() === '');
// startButton.addEventListener('click', function() {
//   appData.start.apply(appData);
// });
// resetBtn.addEventListener('click', function() {
//   appData.reset.apply(appData);
// });
// addExpenses.addEventListener('click', appData.addExpensesBlock);
// addIncome.addEventListener('click', appData.addIncomeBlock);
// periodSelect.addEventListener('input', function() {
//   periodAmount.textContent = periodSelect.value;
// });
// inputText.forEach((input) => input.addEventListener('input', function(event) {
//   let regExp = /^[А-Яа-яЁё\s\,]+/;
//   let currentInputValue = event.currentTarget.value;
//   let checkStr = currentInputValue.match(regExp);
//   input.value = checkStr ? checkStr : '';
// }));
// inputNumbers.forEach((input) => input.addEventListener('input', function(event) {
//   let regExp = /^[0-9]+/;
//   let currentInputValue = event.currentTarget.value;
//   let checkStr = currentInputValue.match(regExp);
//   input.value = checkStr ? checkStr : '';
// }));

// console.log(appData.getTargetMonth());
//   for (let key in appData) {
//     console.log('Наша программа включает в себя данные: ' + key);
//   }
// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());