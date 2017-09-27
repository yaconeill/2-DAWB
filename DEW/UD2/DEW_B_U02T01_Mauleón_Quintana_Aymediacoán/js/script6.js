// 6.	Solicitar que el usuario escriba alguna de estas cuatro palabras
//     (profesor, manzana, servidor, mar) para luego mostrar la palabra traducida en inglés.
//     Es decir, si se ingresa 'mar' debemos mostrar el texto 'sea' en la página.
//     Solo se admiten estas palabras como entradas permitidas.
function translateWords() {
    var word = prompt("Introducir una de las siguientes palabras para su traducción:\n" +
        "(profesor, manzana, servidor, mar).");
    switch (word.toLowerCase()) {
        case "profesor":
            alert("Teacher");
            break;
        case "manzana":
            alert("Apple");
            break;
        case  "servidor":
            alert("Server");
            break;
        case "mar":
            alert("sea");
            break;
        default:
            alert("Solo se admiten las palabras antes descritas como permitidas.");
    }
    // NO
    // var list = new Array("profesor", "manzana", "servidor", "mar");
    // if (word in list) {
    //     alert(word);
    // }
    // else {
    //     alert("Solo se admiten las palabras antes descritas como permitidas.");
    // }
}