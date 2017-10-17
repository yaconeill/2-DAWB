var moveH = 0;
var moveT = 0;
var move = [];
var charH;
var charT;
var charRoad = "_";
var charCross = "X";
// var imgHare = new Image();
var imgHare = 'img/hare.gif';
// var imgTor = new Image();
var imgTor = 'img/tortoise.gif';
var grass = '<img src="img/grass.png" style="width:10px; height: 7px;" />';
charH = '<img src="img/hare.gif" style="width:2%;transform: scaleX(-1);" />';
charT = '<img src="img/tortoise.gif" style="width:2%;" />';
charRoad = grass;
/**
 * Creación del array asociativo con las ropiedades que puedan tener los animales.
 */
var moves = (slp, bJ, bS, j, sld, f, slw) => {
    return ({
        sleep: slp,
        bigJump: bJ,
        bigSlide: bS,
        jump: j,
        slide: sld,
        fast: f,
        slow: slw
    });
}

// animal.prototype.getMovesT = function() {
//     return this.move.fast, this.move.slide, this.move.slow;
// };
// animal.prototype.getMovesH = function() {
//     return this.move.sleep,
//         this.move.bigJump,
//         this.move.bigSlide,
//         this.move.smallJump,
//         this.move.smallJump;
// };

/**
 * Función de paso a paso, que pasa 1 como parámetro para hacer una sola 
 */
function stepByStep() {
    race(1);
}

/**
 * Muestra el texto precarrera para luego llamar a la funcióm que la inicia,
 * se le añade retardo de tiempo para que se visualice mejor.
 */
function preRace(next) {
    // el contador limita a una ejecución la ecritura del texto de cabecera.
    //if (cont == 0) {
    document.getElementById('circuit').innerHTML += '<h2>Preparados</h2>';
    setTimeout("document.getElementById('circuit').innerHTML += '<h2>listos</h2>'", 500);
    setTimeout("document.getElementById('circuit').innerHTML += '<h2>...</h2>'", 1000);
    setTimeout("document.getElementById('circuit').innerHTML += '<h1>Ya!</h1></br>'", 1700);
    setTimeout(race.bind(null, next), 2000);
    // } else
    //     race(next);
}

function random() {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
}

/**
 * Inicia la carrera
 * @param {*} next 
 */
function race(next) {
    // creación de los objetos animal, pasando los valores de sus propiedades,
    // var tor = animal();
    var tortoise = moves(0, 0, 0, 0, -6, 3, 1);
    var hare = moves(0, 9, -12, 1, -2);
    // Genera un número aleatorio
    var step = random();
    // Asigna a las variable globales posT y posH los valores correspondientes
    // segun el número aletario generado.
    switch (true) {
        case step <= 5:
            moveT += tortoise["fast"];
            break;
        case step <= 7:
            moveT += tortoise["slide"];
            break;
        case step <= 10:
            moveT += tortoise["slow"];
            break;
    }
    switch (true) {
        case step <= 2:
            moveH += hare["sleep"];
            break;
        case step <= 5:
            moveH += hare["bigJump"];
            break;
        case step <= 6:
            moveH += hare["bigSlide"];
            break;
        case step <= 8:
            moveH += hare["jump"];
            break;
        case step <= 10:
            moveH += hare["slide"];
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
    writeScreen(next);
    //cont++;
    // Condicionales que muestran el ganador en caso de haberlo, si no, se llama
    // a la misma función, en caso de carrera completa, o sale de la funcion
    // en caso de la ejecucion paso a paso. Se deshabilitan los botones para que no
    // se siga ejecutanto una vez finalice
    if (moveT >= 70 && moveH >= 70) {
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

/**
 * Escribe en el documento html mediante un bucle que escribe 'X' para empate, 'T' 
 * para la tortuga, 'L' para la liebre o '_' para el camino en la posicion correspondiente.
 */
function writeScreen(next) {
    var road = "";
    // Booleano que cambia a True cuando es empate para no repetir caracteres.
    var even = false;
    for (var i = 0; i <= 70; i++) {
        if (moveH == i && moveT == i && !even) {
            road += charCross;
            console.warn("OUCH!");
            even = true;
        } else if (moveT == i && !even)
            road += charT;
        else if (moveH == i && !even)
            road += charH;
        if (i < 70)
            road += charRoad;
    }
    // if (moveH == moveT) {
    //     road = setCharAt(road, moveH, charCross);
    //     console.warn("OUCH!");
    //     even = true;
    // } else {
    //     road = setCharAt(road, moveT, charT);
    //     road = setCharAt(road, moveH, charH);
    // }
    // Escribe en la consola y en el div con id 'circuit'.
    console.log(road);

    document.getElementById("circuit").innerHTML = road + "<br>";
}
/**
 * Reinicia los valores de las variables, botones y limpia el div, para una nueva ejecuión.
 */
function resetBoard() {
    moveH = 0;
    moveT = 0;
    document.getElementById("circuit").innerHTML = "";
    document.getElementById("btn_sbs").disabled = false;
    document.getElementById("btn_cont").disabled = false;
}
/**
 * Deshabilita los botones de inicio.
 */
function disableButton() {
    document.getElementById("btn_sbs").disabled = true;
    document.getElementById("btn_cont").disabled = true;
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}