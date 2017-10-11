function getMonth(mes) {
    var num;
    switch (mes.trim()) {
        case "ene":
            num = 1;
            break;
        case "feb":
            num = 2;
            break;
        case "mar":
            num = 3;
            break;
        case "abr":
            num = 4;
            break;
        case "may":
            num = 5;
            break;
        case "jun":
            num = 6;
            break;
        case "jul":
            num = 7;
            break;
        case "ago":
            num = 8;
            break;
        case "sep":
            num = 9;
            break;
        case "oct":
            num = 10;
            break;
        case "nov":
            num = 11;
            break;
        case "dic":
            num = 12;
            break;
        default:
            num = " ";
    }
    return num;
}

var msPerDay = 1000 * 60 * 60 * 24;
var d = new Date();
do {
    var data = prompt("introduzca una fecha:(formato mmm dd, aaaa)");
    var date = data.replace(",", "");
    var chooseDate = date.split(" ");
    var mes = date.substring(0, 4);
    var month = getMonth(mes);
    if (isNaN(month))
        alert("Ups, revisa el mes algo ha fallado");

    else if (chooseDate[1] > 31 || chooseDate[1] < 1 || isNaN(parseInt(chooseDate[1])))
        alert("Ups, revisa el dia algo ha fallado");

    else if (chooseDate[2] < 0 || isNaN(parseInt(chooseDate[2])))
        alert("Ups, revisa el año algo ha fallado");
    else
        break;
}
while (true)


var date1 = new Date(chooseDate[2] + "-" + month + "-" + chooseDate[1]);

var diffDays = Math.floor((d - date1) / msPerDay);

alert(diffDays);