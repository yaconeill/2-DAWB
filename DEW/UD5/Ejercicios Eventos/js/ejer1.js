var billete5 = document.getElementById('5')
billete5.addEventListener('click', countMoney);
var billete10 = document.getElementById('10')
billete10.addEventListener('click', countMoney);
var billete20 = document.getElementById('20')
billete20.addEventListener('click', countMoney);
var billete50 = document.getElementById('50')
billete50.addEventListener('click', countMoney);
var billete100 = document.getElementById('100')
billete100.addEventListener('click', countMoney);
var billete200 = document.getElementById('200')
billete200.addEventListener('click', countMoney);
var billete500 = document.getElementById('500')
billete500.addEventListener('click', countMoney);
var sum = 0;

function countMoney() {
    var amount = parseInt(this.id);
    sum += amount;
    document.getElementsByTagName('p')[0].innerText = 'La suma es: ' + sum + ' €';
}