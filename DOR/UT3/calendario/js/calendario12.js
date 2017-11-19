currDate();
var year = document.getElementById('year');
year.addEventListener('click', calendar);

function calendar() {
    printNameMonthWeekDays();
    for (let j = 0; j < 12; j++) {

        let month = j;
        let dayweek = document.getElementsByClassName('DS');
        let year = document.getElementById('year').value;
        let numDaysOfWeek = { "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6, "Sun": 7 };

        let askedDate = new Date(year, month, 1);
        let fdw = askedDate.toDateString().substr(0, 3);

        if (month == 0) {
            var prevMonth = 12;
            var prevDate = new Date(year - 1, 12, 0);
        } else {
            var pm = 0;
            var prevDate = new Date(year, pm - 1, 0);
        }
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var daysInPrevMonth = new Date(year, month, 0).getDate();
        // primer dia de la semana
        var FirstdayOfWeek = numDaysOfWeek[fdw];
        var difference = (daysInPrevMonth + 1) - FirstdayOfWeek + 1;

        // indice 8 en adelante
        var divDays = document.getElementsByClassName('mes');

        for (let i = 1, k = 1, dd = 1, da = difference; i < divDays[j].children.length - 7; i++) {
            if (i > (FirstdayOfWeek - 1))
                if (k <= daysInMonth) {
                    divDays[j].children[i + 7].innerHTML = k;
                    k++;
                } else {
                    divDays[j].children[i + 7].innerHTML = '<o>' + dd + '</o>';
                    dd++;
                }
            else {
                divDays[j].children[i + 7].innerHTML = '<o>' + da + '</o>';
                da++;
            }
        }
    }
}

function printNameMonthWeekDays() {
    let monthString = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

    let monthName = document.getElementsByClassName('nombre');
    for (let i = 0; i < monthName.length; i++)
        monthName[i].innerHTML = monthString[i];
    let dayweek = document.getElementsByClassName('DS');
    for (let i = 0, j = 0; i < dayweek.length; i++ , j++) {
        dayweek[i].innerHTML = daysOfWeek[j];
        if (j == 6)
            j = -1;
    }
}

function currDate() {
    let currDate = new Date();
    document.getElementById('year').value = currDate.getFullYear();
    calendar();
}