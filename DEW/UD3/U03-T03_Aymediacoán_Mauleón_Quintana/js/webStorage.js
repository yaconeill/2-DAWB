// var cntLikes = document.getElementById('countLikes');
// cntLikes.addEventListener('click', countLikes);

function countLikes() {
    var storyDiv = document.getElementById("countLikes");
    var likes = localStorage.getItem('numlikes');
    if (localStorage['numlikes'] != undefined)
        likes++;
    else
        likes = 1;
    localStorage.setItem('numlikes', likes);
    storyDiv.innerHTML = likes + " personas han pulsado me gusta.";
}

/**
 * Llamada ahora caigo
 */
function startGame() {
    var w;
    w = window.open('pages/game.html', 'startGame', 'scrollbars=no, resizable=no,width=620,height=360');
}