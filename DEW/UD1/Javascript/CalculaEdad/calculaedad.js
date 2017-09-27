function calculateAge(bornYear) {
    // var year = new Date();
    // var currentYear = year.getFullYear();
    alert("Estás entre " + ((new Date().getFullYear()) - bornYear) + " o " +
        ((new Date().getFullYear()) - bornYear + 1) + " años.");
}
calculateAge(prompt("Introducir año de nacimiento:"));