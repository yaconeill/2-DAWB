
var boton = document.getElementsByName('img');

boton.addEventListener('click', function(){
  if(taza.getAttribute('fill') === "#fff"){
    taza.setAttribute('fill', '#ffb380');    
    taza.nextElementSibling.setAttribute('fill', '#ffb380');
  } else {
    taza.setAttribute('fill', '#fff');    
    taza.nextElementSibling.setAttribute('fill', '#fff');
  }
}, false);