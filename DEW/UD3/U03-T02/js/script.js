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
    //document.getElementById('ejer1').innerHTML = texto;
}
ejer1();

var father;

function ejer2() {
    father = window.open('pages/padre.html', 'Original', 'width=550,height=650');
}

function ejer3() {
    var color = prompt("Introducir un color en en formato hexadecimal.");
    var hex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
    if (hex.test(color)) {
        document.getElementById('ejer3').innerHTML = "<p>Este es el color elegido<p>";
        document.getElementsByTagName('body')[0].style.backgroundColor = color;
    } else {
        document.getElementById('ejer3').innerHTML = "<h1>El color elegido no está controlado</h1>";
        document.getElementsByTagName('body')[0].style.backgroundColor = "white";
    }
}

function ejer4() {
    var myWindow;
    myWindow = window.open('', 'Nombre', 'width=350,height=250');
    setInterval(function() {
        var text = "Aymediacoán Mauleón";
        var colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#6666ff",
            "#00cc00", "#cc6600", "#cc6699", "#99ffcc", "#666699"
        ];
        var color = colors[Math.floor(Math.random() * colors.length)];
        myWindow.document.writeln('<p>' + text.fontcolor(color) + '</p>');
    }, 5000);
}

function ejer5() {
    var w;
    w = window.open('pages/ejer5.html', '', 'width=550,height=650')
}

function getHour() {
    var now = new Date;
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    var time = hour + ':' + minutes + ':' + seconds;
    document.getElementById('time').innerHTML = '<h1>' + time + '</h1>';
    if (hour >= 5 && hour < 12) {
        document.getElementById('msg').innerHTML = "buenos días";
        document.getElementById('img').src = 'img/salidasol.jpg';
    } else if (hour >= 12 && hour < 15) {
        document.getElementById('msg').innerHTML = "Mediodía";
        document.getElementById('img').src = 'img/bocata.jpg';
    } else if (hour >= 18 && hour < 22) {
        document.getElementById('msg').innerHTML = "Hora de Cenar";
        çdocument.getElementById('img').src = 'img/mesapuesta.jpg';
    }
}

function ejer6() {
    var timer = setInterval('getHour()', 1000);
}
ejer6();