var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
canvas.width = 250;
canvas.height = 250;

function reloj() {
  ctx.clearRect(0, 0, 250, 250);
  ctx.save();
  ctx.translate(125, 125);
  var now = new Date();
  var sec = now.getSeconds();
  ctx.rotate(sec * Math.PI / 30);
  //Dibujar la manecilla con un líneas
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(-28, -40);
  ctx.lineTo(80, 79);
  ctx.lineTo(79, 80);
  ctx.lineTo(-40,-28);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  //Dibujar el centro de la manecilla con una línea
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(80, 80);
  ctx.stroke();

  //Dibujar el eje de las manecillas (centro del reloj)
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'black';
  ctx.lineWidth = 1;
  ctx.arc(0, 0, 4, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  window.requestAnimationFrame(reloj);
}
window.requestAnimationFrame(reloj);