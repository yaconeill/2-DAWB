function libIt() {
    var storyDiv = document.getElementById("story");
    var name = document.getElementById("name").value;
    var adjective = document.getElementById("adjective").value;
    var noun = document.getElementById("noun").value;
    localStorage.setItem('frases', JSON.stringify({
        name: name,
        adjective: adjective,
        noun: noun
    }));

    var clave = JSON.parse(localStorage.getItem('frases'));

    var nameLocal = clave.name;
    var adjLocal = clave.adjective;
    var nounLocal = clave.noun;
    storyDiv.innerHTML += nameLocal + " married a " + adjLocal + " " + nounLocal + "... So weird!<br>";
}

function saveForm(thisObject) {
    var value = thisObject.value;
    localStorage.setItem(thisObject.id, value);
}

function loadForm() {
    document.getElementById("name").value = localStorage.getItem("name");
    document.getElementById("adjective").value = localStorage.getItem("adjective");
    document.getElementById("noun").value = localStorage.getItem("noun");
}

var libButton = document.getElementById('lib-button');
libButton.addEventListener('click', libIt);