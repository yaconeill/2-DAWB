const life = 95;

function calculateSupply(age, quantity) {
    if (isValid(age) && isValid(quantity)) {
        var coffee = ((365 * quantity) * (life - age)).toFixed();
        alert("Con " + age + " años y " + quantity + " tazas al día: \nNecesitarás "
            + coffee + " tazas de café hasta que tengas " + life);
    }
}

function isValid(value) {
    var valid = false;
    isNaN(value) ? alert("Valor no numérico") : valid = true;
    // if (isNaN(value)) {
    //     alert("Valor no numérico");
    //     valid = false;
    // }

    return valid;
}

// calculateSupply(valida(30), valida(1.5));
// calculateSupply(valida(23), valida(3));
// calculateSupply(valida(40), valida(a));