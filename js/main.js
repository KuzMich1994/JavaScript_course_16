'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 200000;
const period = 11;

const start = function() {
  // money = prompt('Ваш месячный доход?');

  do {
    money = prompt('Ваш месячный доход?');
  } 
  while (!isNumber(money));
};

start();

const showTypeOf = function(data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.split(','));



function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Укажите обязательную статью расходов');

    do {
      sum = prompt('Во сколько это обойдется?');
    }
    while (!isNumber(sum));
    
  }
  return sum; 
}

let expensesAmount = getExpensesMonth();

console.log('Обязательные расходы: ' + expensesAmount);

function getAccomulatedMonth() {
  return money - expensesAmount;
}

const accumulatedMonth = getAccomulatedMonth();

let budgetDay = Math.floor(accumulatedMonth / 30);

let missionComplete;

function getTargetMonth(a, b) {
  missionComplete = Math.ceil(b / a);
  if (missionComplete < 0) {
    return 'Цель не будет достигнута';
  } else if (missionComplete === 1) {
    return ('Цель будет достигнута за: ' + missionComplete + ' месяц');
  } else if (missionComplete <= 4) {
    return ('Цель будет достигнута за: ' + missionComplete + ' месяца');
  } else {
    return ('Цель будет достигнута за: ' + missionComplete + ' месяцев');
  }
}

console.log(getTargetMonth(accumulatedMonth, mission));

console.log('Бюджет на день: ' + budgetDay);

function getStatusIncome() {
  if (budgetDay >= 1200) {
  return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay < 0) {
    return ('Что-то пошло не так');
  }
}

console.log(getStatusIncome());
