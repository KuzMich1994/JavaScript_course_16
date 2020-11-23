'use strict';
let money = prompt('Ваш месячный доход?', 0);
console.log(typeof ('money: ', money));
let income = 'Фриланс';
console.log(typeof ('income: ', income));
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.length);
let deposit = confirm('Есть ли у вас депозит в банке?');
console.log(typeof (deposit.valueOf()));

let mission = 200000;
let period = 11;
console.log(`Период равен ${period} месяцев` + `
Цель заработать ${mission} рублей`);
console.log(addExpenses.split(','));

let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько это обойдется?');
let result;

if (amount1 && amount2 > 0) {
  result = amount1 + amount2;
} else {
  result = 'Не может быть рассчитан';
}

let budgetMonth = +money - result;
console.log('Бюджет на месяц: ' + budgetMonth);

let missionComplete = Math.ceil(mission / result);

if (missionComplete === 1) {
  console.log('Цель будет достигнута за: ' + missionComplete + ' месяц');
} else if (missionComplete <= 4) {
  console.log('Цель будет достигнута за: ' + missionComplete + ' месяца');
} else {
  console.log('Цель будет достигнута за: ' + missionComplete + ' месяцев');
}

let budgetDay = Math.floor(+budgetMonth / 30);
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что-то пошло не так');
}
// console.log('Цель будет достигнута за: ' + Math.ceil(mission / result) + ' месяца');
