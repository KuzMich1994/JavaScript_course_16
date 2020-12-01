'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isStringNumber = function(n) {
  return isNaN(n);
};

let money,
    start = function() {
      // money = prompt('Ваш месячный доход?');

      do {
        money = prompt('Ваш месячный доход?');
      } 
      while (!isNumber(money));
    };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 200000,
  period: 11,
  budgetMonth: 0,
  budgetDay: 0,
  expensesMonth: 0,
  missionComplete: 0,
  budget: money,
  asking: function() {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      let cashIncome;

      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      }
      while (!isStringNumber(itemIncome));

      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      }
      while (!isNumber(cashIncome));
      
      appData.income[itemIncome] = +cashIncome;
    }

    let expensesMonth = 0;
    let question;
    let addExpenses;
    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    }
    while (!isStringNumber(addExpenses));
      appData.addExpenses = addExpenses.split(' ').map(string => string.charAt(0).toUpperCase() + 
      string.slice(1)).join(', ');
    console.log(appData.addExpenses);
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
      
      for (let i = 0; i < 2; i++) {
      do {
        question = prompt('Укажите обязательную статью расходов');
      }
      while (!isStringNumber(question));
      
      do {
        expensesMonth = +prompt('Во сколько это обойдется?');
      }
      while (!isNumber(expensesMonth) || expensesMonth === 0);
      appData.expenses[question] = expensesMonth;  
      
    }
  },
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    appData.missionComplete = Math.ceil(appData.mission / appData.budgetMonth);
    if (appData.missionComplete < 0) {
      return 'Цель не будет достигнута';  
    } else if (appData.missionComplete === 1) {
      return ('Цель будет достигнута за: ' + appData.missionComplete + ' месяц');
    } else if (appData.missionComplete <= 4) {
      return ('Цель будет достигнута за: ' + appData.missionComplete + ' месяца');
    } else {
      return ('Цель будет достигнута за: ' + appData.missionComplete + ' месяцев');
    }
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
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
console.log('Обязательные расходы: ' + appData.expensesMonth);
appData.getBudget();
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
  for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key);
  }
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
// console.log(appData.addExpenses.join(', ').charAt(0).toLocaleUpperCase() + 
// appData.addExpenses.join(', ').slice(1));

