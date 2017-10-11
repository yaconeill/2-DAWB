// Creación del objeto animal, con array asociativo se crean
// las propiedades que puedan tener los animales.
function animals(slp, bJ, bS, j, sld, f, slw) {
    this.animal = ({
        sleep: slp,
        bigJump: bJ,
        bigSlide: bS,
        jump: j,
        slide: sld,
        fast: f,
        slow: slw
    });
}

// Función que genera un nº aleatorio entre 1 y 10.
function random() {
    return Math.round(Math.random() * (10 - 1) + 1);
}

// Función de paso a paso, que pasa 1 como parámetro para hacer una sola 
// pasada por la funcion race, despues de pasar por preRace, que muestra un texto.
function stepByStep() {
    preRace(1);
}

// Muestra el texto precarrera para luego llamar a la funcióm que la inicia,
// se le añade retardo de tiempo para que se visualice mejor.
function preRace(next) {
    // el contador limita a una ejecución la ecritura del texto de cabecera.
    if (cont == 0) {
        document.getElementById('circuit').innerHTML += '<h2>Preparados</h2>';
        setTimeout("document.getElementById('circuit').innerHTML += '<h2>listos</h2>'", 500);
        setTimeout("document.getElementById('circuit').innerHTML += '<h2>...</h2>'", 1000);
        setTimeout("document.getElementById('circuit').innerHTML += '<h1>Ya!</h1></br>'", 1700);
        setTimeout(race.bind(null, next), 2000);
    }else
        race(next);
}

// Inicia la carrera
function race(next) {
    // creación de los objetos animal, pasando los valores de sus propiedades,
    var Tortoise = new animals(0, 0, 0, 0, -6, 3, 1);
    var hare = new animals(0, 9, -12, 1, -2);
    // Genera un número aleatorio
    var step = random();
    // Asigna a las variable globales moveT y moveH los valores correspondientes
    // segun el número aletario generado.
    switch (step) {
        case 1:
        case 2:
        case 3:
        case 5:
            moveT += Tortoise.animal.fast;
            break;
        case 6:
        case 7:
            moveT += Tortoise.animal.slide;
            break;
        case 8:
        case 9:
        case 10:
            moveT += Tortoise.animal.slow;
            break;
    }
    switch (step) {
        case 1:
        case 2:
            moveH += hare.animal.sleep;
            break;
        case 3:
        case 5:
            moveH += hare.animal.bigJump;
            break;
        case 6:
            moveH += hare.animal.bigSlide;
            break;
        case 7:
        case 8:
            moveH += hare.animal.jump;
            break;
        case 9:
        case 10:
            moveH += hare.animal.slide;
            break;
    }
    // En caso de que la asignación sea menor al inicio o superior al final se corrigen.
    if (moveT < 0)
        moveT = 0;
    if (moveH < 0)
        moveH = 0;
    if (moveT > 70)
        moveT = 70;
    if (moveH > 70)
        moveH = 70;
    // llamada a la funcion que escribe en el documento
    writeScreen(moveH, moveT);
    cont++;
    // Condicionales que muestran el ganador en caso de haberlo, si no, se llama
    // a la misma función, en caso de carrera completa, o sale de la funcion
    // en caso de la ejecucion paso a paso. Se deshabilitan los botones para que no
    // se siga ejecutanto una vez finalice
    if (moveH >= 70 && moveT >= 70) {
        console.log("Ha sido empate");
        document.getElementById("circuit").innerHTML += "<br> <h1> Es un empate </h1>";
        disableButton();
        return;
    } else if (moveH >= 70) {
        console.log("Ha ganado la liebre");
        document.getElementById("circuit").innerHTML += "<br> <h1> ganó la liebre,...,qué bien!!, yuhu</h1>";
        disableButton();
        return;
    } else if (moveT >= 70) {
        console.log("Ha ganado la tortuga");
        document.getElementById("circuit").innerHTML += "<br> <h1> GANÓ TORTUGA! YEAH!</h1>";
        disableButton();
        return;
    } else if (next != 1) {
        race(0);
    } else
        return;
}

// Escribe en el documento html mediante un bucle que escribe 'X' para empate, 'T' 
// para la tortuga, 'L' para la liebre o '_' para el camino en la posicion correspondiente.
function writeScreen(moveH, moveT) {
    var road = "";
    // Booleano que cambia a True cuando es empate para no repetir caracteres.
    var even = false;
    for (var i = 0; i <= 70; i++) {
        if (moveH == i && moveT == i && !even) {
            road += "X";
            console.warn("OUCH!");
            even = true;
        } else if (moveT == i && !even)
            road += "T";
        else if (moveH == i && !even)
            road += "L";
        if (i < 70)
            road += "_";
    }
    // Escribe en la consola y en el div con id 'circuit'.
    console.log(road);
    document.getElementById("circuit").innerHTML += road + "<br>";
}

// Reinicia los valores de las variables, botones y limpia el div, para una nueva ejecuión.
function resetBoard() {
    cont = 0;
    moveH = 0;
    moveT = 0;
    document.getElementById("circuit").innerHTML = "";
    document.getElementById("btn_sbs").disabled = false;    
    document.getElementById("btn_cont").disabled = false;
}

// Deshabilita los botones de inicio.
function disableButton() {
    document.getElementById("btn_sbs").disabled = true;    
    document.getElementById("btn_cont").disabled = true;    
}