Taza = function (id, x, y, selected) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.selected = selected;
}
var tazaColl = [];
var jsonTransfer = data;

tazaColl = JSON.parse(localStorage.getItem('tazas'));
if (tazaColl == null) {
    transferData();
} else if (tazaColl.length == 0) {
    transferData();
}

function transferData() {
    tazaColl = [];
    jsonTransfer.forEach(function (e) {
        tazaColl.push(e);
    });
}

var svgns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";
var g = document.getElementsByTagName('g')[0];
deleteTreeElements(g, false)

tazaColl.forEach(function (e) {
    var use = document.createElementNS(svgns, "use");
    use.setAttribute("id", e.id);
    use.setAttribute("class", e.selected);
    use.setAttribute("x", e.x);
    use.setAttribute("y", e.y);
    use.setAttributeNS(xlinkns, "xlink:href", "#taza");
    g.appendChild(use);
});

$('use').on('click', function () {
    if ($(this).attr('class') === 'noSelected')
        $(this).removeClass('noSelected').addClass('selected');
    else
        $(this).removeClass('selected').addClass('noSelected');
});


$('#enviar').click(function () {
    var tazas = $('use');
    tazaColl = [];

    tazas.each(function () {
        var id = parseInt($(this).attr('id').split('taza').pop());
        var x = parseInt($(this).attr('x'));
        var y = parseInt($(this).attr('y'));
        var selected = $(this).attr('class');
        if (selected == "selected")
            selected = "unavailable";
        var taza = new Taza(id, x, y, selected);
        tazaColl.push(taza);
    });
    localStorage.setItem('tazas', JSON.stringify(tazaColl));
    location.reload();
})

/**
 * Recursive function to eliminate all sons, grandsons and itself if selfRemove is true.
 * @param {Object} node 
 * @param {Boolean} selfRemove 
 */
function deleteTreeElements(node, selfRemove) {
    while (node.hasChildNodes())
        clear(node.firstChild);
    if (selfRemove)
        node.remove();
}

/**
 * Complementary function to deleteTreeElements
 * @param {Object} node 
 */
function clear(node) {
    while (node.hasChildNodes())
        clear(node.firstChild);
    node.parentNode.removeChild(node);
}

