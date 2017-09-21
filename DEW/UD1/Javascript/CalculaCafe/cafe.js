const life = 95;

function calculateSupply(age, quantity) {
    if (isNaN(age) || isNaN(quantity)) {
        return console.log("Valor no correcto");
    }
    var coffee = ((365 * quantity) * (life - age)).toFixed();
    alert("Con " + age + " años y " + quantity + " tazas al día: \nNecesitarás " + coffee + " tazas de café hasta que tengas " +
        life);
}
calculateSupply(30, 1.55);
calculateSupply(22, 3);
calculateSupply(40, 2);