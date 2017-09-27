// 1.	Realizar un programa que pida al usuario mediante prompt 6 valores enteros 
// que serán almacenados en 6 variables distintas. Una vez introducidos se deberá 
// mostrar un mensaje que indique el número mayor, el menor, la suma de los enteros 
// introducidos y la diferencia entre el mayor y el menor.
function mathOperations() {
    var value1 = isInteger("Introducir nº1");
    var value2 = isInteger("Introducir nº2");
    var value3 = isInteger("Introducir nº3");
    var value4 = isInteger("Introducir nº4");
    var value5 = isInteger("Introducir nº5");
    var value6 = isInteger("Introducir nº6");

    // Mayor
    var major = Math.max(value1, value2, value3, value4, value5, value6);
    // value1 > value2 ? major = value1 : major = value2;
    // if (value3 > major) {
    //     major = value3;
    // }
    // if (value4 > major) {
    //     major = value4
    // }
    // if (value5 > major) {
    //     major = value5;
    // }
    // if (value6 > major) {
    //     major = value6;
    // }

    // Suma
    var sum = value1 + value2 + value3 + value4 + value5 + value6;

    // Diferencia entre el mayor y el menor
    var minor = Math.min(value1, value2, value3, value4, value5, value6);
    var difference = major - minor;
    // value1 < value2 ? minor = value1 : minor = value2;
    // if (value3 < minor) {
    //     minor = value3;
    // }
    // if (value4 < minor) {
    //     minor = value4
    // }
    // if (value5 < minor) {
    //     minor = value5;
    // }
    // if (value6 < minor) {
    //     minor = value6;
    // }

    alert("Número mayor introducido: " + major +
        "\nSuma total: "+ sum +
        "\nDiferencia entre mayor y menor: "+ difference);
}