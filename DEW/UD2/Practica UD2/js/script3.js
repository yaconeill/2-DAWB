// 3.	Repetir el ejercicio 1 con cuatro valores enteros y tres valores reales.
//     En este caso, los números deben ser almacenados en una única variable, deben ser todos positivos y
//     se debe mostrar un mensaje de “Aprobado” cuando la media supere el 5.
//     Si la media es menor a 5 saldrá el mensaje "Ponte las pilas".
function average() {

    var list = (isPositiveInt("Introducir nota 1"));
    list.push(isPositiveInt("Introducir nota 2"));
    list.push(isPositiveInt("Introducir nota 3"));
    list.push(isPositiveInt("Introducir nota 4"));
    list.push(isPositiveFloat("Introducir nota 5"));
    list.push(isPositiveFloat("Introducir nota 6"));
    list.push(isPositiveFloat("Introducir nota 7"));

    var avg = 0;

    for (var i = 0; i < list.length; i++) {
        avg += list[i];
    }

    var result = avg / list.length;
    if (result > 4) {
        alert("Aprobado");
    } else {
        alert("Ponte las pilas");
    }
}