//Initial values
var defaultW = 20;
var defaultH = 20;
//Create initial div element
var body = document.getElementsByTagName('body')[0];
createElement('div', body, null, 'id', 'container');

//Form creation
createElement('form', body, null, 'id', 'form');

//Call to function that creates inputs
basicCreation();
boardCreation();
var submit = document.getElementById('submit');
submit.addEventListener('click', boardCreation);

//Call to function that creates the board

/**
 *
 */
function basicCreation() {

    //var form = document.getElementById('form');
    createElement('div', body, null, 'id', 'inputs');
    var divInputs = document.getElementById('inputs');

    //Input creation
    createElement('label', divInputs, 'Fórmula (nth-child):', 'for', 'formula');
    createElement('br', divInputs);
    createElement('input', divInputs, null, 'type', 'text', 'id', 'formula');
    createElement('br', divInputs);
    createElement('label', divInputs, 'Alto:', 'for', 'height');
    createElement('br', divInputs);
    createElement('input', divInputs, null, 'type', 'number', 'id', 'height');
    createElement('br', divInputs);
    createElement('label', divInputs, 'Ancho:', 'for', 'width');
    createElement('br', divInputs);
    createElement('input', divInputs, null, 'type', 'number', 'id', 'width');
    createElement('br', divInputs);
    createElement('label', divInputs, 'Color principal:', 'for', 'mainColor');
    createElement('br', divInputs);
    createElement('input', divInputs, null, 'type', 'text', 'id', 'mainColor');
    createElement('br', divInputs);
    createElement('label', divInputs, 'Color secundario:', 'for', 'SecundaryColor');
    createElement('br', divInputs);
    createElement('input', divInputs, null, 'type', 'text', 'id', 'SecundaryColor');
    createElement('br', divInputs);
    createElement('br', divInputs);

    // Input
    createElement('button', divInputs, 'Enviar', 'type', 'submit', 'id', 'submit');
    createElement('button', divInputs, 'Restablecer', 'type', 'reset', 'id', 'reset');

    //
    createElement('div', body, null, 'id', 'board');
    var board = document.getElementById('board');
    createElement('table', board, null, 'id', 'table');
}

var ntchild = document.querySelectorAll("tr");

function boardCreation() {
    var width = parseInt(document.getElementById('width').value) || defaultW;
    var height = parseInt(document.getElementById('height').value) || defaultH;
    var sizeW, sizeH, tr;

    var table = document.getElementsByTagName('table')[0];
    // if (table.hasChildNodes()) {
    //     sizeW = table.firstChild.childElementCount;
    //     sizeH = table.childElementCount;
    //     tr = table.children;
    // }
    if (table.hasChildNodes())
        while (table.hasChildNodes()) {
            table.removeChild(table.lastChild)
        }
    writeVertical(width, height, null, null, table);
    // if (sizeW > width)
    //     for (var i = sizeW; i > 0; i--) {
    //         var child = tr[i - 1].children;
    //         for (var j = child.length; j > width; j--)
    //             tr[i - 1].removeChild(tr[i - 1].lastChild);
    //     }


    // if (sizeH > height)
    //     for (var index = sizeW; index > height; index--) {
    //         table.removeChild(table.lastChild);
    //     }
    // else {
    //     // Cells creation
    //     var oldWidth, oldHeight;
    //     if (table.hasChildNodes()) {
    //         oldWidth = tr[0].children.length;
    //         oldHeight = table.childElementCount;
    //     }
    //     if (oldHeight != undefined || oldWidth != undefined)
    //         writeVertical(width, height, oldWidth, oldHeight, table, 1);
    //     else
    //         writeVertical(width, height, oldWidth, oldHeight, table);
    // }
}

function writeVertical(width, height, oldWidth, oldHeight, table, option) {
    w = width;
    h = height;
    // if (option == 1) {
    //     for (var i = 0; i < h; i++) {
    //         createElement('tr', table);
    //         for (var j = oldWidth, n = 1; j < w; j++, n++)
    //             createElement('td', table.children[i], n + '');
    //         // if (i == oldWidth - 1) {
    //         //     j = 0;
    //         // }
    //     }
    // } else {
        for (var k = 0; k < h; k++) {
            createElement('tr', table);
            for (var l = 0, n = 1; l < w; l++, n++)
                createElement('td', table.children[k], n + '');
            if (k == oldWidth - 1)
                w = width;
        }
    // }
}

// function writeHorizontal(width, height, oldWidth, oldHeight, table, option) {

// }
/**
 * Global function to create elements
 */
function createElement(tag, node, text, attr1, attrValue1, attr2, attrValue2, attr3, attrValue3) {
    var element = document.createElement(tag);
    if (attr1 != undefined) {
        element.setAttribute(attr1, attrValue1);
        if (attr2 != undefined) {
            element.setAttribute(attr2, attrValue2);
            if (attr3 != undefined)
                element.setAttribute(attr3, attrValue3);
        }
    }
    if (text != null) {
        var string = document.createTextNode(text);
        element.appendChild(string);
    }
    node.appendChild(element);
}