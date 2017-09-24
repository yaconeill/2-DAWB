// 7.	Solicitar al usuario el día, mes y año de nacimiento. En función de estos datos mostrar al usuario su edad.
function ageCalculator() {
    var age;
    var date = new Date();
    var currentDay = date.getUTCDate();
    var currentMonth = date.getMonth() + 1;
    var currentYear = date.getFullYear();
    var day = parseInt(isPositiveInt("Introducir día de nacimiento. (dd)"));
    var month = parseInt(isPositiveInt("Intrducir mes de nacimiento. (mm)"));
    var year = parseInt(isPositiveInt("Intrducir año de nacimiento. (aaaa)"));

    if (month >= currentMonth) {
        if (day >= currentDay) {
            age = date.getFullYear() - year;
        }
    } else {
        age = (currentYear - year) - 1;
    }
    if (day == currentDay && month == currentMonth) {
        alert("Felicidades hoy cumple " + age + " años");
    } else {
        alert("Su edad es: " + age + " años");
    }
}