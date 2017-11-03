//Default size for the table width and height
var defaultSize = 20;

//Create initial div element
var body = document.getElementsByTagName('body')[0];
createElement('div', body, null, 'id', 'container');

//Form creation
createElement('form', body, null, 'id', 'form');

//Call to function that creates inputs
basicInputs();
boardCreation();

//Buttons Event listeners
var submit = document.getElementById('submit');
submit.addEventListener('click', boardCreation);
var reset = document.getElementById('reset');
reset.addEventListener('click', resetValues);


/**
 *  Creation of the primary elements
 */
function basicInputs() {

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
    // createElement('br', divInputs);
    createElement('input', divInputs, null, 'type', 'color', 'id', 'mainColor', 'value', '#ffffff');
    createElement('br', divInputs);
    createElement('label', divInputs, 'Color secundario:', 'for', 'SecundaryColor');
    // createElement('br', divInputs);
    createElement('input', divInputs, null, 'type', 'color', 'id', 'SecundaryColor', 'value', '#ffffff');
    createElement('br', divInputs);

    // Input
    createElement('button', divInputs, 'Enviar', 'type', 'submit', 'id', 'submit');
    createElement('button', divInputs, 'Restablecer', 'type', 'reset', 'id', 'reset', 'onclick', 'resetValues()');

    //
    createElement('div', body, null, 'id', 'board');
    var board = document.getElementById('board');
    createElement('table', board, null, 'id', 'table');
}

function styleNthChild() {
    var formula = document.getElementById('formula').value;
    var mainColor = document.getElementById('mainColor').value;
    var SecundaryColor = document.getElementById('SecundaryColor').value;
    var head = document.getElementsByTagName('head')[0];
    if (head.lastChild.localName == 'style')
        head.removeChild(head.lastChild);
    var css = `tr:nth-child(${formula}) td:nth-child(${formula}){background-color:${SecundaryColor};}
            tr:nth-child(odd) td:nth-child(odd){background-color:${SecundaryColor};}
            td{background-color:${mainColor}; width: 20px;height: 20px;border: 1px solid black;}`;
    createElement('style', head, css);
    var style = head.lastElementChild;
}

function boardCreation() {
    styleNthChild();
    var width = parseInt(document.getElementById('width').value) || defaultSize;
    var height = parseInt(document.getElementById('height').value) || defaultSize;
    var sizeW, sizeH, tr;

    var table = document.getElementsByTagName('table')[0];
    if (table.hasChildNodes())
        while (table.hasChildNodes()) {
            table.removeChild(table.lastChild);
        }
    write(width, height, table);
}

function write(width, height, table) {
    w = width;
    h = height;
    for (var k = 0; k < h; k++) {
        createElement('tr', table);
        for (var l = 0; l < w; l++)
            createElement('td', table.children[k]);
    }
}

function resetValues() {
    var inputs = document.getElementById('inputs').children;
    for (var i = 0; i < inputs.length; i++)
        if (inputs[i].localName == 'input')
            if (inputs[i].getAttribute('type') == 'color')
                inputs[i].value = '#ffffff';
            else
                inputs[i].value = '';
}

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