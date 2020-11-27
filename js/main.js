'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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
  mission: 200000,
  period: 11,
  budgetMonth: 0,
  budgetDay: 0,
  expensesMonth: 0,
  missionComplete: 0,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
      let expensesMonth = 0;
      let question;
      for (let i = 0; i < 2; i++) {
      question = prompt('Укажите обязательную статью расходов');
      
      do {
        expensesMonth = +prompt('Во сколько это обойдется?');
      }
      while (isNaN(expensesMonth));
      appData.expenses[question] = expensesMonth;  
      
    }
    return +expensesMonth; 
  },
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function() {
    appData.budgetMonth = money - appData.expensesMonth;
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
