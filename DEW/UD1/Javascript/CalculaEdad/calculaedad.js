function calculateAge(bornYear){   
    var year = new Date() ;
    var currentYear = year.getFullYear();
    alert ("Estás entre " + (currentYear - bornYear) + " o " + (currentYear - bornYear + 1) + " años.");
}
calculateAge(anno = prompt("Introducir año de nacimiento:"));