// var div = document.getElementById('ejer1');
function ejer1() {
    var common = "generado desde JS un texto con distintos formato";
    var e1 = "Enlace ";
    var e2 = "Con un tamaño de fuente de 5px ";
    var e3 = "Escriben superindices ";
    var e4 = "Escriben subíndices ";
    var e5 = "Le damos formato cursiva ";
    var e6 = "y por último, algo de color ";
    var e7 = "y por último, algo de color y en cursiva ";
    var texto = "<p>" + e1.concat(common.link("www.google.es")) + "</p>" +
        "<p>" + e2.concat(common.fontsize(0.5)) + "</p>" +
        "<p>" + e3.concat(common.sup()) + "</p>" +
        "<p>" + e4.concat(common.sub()) + "</p>" +
        "<p>" + e5.concat(common.italics()) + "</p>" +
        "<p>" + e6.concat(common.fontcolor("red")) + "</p>" +
        "<p>" + e7.concat(common.fontcolor("red").italics());
    document.getElementById('texto').innerHTML = texto;
}
ejer1();