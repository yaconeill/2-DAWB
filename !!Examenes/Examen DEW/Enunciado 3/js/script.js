var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var btn4 = document.getElementById('btn4');
btn1.addEventListener('click', now);
btn2.addEventListener('click', yesterday);
btn3.addEventListener('click', TenYearsAgo);
btn4.addEventListener('click', nextWeek);
var now = new Date();
var month = now.getMonth();
var year = now.getFullYear();
var day = now.getDate();
var hour = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();

function now() {
    var date = now.toUTCString();
    alert('Fecha actual ' + date);
}

function yesterday() {
    var diference = now.getDate() - 1;
    var yesterday = new Date(year, month, diference, hour, minutes, seconds);
    var time = yesterday.toUTCString();
    alert('Hace 24 horas, la hora y la fecha eran: ' + time);
}

function TenYearsAgo() {
    var diference = now.getFullYear() - 10;
    var yesterday = new Date(diference, month, day, hour, minutes, seconds);
    var time = yesterday.toUTCString();
    alert('Hace 10 años, la hora y la fecha eran: ' + time);
}

function nextWeek() {
    var diference = now.getDate() + 7;
    var yesterday = new Date(year, month, diference, hour, minutes, seconds);
    var time = yesterday.toUTCString();
    alert('Dentro de una semana, la hora y la fecha seran: ' + time);
}