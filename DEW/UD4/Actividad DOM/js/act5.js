function showPic(URLdelaimagen) {
    var divimg = document.getElementById('write');
    var elemento = document.createElement('img');
    elemento.setAttribute('src', URLdelaimagen);
    elemento.id = 'img';
    elemento.width = '500';
    if (divimg.hasChildNodes('img')) {
        var img = document.getElementById('img');
        img.parentNode.removeChild(img);
        // divimg.removeChild(divimg.firstChild)
    }
    divimg.appendChild(elemento);
}