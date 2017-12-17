function abrir() {
  let cerrar = document.querySelectorAll(".mensaje");
  cerrar[0].style.marginLeft = "0%";
}

function cerrar() {
  let cerrar = document.querySelectorAll(".mensaje");
  cerrar[0].style.marginLeft = "-100%";
}

let stars = document.getElementsByName('rating');
stars.forEach(function(i,e) {
  stars[e].addEventListener('click', function () {
    alert('Has puntuado con ' + this.nextElementSibling.title);
  }, false);
});