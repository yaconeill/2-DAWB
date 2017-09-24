// 5.	Solicitar por teclado mediante prompt un número positivo y mostrar un mensaje
//      indicando el número de dígitos que contiene y la suma de cada uno de sus dígitos.
//      Por ejemplo: 125, tendría tres dígitos y la suma de estos sería 8.
function sumDigits() {
    var num = isPositiveInt("Introducir un número positivo:");
    var numDigits = num.toString().length;
    var sum = 0;
    for (var n in num){
        sum += parseInt(num[n]);
    }
    alert(num + " tiene " + numDigits + " digitos y la suma de estos es: " + sum);
}