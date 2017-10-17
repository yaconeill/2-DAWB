/**
 * Declaration of global variables
 */
// Save the position of each animal
var moveH = 0;
var moveT = 0;
// Contain the character that will be printed
var charH;
var charT;
var charRoad;
var charCross;
// This variable is used to run the race with an interval between movements.
var live;

/**
 * Function that creates an object with the allowed movements.
 */
function animal(slp, bJ, bS, j, sld, f, slw) {
    this.moves = {
        sleep: slp,
        bigJump: bJ,
        bigSlide: bS,
        jump: j,
        slide: sld,
        fast: f,
        slow: slw
    };
}

/**
 * Function that calls race() everytime the button is pressed. The parameter
 * is 1 to show line by line.
 */
function stepByStep() {
    race(1);
}

/**
 * Print on screen the countdown before the race, call the function race with a delay.
 */
function preRace(next) {
    document.getElementById('circuit').innerHTML += '<h2>Preparados</h2>';
    setTimeout("document.getElementById('circuit').innerHTML += '<h2>listos</h2>'", 500);
    setTimeout("document.getElementById('circuit').innerHTML += '<h2>...</h2>'", 1000);
    setTimeout("document.getElementById('circuit').innerHTML += '<h1>Ya!</h1></br>'", 1700);
    setTimeout(race.bind(null, next), 1750);
}

/**
 * Creates a random number between 1 and 10.
 */
function random() {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
}

/**
 * It calls the function race repeatedly until a win or a tie.
 */
function onLive() {
    document.getElementById("oneLine").checked = true;
    disableButton();
    live = setInterval(race.bind(null, 1), 400);
}

/**
 * It runs the race, the parameter given is used to determine if it runs in loop
 * or just one time.
 */
function race(next) {
    // Disables the checkbox so it does not interfere with the execution.
    document.getElementById("oneLine").disabled = true;
    document.getElementById("withShape").disabled = true;

    // Creates objects type animal and gives values to the movements
    var tortoise = new animal(0, 0, 0, 0, -6, 3, 1);
    var hare = new animal(0, 9, -12, 1, -2);

    // Call the funtion random and asign a value to the variable step.
    var step = random();

    // Asign to the global variables moveT & moveH the movement to make according to
    // the number randomly generated.
    switch (true) {
        case step <= 5:
            moveT += tortoise.moves["fast"];
            break;
        case step <= 7:
            moveT += tortoise.moves["slide"];
            break;
        case step <= 10:
            moveT += tortoise.moves["slow"];
            break;
    }
    switch (true) {
        case step <= 2:
            moveH += hare.moves["sleep"];
            break;
        case step <= 5:
            moveH += hare.moves["bigJump"];
            break;
        case step <= 6:
            moveH += hare.moves["bigSlide"];
            break;
        case step <= 8:
            moveH += hare.moves["jump"];
            break;
        case step <= 10:
            moveH += hare.moves["slide"];
            break;
    }

    // Adjustment in case the movement exceed the limits of the road.
    if (moveT < 0)
        moveT = 0;
    if (moveH < 0)
        moveH = 0;
    if (moveT > 70)
        moveT = 70;
    if (moveH > 70)
        moveH = 70;

    // Call the function that write on screen.
    writeScreen(next);

    // Check if someone reach the finish line or the race continues. If the parameter is 0
    // it means, that the race will call itself until there is a winner and if it's 1 it means,
    // that a click will be needed to continue.
    if (moveT >= 70 && moveH >= 70) {
        result("Ha sido empate");
        return;
    } else if (moveH >= 70) {
        result("ganó la liebre,...,qué bien!!, yuhu");
        return;
    } else if (moveT >= 70) {
        result("GANÓ TORTUGA! YEAH!");
        return;
    } else if (next != 1) {
        race(0);
    } else
        return;
}

/**
 * It writes the characters inside a div('X' for crosspath, 'L' for hare and 'T' for tortoise)
 */
function writeScreen(next) {
    var road = "";

    // Saves the status of the checkbox.
    var oneLine = document.getElementById("oneLine").checked;
    var withShape = document.getElementById("withShape").checked;

    // Function that adds graphics to the race.
    setStyle(withShape);

    // Boolean that becames true when the animals are in the same position.
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
    // Writes in both, console and div. Depending on the status of oneLine
    // and next, will overwrite the lines or will be appended.
    if (!withShape)
        console.log(road);
    if (next == 1 && oneLine)
        document.getElementById("circuit").innerHTML = road + "<br>";
    else
        document.getElementById("circuit").innerHTML += road + "<br>";
}

/**
 * Set the value of the characters or replace it with images.
 */
function setStyle(withShape) {
    charRoad = "_";
    charCross = "X";
    charH = "L";
    charT = "T";

    // If it's checked character will be replaced with images.
    if (withShape) {
        charRoad = '<img src="img/grass.png" id="road" />';
        charH = '<img src="img/hare.gif" id="hare" />';
        charT = '<img src="img/tortoise.gif" id="tortoise" />';
        charCross = '<img src="img/ouch.png" id="cross" />';
    }
}

/**
 * Reset the variable values and content of the div, for another execution.
 */
function resetBoard() {
    moveH = 0;
    moveT = 0;
    document.getElementById("circuit").innerHTML = "";
    document.getElementById("btn_sbs").disabled = false;
    document.getElementById("btn_cont").disabled = false;
    document.getElementById("btn_live").disabled = false;
    document.getElementById("withShape").disabled = false;
    document.getElementById("oneLine").disabled = false;
    document.getElementById("oneLine").checked = false;
    document.getElementById("withShape").checked = false;
    clearInterval(live);
}

/**
 * Disable the buttons and clear the setInterval.
 */
function disableButton() {
    // It clears setInterval to stop the loop when there is a winner.
    clearInterval(live);

    document.getElementById("btn_sbs").disabled = true;
    document.getElementById("btn_cont").disabled = true;
    document.getElementById("btn_live").disabled = true;
}
/**
 * Prints the result on screen
 */
function result(text) {
    console.log(text);
    document.getElementById("circuit").innerHTML += "<br> <h1> " + text + "</h1>";
    disableButton();
}