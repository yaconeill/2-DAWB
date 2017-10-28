// Escucha del evento click
var btnStart = document.getElementById('start');
btnStart.addEventListener('click', reverseNumber);

function reverseNumber() {
    do {
        // Se comprueba que sea un número y se convierte a cadena para invertirlo.
        var num = isPositiveInt('Intoducir un numero para comprobar si es reversible.').toString();
        // Se divide invierte y junta de nuevo
        var reverNum = num.split('').reverse().join('');
        // Se comprueba que al invertirlo no empiece por cero ya que no sería reversible
        if (reverNum.substring(0, 1) == '0')
            console.log('NO');
        else {
            // Se descompone la cadena hacia un array
            var first = num.split('');
            var second = reverNum.split('');
            // Funcion devuelve la suma cada uno de los elementos del array
            var suma1 = (first) => {
                for (var i = 0; i < first.length; i++)
                    suma1 += first[i];
                return suma1;
            }
            var suma2 = (second) => {
                    for (var i = 0; i < second.length; i++)
                        suma2 = second[i];
                    return suma2;
                }
                // En caso de que los digitos sean impares mostrará un mensaje afirmativo de que es reversible
            if (suma1 % 2 != 0 && suma2 % 2 != 0)
                console.log('SI');
        }
    } while (num != 0);
}

function isPositiveInt(text) {
    while (true) {
        var value = prompt(text);
        if (value != parseInt(value) || parseInt(value) < 0)
            alert("Sólo valores positivos enteros.");
        else
            return parseInt(value);
    }
}