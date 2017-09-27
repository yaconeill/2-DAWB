function isInteger(text) {
    while (true) {
        var value = prompt(text);
        if (value != parseInt(value))
            alert("Sólo números enteros.");
        else
            return parseInt(value);
    }
}

function isPositiveFloat(text) {
    while (true) {
        var value = prompt(text);
        if (value != parseFloat(value))
            alert("Sólo valores positivos reales.");
        else
            return parseFloat(value);
    }
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

function isaChar(text) {
    while (true) {
        var value = prompt(text);
        if (value.length > 1)
            alert("Sólo caracteres individuales.");
        else if (value == "" || value.indexOf(' ') >= 0)
            alert("No dejar el campo en blanco.")
        else
            return value;
    }
}