// 10. Modificar el ejercicio anterior para pedir dos caracteres en lugar de uno,
//     se seguirá pidiendo la anchura pero se aplicará un estilo diferente a cada carácter,
//     de forma que sea fácil su distinción visual.
//     Para ello se añadirán estilos CSS que deberán estar separados del código HTML y JS.
function blue() {
    var caracter1 = isaChar("Introducir un caracter para crear el triangulo:");
    var caracter2 = isaChar("Introducir otro caracter:");
    var base = isPositiveInt("Introducir el tamaño de la base:");
    var piramid = [];
    var space = "&nbsp;";
    var c = 0;
    var b = base;
    do {
        var row = [];
        if (b == base) {
            for (var i = b; i >= 1; i--)
                row.push(caracter1 + space);
        } else {
            for (var i = b; i >= b; i--) {
                row.push(space);
                if (b == 1)
                    row.push(caracter1 + space);
                else {
                    row.push(caracter1 + space);
                    for (var j = 0; j < i - 2; j++)
                        row.push(caracter2 + space);
                    row.push(caracter1 + space);
                }
            }
        }
        piramid.push(row.join(''));
        c++;
        b--;
    } while (c < base) {
        document.getElementById('writeTwo').innerHTML = piramid.join("<br/>");
    }
    // do{
    //     var row = [];
    //     for (var i = j; i >= 1; i--) {
    //         if (i%2 == 0){
    //             row.push(caracter2);
    //         }else {
    //             row.push(caracter1);
    //         }
    //     }
    //     piramid.push(row.join(''));
    //     c++;
    //     j--;
    // }while (c < base){
    //     document.getElementById('writeTwo').innerHTML = piramid.join("<br/>");
    // }

}