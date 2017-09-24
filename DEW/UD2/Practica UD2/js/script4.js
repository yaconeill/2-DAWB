// 4.	Se deben añadir 5 imágenes a la página web para que al hacer click sobre ellas
//     se muestre un mensaje como el siguiente: “Has hecho click sobre la imagen número 1”,
//     “Haz hecho click sobre la imagen número 2”, etc
function clickImages(img) {
    alert("Has hecho click sobre la imagen número " + (img.id).substr(3) + " - " + img.alt);
}