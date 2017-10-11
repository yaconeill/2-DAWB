// 9.	Crear una función que reciba un caracter (por ejemplo el *) y un número.
//     Esta función debe escribir un triángulo formado por esa letra, que tenga como anchura inicial
//     la que se ha indicado en el número. Por ejemplo, si la letra es * y la anchura es 4, debería mostrar lo siguiente:
//     1.	****
//     2.	 ***
//     3.	  **
//     4.	   *
function writeTriangle() {
    var caracter = prompt("Introducir un caracter para crear el triangulo");
    var base = isPositiveInt("Introducir el tamaño de la base:");
    var piramid = [];
    var c = 0;
    var j = base;
    do {
        var row = [];
        for (var i = j; i >= 1; i--) {
            row.push(caracter);
        }
        piramid.push(row.join(''));
        c++;
        j--;
    } while (c < base) {
        document.getElementById('write').value = piramid.join("<br/>");
    }
}

// for (var i = base; i >= 1; i--) {
//     var row;
//     if (i > 1 && i < base) {
//         row = caracter + new Array(i - 1).join(caracter) + caracter;
//     } else {
//         row = new Array(i + 1).join(caracter);
//     }
//     piramid.push(row);
// }