var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
var cont = true;
var auto = false;
var speed = 3;
var frameId = 0;
var c = {
    x: 0
};
window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case 'Enter':
            automatic();
            break;
        case 'ArrowLeft':
            moveSides(false);
            break;
        case 'ArrowRight':
            moveSides(true);
            break;
    }
}, true);

function automatic() {
    !auto ? auto = true : auto = false;
    if (!auto) {
        requestAnimationFrame(move);
    }
}

function moveSides(right) {
    if (auto) {
        if (right)
            c.x += speed;
        else
            c.x -= speed;
        requestAnimationFrame(move);
    }
}

function reDraw(erase) {
    ctx.beginPath();
    if (!erase) {
        ctx.strokeStyle = 'black';
        ctx.arc(55 + c.x, 75, 50, 0, Math.PI * 2, true);
        ctx.moveTo(90 + c.x, 75);
        ctx.arc(55 + c.x, 75, 35, 0, Math.PI, false);
        ctx.moveTo(45 + c.x, 65);
        ctx.arc(40 + c.x, 65, 5, 0, Math.PI * 2, true);
        ctx.moveTo(75 + c.x, 65);
        ctx.arc(70 + c.x, 65, 5, 0, Math.PI * 2, true);
        ctx.stroke();
    } else {
        ctx.clearRect(0 + c.x, 10, 120, 120);
    }
}

function move() {
    reDraw(true);
    if (!auto) {
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
    reDraw(false);
}
requestAnimationFrame(move);