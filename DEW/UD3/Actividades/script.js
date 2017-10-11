function mathOperations(params) {
    document.getElementById('myTextArea').value = " ";
    // Pedir al usuario 2 números (a y b) y mostrar en un textarea el resultado de las siguientes operaciones:
    var a = parseInt(prompt("Introducir 2 números y se mostrarán distintas operaciones matemáticas con ellos:"));
    var b = parseInt(prompt("Introducir el segundo"));
    var operation = [];

    // logaritmo neperiano (o en base "e") de "a",
    operation["logaritmo nep e 'a' => "] = Math.log(a);

    // raíz cuadrada de "a",
    operation["Raiz cuadrada => "] = Math.sqrt(a);

    // "a" elevado a "b",
    operation["'A' potencia de 'b' => "] = Math.pow(a, b);

    // número entero más cercano y menor a "a",
    operation["Nº menor  mas cercano a 'a' => "] = Math.floor(a);

    // número entero más cercano y mayor a "b",
    operation["Nº mayor más cercano a 'b' => "] = Math.ceil(b);

    // redondea al entero más próximo de "a",
    operation["Redondeo al entero mas cercano a 'a' => "] = Math.round(a)

    // crear un número aleatorio entre 0 y 1, número aleatorio entre "a" y "b",
    operation["Numero aleatorio entre 0 y 1: "] = Math.random();
    operation["Numero aleatorio entre " + a + " y " + b + ": "] = Math.floor(Math.random() * (parseInt(b) - parseInt(a) + 1) + a);
    // operation["Numero aleatorio entre " + a + " y " + b + ": "] = Math.floor(Math.random() * ((a > b ? a : b) - (a < b ? a : b) + 1) + (a < b ? a : b));

    // calcular las funciones trigonométricas: seno, coseno y tangente de "b" en radianes,
    operation["Seno => "] = Math.sin(b * (Math.PI / 180));
    operation["Coseno => "] = Math.cos(b * (Math.PI / 180));
    operation["Tangente => "] = Math.tan(b * (Math.PI / 180));

    // valor absoluto de "a",
    operation["Valor absoluto de 'a'=> "] = Math.abs(a);

    // valor máximo valor entre "a" y "b",
    operation["Valor max entre 'a' y 'b' => "] = Math.max(a, b);

    // mínimo valor de los dos ("a" y "b").
    operation["Valor min entre 'a' y 'b' => "] = Math.min(a, b);
    for (var e in operation)
        document.getElementById('myTextArea').value = e + operation[e] + "\n";
}

function hipotenusa(params) {
    // Pedir al usuario el valor de 2 lados de un triángulo. Calcular la hipotenusa de dicho triángulo  (suma de los cuadrados de ambos lados).
    var a = prompt("Introducir 2 de un triángulo, Introducir el primero:");
    var b = prompt("Introducir el segundo");
    var hypot = Math.hypot(a, b);
    alert("La hipotenusa es: " + hypot);
}

function contar(item) {
    return window.document.querySelectorAll("form " + item).length;
}
// window.document.forms[0].elements.length;
// document.getElementById("container").window.document.links.length;
// document.getElementById("container").window.document.images.length;
// document.getElementById("container").window.document.input.length;
// document.getElementById("container").window.document.label.length;

function mostrarCalculo(params) {
    var elementos = [];
    elementos["Nº de enlaces: "] = contar("a");
    elementos["Nº de imagenes: "] = contar("img");
    elementos["Nº de inputs: "] = contar("input");
    elementos["Nº de botones: "] = contar("button");
    elementos["Nº de checkbox: "] = contar("input[type = checkbox]");
    elementos["Nº de select: "] = contar("select");
    elementos["Nº de label:"] = contar("label");
    elementos["Nº de span: "] = contar("span");
    for (var e in elementos)
        document.getElementById('elementos').innerHTML += e + elementos[e] + "</br>";

}

function AddToFavorites() {
    if (window.sidebar) { // Firefox
        window.sidebar.addPanel('Google', 'http://www.google.es', '');
    } else {
        if (window.external && ('AddFavorite' in window.external)) {
            // Internet Explorer
            window.external.AddFavorite('http://www.google.es', 'Google');
        } else { // Opera, Google Chrome and Safari
            alert("Your browser doesn't support this example!");
        }
    }
}