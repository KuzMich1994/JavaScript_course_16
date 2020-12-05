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
inputNumbers = document.querySelectorAll('[placeholder="Сумма"]');
let periodAmount = document.querySelector('.period-amount'),
expensesItems = document.querySelectorAll('.expenses-items'),
incomeItems = document.querySelectorAll('.income-items');
// console.log(inputText);


const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isStringNumber = function(n) {
  return isNaN(n);
};

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetMonth: 0,
  budgetDay: 0,
  expensesMonth: 0,
  missionComplete: 0,
  budget: 0,
  start: function() {
    appData.budget = +salaryAmount.value;
    salaryAmount.value = '';


    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('change', function() {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  addExpensesBlock: function() {
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
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function() {
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
    incomeItems[0].parentNode.after(cloneIncomeItem, addIncome);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        addIncome.style.display = 'none';
    }
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('input.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    return targetAmount.value / appData.budgetMonth;
    
  },
  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  },
  getInfoDeposit: function() {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?');
      }
      while (!isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?');
      }
      while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * periodSelect.value;
  },
};

startButton.setAttribute('disabled', '');
salaryAmount.addEventListener('input', () => startButton.disabled = salaryAmount.value.trim() === '');
startButton.addEventListener('click', appData.start);
startButton.addEventListener('click', function(){
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value = '';
    let cashExpenses = item.querySelector('.expenses-amount').value = '';
    return item;
  });
  for (let i = 0; i < additionalIncomeItem.length; i++) {
    additionalIncomeItem[i].value = '';
  }
  targetAmount.value = '';
});

addExpenses.addEventListener('click', appData.addExpensesBlock);
addIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', function() {
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




// console.log(appData.getTargetMonth());
//   for (let key in appData) {
//     console.log('Наша программа включает в себя данные: ' + key);
//   }
// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

