// selections(); 
// goThroughDOM(); 
// manipulation(); 
// suggestion(); 
// tabbedBrowsing();
// showHiddenText(); 
dropDown();
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
function dropDown() {
    /**
     * Al pasar el puntero del ratón por encima de un ítem del menú, se debe
     * mostrar su submenú en caso que exista;
     */
    /**
     * Al no estar más encima de un ítem, el submenú se debe ocultar.
     */

    $('#nav > li').hover(function () {
        $(this).find('ul').show();
        $(this).addClass('hover');
    },function () {
        $(this).find('ul').hide();
        $(this).removeClass('hover');
    } );
    

}

// #endregion
// #region - Crear un slideshow
function slideshow() {
    /**
     * Mover el elemento #slideshow a la parte superior de la página;
     */
    var slideshow = $('#slideshow');
    slideshow.prependTo('#main');

    /**
     * Escribir un código que permita mostrar los ítems de forma cíclica,
     * mostrando un ítem por unos segundos, luego ocultándolo con un
     * efecto fade out y mostrando el siguiente con un efecto fade in;
     */
    
    slideshow.children().hide();

    var images = slideshow.find('img');
    for (let i = images.length - 1; i >= 0; i--) {
        var input = $(`<input type="radio" name="img" id="${i}"/>`);
        slideshow.after(input);
    }
    var checkBox = $('[name=img]');
    checkBox.each(function () {
        $(this).click(function () {
            var id = $(this).attr('id');
            for (let i = 0; i < checkBox.length; i++) {
                if(i != parseInt(id))
                    $('#slideshow').find('img').eq(parseInt(i)).parent().fadeOut().hide();
                else
                    $('#slideshow').find('img').eq(parseInt(id)).parent().fadeIn().show();
            }            
        });
    });
    checkBox.first().attr('checked', 'checked');

    // setInterval(function() {
    //     checkBox.each(function () {
    //         if($(this).get()[0].checked && $(this).next().is('input')){
    //             $(this).next().attr('checked','checked');
    //         }
    //     });
    //     // checkBox.eq(idx).attr('checked', 'checked');
    // },2000);


        setInterval(function() {
        $('#slideshow > li:first').fadeOut().hide().next('li').
        fadeIn().end().appendTo(slideshow);
    },2000);


}

// #endregion