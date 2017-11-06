var button = document.getElementById('lib-button');
button.addEventListener('click', makeMadLib);

function makeMadLib() {
    var noun = document.getElementById('noun').value;
    var adjective = document.getElementById('adjective').value;
    var name = document.getElementById('name').value;
    var div = document.getElementById('story');
    var text = document.createTextNode(`${noun} realmente le gusta ${name} de color ${adjective}.`);
    var p = document.createElement('p');
    p.appendChild(text);
    div.appendChild(p);
}