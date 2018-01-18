function cambiar(e) {
    if (e.srcElement.getAttribute("estado") == "libre") {

        if ($(e.srcElement).hasClass("selected")) {
            $(e.srcElement).removeClass("selected");
            $(e.srcElement).addClass("noSelected");
        } else {
            $(e.srcElement).addClass("selected");
            $(e.srcElement).removeClass("noSelected");
        }
    }
}


var cont = document.getElementById("contenedor");

$(document).ready(function () {
    for (let index = 0, x = -350; index < 5; index++, x += 300) {
        for (let index = 0, y = -100; index < 5; index++, y += 300) {
            var svgns = "http://www.w3.org/2000/svg";
            var xlinkns = "http://www.w3.org/1999/xlink";
            var estado = "";

            index % 2 == 0 ? estado = "ocupado" : estado = "libre";

            var use = document.createElementNS(svgns, "use");
            use.setAttributeNS(xlinkns, "href", "#copa");
            use.setAttribute("x", x);
            use.setAttribute("y", y);

            use.setAttribute("estado", estado);
            estado == "ocupado" ? use.setAttribute("class", "copa ocupado") : use.setAttribute("class", "copa noSelected");
            use.addEventListener("click", cambiar, false);

            cont.appendChild(use);
        }
    }

})