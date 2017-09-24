// 2.	Solicitar al usuario un número entero a través de una ventana de diálogo.
//     Multiplicar ese número por 2.5 y sumarle 100. Mostrar el resultado en otra ventana de diálogo.
function multiplies() {
    var value1 = parseInt(isInteger("Introducir número: "));
    var result = (value1 * 2.5) + 100;
    alert("El resultado su multiplicación por 2,5 y sumarle 100 es: " + result);
}