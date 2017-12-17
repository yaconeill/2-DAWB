// selections(); goThroughDOM(); manipulation(); suggestion(); tabbedBrowsing();
// showHiddenText(); dropdown();
slideshow();
// #region - Selecciones
function selections() {
    /**
     * Seleccionar todos los elementos div que poseen la clase “module”.
     */

    var module = $('div').find('.module');
    console.log(module);

    /**
     * Especificar tres selecciones que puedan seleccionar el tercer ítem de la lista desordenada #myList. ¿Cuál es el mejor para utilizar? ¿Porqué?
     * Es mejor utilizar el tercero, porque es más eficiente y especifico
     */

    var modoUno = $('#myList li:nth-child(3)');
    console.log(modoUno);

    var modoDos = $('#myList').children('li:nth-child(3)');
    console.log(modoDos);

    var modoTres = $('#myList')
        .children('li')
        .eq(2);
    console.log(modoTres);

    /**
     * Seleccionar el elemento label del elemento input utilizando un selector de atributo.
     */

    var label = $('label').attr('for', 'q');
    console.log(label);

    /**
     * Averiguar cuantos elementos en la página están ocultos (ayuda: .length).
     */

    var ocultos = $('body')
        .find(':hidden')
        .length;
    console.log(ocultos);

    /**
     * Averiguar cuantas imágenes en la página poseen el atributo alt.
     */

    var imgAlt = $('img')
        .attr('alt', document)
        .length;
    console.log(imgAlt);

    /**
     * Seleccionar todas las filas impares del cuerpo de la tabla.
     */

    var rows = $('#fruits')
        .find('tbody')
        .children('tr:odd');
    console.log(rows);
}
// #endregion 
// #region - Recorrer el DOM
function goThroughDOM() {
    /**
     * Seleccionar todas las imágenes en la página; registrar en la consola el atributo alt de cada imagen.
     */

    var img = $('img');
    img.each(function (i, e) {
        console.log($(e).attr('alt'));
    });

    /**
     * Seleccionar el elemento input, luego dirigirse hacia el formulario y añadirle una clase al mismo.
     */

    var input = $('#search').find('input');
    input.addClass('clase1');

    /**
     * Seleccionar el ítem que posee la clase “current” dentro de la lista #myList y remover dicha clase
     * en el elemento; luego añadir la clase “current” al siguiente ítem de la lista.
     */

    var element = $('#myList').find('.current');
    element
        .removeClass('current')
        .next()
        .addClass('current');

    /**
     * Seleccionar el elemento select dentro de #specials; luego dirigirse hacia el botón submit.
     */

    var submit = $('#specials')
        .children('form')
        .find('[type=submit]');
    console.log(submit);

    /**
     * Seleccionar el primer ítem de la lista en el elemento #slideshow; añadirle la clase
     * “current” al mismo y luego añadir la clase “disabled” a los elementos hermanos.
     */

    var slideshow = $('#slideshow')
        .first()
        .children('li')
        .first();
    slideshow
        .addClass('current')
        .siblings()
        .addClass('disable');
}
// #endregion 
// #region - Manipulación
function manipulation() {
    /**
     * Añadir 5 nuevos ítems al final de la lista desordenada #myList. Ayuda: for (var i = 0; i<5; i++) { ... }
     */
    var myList = $('#myList');
    var myListSize = ('#myList').length;
    for (var i = myListSize; i < myListSize + 5; i++) {
        var element = $(`<li>List item ${i + 1}</li>`);
        myList.append(element);
    }

    /**
     * Remover los ítems impares de la lista.
     * even es par, pero el primer elemento empieza en 0
     */

    $('#myList')
        .find('li:even')
        .remove();

    /**
     * Añadir otro elemento h2 y otro párrafo al último div.module.
     */

    var lastModule = $('div')
        .find('.module')
        .last();
    var h2 = $('<h2>Nuevo H2</h2>');
    var p = $('<p>Nuevo p</p>');
    lastModule.append(h2);
    lastModule.append(p);

    /**
     * Añadir otra opción al elemento select; darle a la opción añadida el valor Wednesday.
     */

    var select = $('select[name=day]');
    var value = 'Wednesday';
    var option = $(`<option value="${value}">${value}</option>`);
    select
        .children('option:nth-child(3)')
        .after(option);

    /**
     * Añadir un nuevo div.module a la página después del último; luego añadir una copia de
     * una de las imágenes existentes dentro del nuevo div.
     */
    var newModule = $('<div class="module"></div>');
    var prueba = lastModule.after(newModule);
    var lastNewModule = $('div')
        .find('.module')
        .last();
    $('img[alt=fruit]')
        .clone()
        .appendTo(lastNewModule);
}
// #endregion 
// #region - Crear una sugerencia
function suggestion() {
    /**
     * Establecer el valor del elemento input igual al valor del elemento label;
     */
    var label = $('label');
    var input = $('input[type=text]');
    input.val(label.text());

    /**
     * Añadir la clase hint al elemento input;
     */

    input.addClass('hint');

    /**
     * Remover el elemento label;
     */

    label.remove();

    /**
     * Vincular un evento focus en el input para eliminar el texto de sugerencia y
     * la clase hint;
     */

    input.on('focus', function () {
        $(this)
            .val('')
            .removeClass('hint');
    });

    /**
     * Vincular un evento blur en el input para restaurar el texto de sugerencia y
     * la clase hint en caso que no se haya ingresado algún texto.
     */

    input.on('blur', function () {
        $(this)
            .val(label.text())
            .addClass('hint');
    });
}

// #endregion
// #region - Navegación por pestañas
function tabbedBrowsing() {
    /**
     * Ocultar todos los elementos div.module;
     */
    var module = $('.module');
    module.hide();

    /**
     * Crear una lista desordenada antes del primer div.module para utilizar como pestañas;
     */
    var list = $('<ul id="toggle"></ul>');
    module
        .first()
        .before(list);

    /**
     * Interactuar con cada div utilizando $.fn.each. Por cada uno, utilizar el texto del
     * elemento h2 como el texto para el ítem de la lista desordenada;
     */
    var ul = $('#toggle');
    module.each(function (i, e) {
        var element = $(`<li>${$(e).find('h2').text()}</li>`);
        ul.append(element);
    });

    /**
     * Vincular un evento click a cada ítem de la lista de forma que:
     *      Muestre el div correspondiente y oculte el otro;
     *      Añada la clase current al ítem seleccionado;
     *      Remueva la clase current del otro ítem de la lista;
     */

    ul.on('click', 'li', function () {
        var div = $(this).text();
        var thisModule = $(`#${div.toLowerCase()}`);
        thisModule.show();
        thisModule.addClass('current');
        module.each(function (i, e) {
            if ($(e).find('h2').text() !== div) {
                $(e).removeClass('current');
                $(e).hide();
            }
        });
    });

    /**
     * Finalmente, mostrar la primera pestaña.
     */

    module
        .first()
        .show();
}

// #endregion
// #region - Mostrar texto oculto
function showHiddenText() {
    /**
     * Al hacer click en alguno de los titulares del div #blog, se debe
     * mostrar el párrafo correspondiente con un efecto de deslizamiento;
     */

    var blog = $('#blog');
    blog.on('click', 'h3', function () {
        $(this)
            .next()
            .show('slow');
    });

    /**
     * Al hacer click en otro titular, se debe ocultar el párrafo mostrado
     * con un efecto de deslizamiento y mostrar nuevamente el párrafo
     * correspondiente también con un efecto de deslizamiento. Ayuda:
     * No se olvide de utilizar el selector :visible.
     */
    blog.on('click', 'h3', function () {
        $(this)
            .next()
            .show('slow');
        aTag = $(this).find('a');
        aTag.attr('href', `#${aTag.text().substr(-1)}`);
        blog
            .find('li')
            .each(function (i, e) {
                eachText = $(e)
                    .first()
                    .find('a')
                    .text();
                if (aTag.text() !== eachText) 
                    $(e).find('p').hide('slow');
                }
            );
    });
}

// #endregion
// #region - Menú desplegable
function dropdown() {
    /**
     * Al pasar el puntero del ratón por encima de un ítem del menú, se debe
     * mostrar su submenú en caso que exista;
     */

    var menu = $('#nav');
    $('#nav li:nth-child(3)').hover(function () {
        $(this)
            .find('ul')
            .show();
    });
    /**
     * Al no estar más encima de un ítem, el submenú se debe ocultar.
     */

}

// #endregion
// #region - Crear un slideshow
function slideshow() {
    /**
     * Mover el elemento #slideshow a la parte superior de la página;
     */

    $('#slideshow').insertAfter('#header');

    /**
     * Escribir un código que permita mostrar los ítems de forma cíclica,
     * mostrando un ítem por unos segundos, luego ocultándolo con un
     * efecto fade out y mostrando el siguiente con un efecto fade in;
     */

    // var slideshow = $('#slideshow').find('li');
    // slideshow.each(function (i, e) {
    //     $(e).hide();
    // });
    // $(slideshow).first().fadeIn('slow');

    // declaramos slider como objeto javascript...
    var slider = {};

    // Declarando el id para buscar el elemento "ul":
    slider.initQuery = '#slideshow';

    // declarando variables iniciales...
    slider.slider = $(slider.initQuery + " ul,ul" + slider.initQuery); // seleccionamos el "ul" con jquery
    slider.slides = slider.slider.find('li'); // seleccionamos cada uno de sus "li"
    slider.number = slider.slides.length; // Contamos el numero de "li" y por tanto slides que tenemos
    slider.actual = 0; // marcado para saber que slide estamos viendo, actualmente la primera, o sea la 0
    slider.height = 0; // altura del slider... luego la calcularemos
    slider.width = 0; // anchura del slider... luego la calcularemos

    // buscando ancho y alto de <li> máximos para calcular altura y anchura del slider...
    for (i = 0; i < slider.number; i++) {
        var w = $(slider.slides[i]).width();
        var h = $(slider.slides[i]).height();
        slider.height = (h > slider.height) ? h : slider.height;
        slider.width = (w > slider.width) ? w : slider.width;
    }

    // formateando el css del <ul> contenedor, la caja del slider...
    slider
        .slider
        .css({overflow: "hidden", width: slider.width, height: slider.height, position: 'relative'});

    // colocando en posición absoluta todos los <li> del slider, para poder ir
    // haciendo las transiciones...
    for (var i = 0; i < slider.number; i++) {
        var sl = $(slider.slides[i]);
        sl.attr('class', sl.attr('class') + " slider-slide-" + i);
        sl.css({
            position: 'absolute',
            left: slider.width * i
        });
    }

    // función para moverse a un slide concreto...
    slider.go = function (where) {
        if (where == 'next') {
            slider.actual = (slider.actual < slider.number - 1) ? slider.actual * 1 + 1 : 0;
        } else if (where == 'prev') {
            slider.actual = (slider.actual > 0) ? slider.actual - 1 : slider.number - 1;
        } else {
            slider.actual = where;
        }

        for (var i = 0; i < slider.number; i++) {
            var sl = $(slider.slides[i]);
            sl.animate({
                left: slider.width * (i - slider.actual)
            }, 2000);
        }
    };

    var autoSlider = setInterval(function () {
        slider.go('next');
    },3000);
    /**
     * Una vez llegado al último ítem de la lista, comenzar de nuevo con el primero;
     */

}

// #endregion