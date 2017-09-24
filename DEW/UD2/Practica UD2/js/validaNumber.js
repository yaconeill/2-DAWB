function isInteger(text) {
    while (true) {
        var value = prompt(text);

        if (value != parseInt(value)) {
            alert("Sólo números enteros.");
        } else {
            return parseInt(value);
        }
    }
}

function isPositiveFloat(text) {
    while (true) {
        var value = prompt(text);

        if (value != parseFloat(value)) {
            alert("Sólo valores positivos reales.");
        } else {
            return parseFloat(value);
        }
    }
}

function isPositiveInt(text) {
    while (true) {
        var value = prompt(text);
        if (value != parseInt(value) || parseInt(value) < 0) {
            alert("Sólo valores positivos enteros.");
        } else {
            return parseInt(value);
        }
    }
}

// function isFloat(text) {
//     while (true) {
//         var value = prompt(text);
//
//         if (value != parseFloat(value)) {
//             alert("Sólo valores positivos reales.");
//         } else {
//             if (parseFloat(value) > 0 || parseInt(value) <= 10) {
//                 return parseFloat(value);
//             } else {
//                 alert("Sólo valores entre 0 y 10.");
//             }
//         }
//     }
// }











