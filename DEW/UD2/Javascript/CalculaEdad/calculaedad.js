// function calculateAge(bornYear) {
//     // var year = new Date();
//     // var currentYear = year.getFullYear();
//     alert("Estás entre " + ((new Date().getFullYear()) - bornYear) + " o " +
//         ((new Date().getFullYear()) - bornYear + 1) + " años.");
// }
// calculateAge(prompt("Introducir año de nacimiento:"));
function calculateAge(bornYear, currentYear) {
    if (isNaN(bornYear) || bornYear < 1){
        alert("Error. Campo año de nacimiento no numérico o número negativo");
    }
    else if(isNaN(currentYear) || currentYear < 1){
        alert("Error. Campo año vigente no numérico o número negativo");
    }
        else{
            alert("Estás entre " + (currentYear - bornYear) + " o " +
                (currentYear - bornYear + 1) + " años.");
            }
}