/**
 * Ejercicio 1
 */
function checkCookies() {
    var countVisit = getCookie("contador");
    var user = getCookie("user");
    var d = new Date();

    if (countVisit == null) {
        countVisit = 1;
        setCookie("contador", countVisit, 30);
    } else {
        countVisit++;
        setCookie("contador", countVisit, 30);
        var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }
    if (user == null) {
        user = prompt("Introduce tu nombre: ");
        setCookie("user", user, 30);
    } else
        document.getElementById("ejer1").innerHTML = "Bienvenido " + user + " " + countVisit + " " + time;
}

/**
 * Ejercicio 2
 */
function SetColor() {
    var color = getCookie("color");
    //var visitor = getCookie("visitor");
    if (color == null) {
        //visitor = prompt("Introduce tu nombre: ");
        color = prompt("Introduce tu color de fondo favorito(en inglés): ");
        //setCookie("visitor", visitor, 30);
        setCookie("color", color, 30);
        document.getElementsByTagName("body")[0].style.backgroundColor = color;
    }
}

function getColor() {
    var color = getCookie("color");
    if (color != null)
        document.getElementsByTagName("body")[0].style.backgroundColor = color;
}

/**
 * Ejercicio 3
 */
function specialVariables() {

}

/**
 * Ejercicio 4 guarda el usuario durante 1 min
 */
function cookieOneMinute() {
    var user = getCookie("user");
    if (user == null) {
        user = prompt("Introduce tu nombre: ");
        setCookieMaxAge("user", user);
    } else
        alert("hola " + user + ", ya estás logueado.");
}

/**
 * Ejercicio 5
 * Para comprobar que se borra hacemos un getCookie y si nos devuelve null se he borrado correctamente
 * entonces podemos volver a cargar la pagina y vemos que vuelve a pedir la eleccion de color
 */
function deleteCookieEjer2() {
    var ejer2Cookie = getCookie("color");
    deleteOneCookie("color");
}

// Eliminar una Cookie determinada
var deleteOneCookie = function(key) {
    console.log("Se ha eliminado la Cookie: " + key);
    return document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 *  Cookies functions
 */
function setCookieMaxAge(name, value) {
    // Max Age 1 min
    document.cookie = name + "=" + encodeURIComponent(value) + ";max-age=" + 60 + ";";
    // Expire 1 min
    // var expdate = new Date();
    // expdate.setTime(expdate.getTime() + 60 * 1000);
    // document.cookie =  name + "=" + encodeURIComponent(value) + ";expires=" + expdate.toGMTString();
}

function getCookie(name) {
    var index = document.cookie.indexOf(name + "=");
    if (index == -1)
        return null;
    index = document.cookie.indexOf("=", index) + 1;
    var endstr = document.cookie.indexOf(";", index);
    if (endstr == -1)
        endstr = document.cookie.length;
    return decodeURIComponent(document.cookie.substring(index, endstr));

}

function setCookie(name, value, days) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expdate.toUTCString();
}

function deleteCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var spcook = cookies[i].split("=");
        document.cookie = spcook[0] + "=;expires=Thu, 21 Sep 1979 00:00:01 UTC;";
    }
}