// 10. Modificar el ejercicio anterior para pedir dos caracteres en lugar de uno,
//     se seguirá pidiendo la anchura pero se aplicará un estilo diferente a cada carácter,
//     de forma que sea fácil su distinción visual.
//     Para ello se añadirán estilos CSS que deberán estar separados del código HTML y JS.
function blue() {
    var caracter1 = prompt("Introducir un caracter para crear el triangulo:");
    var caracter2 = prompt("Introducir otro caracter:");
    var base = isPositiveInt("Introducir el tamaño de la base:");
    var piramid = [];
    var c = 0;
    var j = base;
    do{
        var row = [];
        for (var i = j; i >= 1; i--) {
            if (i%2 == 0){
                row.push(caracter2);
            }else {
                row.push(caracter1);
            }
        }
        piramid.push(row.join(''));
        c++;
        j--;
    }while (c < base){
        document.getElementById('writeTwo').innerHTML = piramid.join("<br/>");
    }
}