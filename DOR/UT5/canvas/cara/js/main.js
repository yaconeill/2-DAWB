var canvas = document.getElementById('canvas');
// if (canvas.getContext) {
var ctx = canvas.getContext('2d');
canvas.width = 800;
var cont = true;
var speed = 10;
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
        ctx.clearRect(10 + c.x, 10, 120, 120);
    }
}
function move(timestamp) {
    reDraw(true);
    if (c.x < canvas.width - (75 + 50) && cont) 
        c.x += speed;
    else 
        cont = false;
    if (c.x >= 0 && !cont) 
        c.x -= speed;
    else 
        cont = true;    
    reDraw(false);
    requestAnimationFrame(move);
}
requestAnimationFrame(move);