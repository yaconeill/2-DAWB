var movePixels = 10;
var delayMs = 50;
var catTimer = null;

var start = document.getElementById('start-button');
start.addEventListener('click', startCatWalk);
var speed = document.getElementById('speed-button');
speed.addEventListener('click', increaseSpeed);

var stop = document.getElementById('stop-button');
stop.addEventListener('click', function() {
    clearInterval(catTimer);
    movePixels = 10;
    delayMs = 50;
});

function catWalk() {
    var img = document.getElementsByTagName('img')[0];
    var currentLeft = parseInt(img.style.left);
    img.style.left = (currentLeft + movePixels) + 'px';
    if (currentLeft > (window.innerWidth - img.width)) {
        img.style.left = '0px';
    }
}

function startCatWalk() {
    catTimer = window.setInterval(catWalk, delayMs);
}

function increaseSpeed() {
    movePixels += 1;
    delayMs -= 1;
}