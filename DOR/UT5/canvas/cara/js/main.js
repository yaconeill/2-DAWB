var canvas = document.getElementById('canvas');
// if (canvas.getContext) {
var ctx = canvas.getContext('2d');
var cont = true;
var c = {
    x: 0
};
function reDraw(erase) {
    ctx.beginPath();
    if (!erase) {
        ctx.strokeStyle = 'black';
        ctx.arc(75 + c.x, 75, 50, 0, Math.PI * 2, true);
        ctx.moveTo(110 + c.x, 75);
        ctx.arc(75 + c.x, 75, 35, 0, Math.PI, false);
        ctx.moveTo(65 + c.x, 65);
        ctx.arc(60 + c.x, 65, 5, 0, Math.PI * 2, true);
        ctx.moveTo(95 + c.x, 65);
        ctx.arc(90 + c.x, 65, 5, 0, Math.PI * 2, true);
        ctx.stroke();
    } else {
        ctx.fillStyle = "white";
        ctx.fillRect(10 + c.x, 10, 120, 120);
    }
}

function move() {
    reDraw(true);
    if (c.x < canvas.width - (75 + 50) && cont) 
        c.x += 1;
    else 
        cont = false;
    if (c.x >= 0 && !cont) 
        c.x -= 1;
    else 
        cont = true;    
    reDraw(false);
}
setInterval(move, 10);