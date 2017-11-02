// La función cambiar oculta TODOS los contenidos y muestra el de la sección indicada
function cambiar(seccion) {
    var idContemido = 'c' + seccion;
    var idOpcion = 'o' + seccion;
    var divCont = document.getElementById(idContemido);
    var divOpc = document.getElementById(idOpcion);
    changeOption();
    hideElements();
    divOpc.setAttribute('class', 'opcion seleccionada');
    divCont.setAttribute('class', 'contenido visible');
}

function hideElements() {
    var portada = document.getElementById('cPortada');
    var nacional = document.getElementById('cNacional');
    var internacional = document.getElementById('cInternacional');
    var deportes = document.getElementById('cDeportes');
    portada.setAttribute('class', 'contenido oculto');
    nacional.setAttribute('class', 'contenido oculto');
    internacional.setAttribute('class', 'contenido oculto');
    deportes.setAttribute('class', 'contenido oculto');
}

function changeOption() {
    var portada = document.getElementById('oPortada');
    var nacional = document.getElementById('oNacional');
    var internacional = document.getElementById('oInternacional');
    var deportes = document.getElementById('oDeportes');
    portada.setAttribute('class', 'opcion no-seleccionada');
    nacional.setAttribute('class', 'opcion no-seleccionada');
    internacional.setAttribute('class', 'opcion no-seleccionada');
    deportes.setAttribute('class', 'opcion no-seleccionada');
}