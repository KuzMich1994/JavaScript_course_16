'use strict';
let money = prompt('Ваш месячный доход?', 0);
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 200000;
let period = 11;

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.split(','));

let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько это обойдется?');
let result;


function getExpensesMonth(a, b) {
  if (amount1 && amount2 > 0) {
    result = a + b;
  } else {
    result = 'Не может быть рассчитан';
  }
  return result;
}

console.log('Обязательные расходы: ' + getExpensesMonth(amount1, amount2));

function getAccomulatedMonth(a, b) {
  return a - b;
}

let accumulatedMonth = getAccomulatedMonth(money, result);

let missionComplete;

function getTargetMonth(a, b) {
  missionComplete = Math.ceil(a / b);
  if (missionComplete === 1) {
    return ('Цель будет достигнута за: ' + missionComplete + ' месяц');
  } else if (missionComplete <= 4) {
    return ('Цель будет достигнута за: ' + missionComplete + ' месяца');
  } else {
    return ('Цель будет достигнута за: ' + missionComplete + ' месяцев');
  }
}

console.log(getTargetMonth(mission, result));

let budgetDay = Math.floor(accumulatedMonth / 30);
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
