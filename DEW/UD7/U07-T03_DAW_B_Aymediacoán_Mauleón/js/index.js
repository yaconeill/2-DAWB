/**
 * 1- Seleccionar todos los elementos div que poseen la clase “media”.
 */
var media = $('div').find('.media');
console.log(media);
/**
 * 2- Contar el número de opciones del menú de navegación superior de 
 * la página y mostrar su nombre por consola.
 */

console.log($('.nav').children().length);

/**
 * 3- Seleccionar el primer elemento p de la clase lead y mostrar su contenido html.
 */

console.log($('.lead').first('p').text());

 /**
  * 4- Cambiar las imágenes de la parte final del documento que tienen justo a continuación 
 * un <h4> con el texto "Start Bootstrap..." por otras imágenes diferentes. En este punto se 
 * debe usar $.fn.each.
  */

$(".media").each(function () {
    $(this).find("img").attr("src", "images/-text.png");
});

/**
 * 5- Posicionarte en el botón del formulario y a partir de ahí añadir 
 * una imagen justo antes del formulario que use la clase "img-responsive".
 */

$('form').find('button').parent().before($('<img src="http://lorempixel.com/64/64/" class="img-responsive" />'));

 /**
  * 6- Eliminar el elemento div que está contenido en el último div con clase .media.
  */

//$('div.media').last('div').remove();

 /**
  * 7- Seleccionar la primera lista de categorías y luego añadir un nuevo elemento.
  */

$('.list-unstyled').first().append($('<li>Nuevo</li>'));

/**
 * 8- Copiar la imagen que está al principio del documento en un div que estará ubicado 
 * justo antes del footer.
 */
$('footer').before($('<div></div>'));
$('img').first().clone().appendTo($('footer').prev());

/**
 * 9- Eliminar los elementos pares de la segunda lista de categorías y al resto de elementos 
 * establecerle una clase css que hayas creado o bien una de las existentes.
 */

$('.list-unstyled').last().children('li:even').remove();

/**
 * 10- Hay que añadir interactividad al párrafo que está justo a continuación del h2 
 * del contenido. Es decir, al hacer click sobre el texto de la cabecera h2 se 
 * debe ocultar el párrafo con un efecto de deslizamiento y si volvemos a hacer 
 * click sobre el encabezado volveremos a mostrar el texto nuevamente.
 */
var h2 = $('.container').find('h2');
h2.on('click', function () {
    if(h2.next('div').is(":visible"))
        h2.next('div').slideUp().hide('slow');
    else
        h2.next('div').slideDown().show('slow');
});

/**
 * 11- Añadir una validación al botón del formulario que existe en al página para 
 * dejar sugerencias de manera que al hacer click sobre el botón, se compruebe 
 * si el usuario ha escrito un comentario. Si lo ha hecho, no haremos nada, 
 * y si no ha introducido ningún comentario le mostraremos un alert al usuario 
 * indicando que debe introducir un mensaje.
 */

$('form').find('button').on('click', function () {
    if($('textarea').val().length == 0)
        alert('Debe introducir un mensaje');
})