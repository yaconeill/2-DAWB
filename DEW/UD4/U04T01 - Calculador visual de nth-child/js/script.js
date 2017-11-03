// Default size for the table width and height
var defaultSize = 20;

// Create initial div element
var body = document.getElementsByTagName('body')[0];
createElement('div', body, null, 'id', 'container');

// Form creation
createElement('form', body, null, 'id', 'form');

// Call to function that creates inputs
basicInputs();
boardCreation();

// Buttons Event listeners
var submit = document.getElementById('submit');
submit.addEventListener('click', boardCreation);
var reset = document.getElementById('reset');
reset.addEventListener('click', resetValues);


/**
 *  Creation of the primary elements
 */
function basicInputs() {
    // Create an element div to contain the inputs
    createElement('div', body, null, 'id', 'inputs');
    var divInputs = document.getElementById('inputs');

    // Input creation
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
    createElement('input', divInputs, null, 'type', 'color', 'id', 'mainColor', 'value', '#ffffff');
    createElement('br', divInputs);
    createElement('label', divInputs, 'Color secundario:', 'for', 'SecondaryColor');
    createElement('input', divInputs, null, 'type', 'color', 'id', 'SecondaryColor', 'value', '#a899fd');
    createElement('br', divInputs);

    // Create elements Input
    createElement('button', divInputs, 'Enviar', 'type', 'submit', 'id', 'submit');
    createElement('button', divInputs, 'Restablecer', 'type', 'reset', 'id', 'reset', 'onclick', 'resetValues()');

    // Create a container for table
    createElement('div', body, null, 'id', 'board');
    var board = document.getElementById('board');
    createElement('table', board, null, 'id', 'table');
}

/**
 * Function that sets the color of the cells throw a nth-child formula
 */
function styleNthChild() {
    // Get the values of the inputs
    var formula = document.getElementById('formula').value || 'odd';
    var mainColor = document.getElementById('mainColor').value;
    var SecondaryColor = document.getElementById('SecondaryColor').value;

    // Set background color base
    var cell = document.querySelectorAll('td');
    cell.forEach(x => x.style.backgroundColor = mainColor);

    // Set background color to use with nth-child
    var allCells = document.querySelectorAll('td:nth-child(' + formula + ')');
    if (isNaN(formula))
        for (var i = 0; i < allCells.length; i++) {
            allCells[i].style.backgroundColor = SecondaryColor;
        }
    else
        cell[formula].style.backgroundColor = SecondaryColor;
}

/**
 * Function that write the table according to the values of width and height
 */
function boardCreation() {
    var width = parseInt(document.getElementById('width').value) || defaultSize;
    var height = parseInt(document.getElementById('height').value) || defaultSize;

    var table = document.getElementsByTagName('table')[0];
    if (table.hasChildNodes())
        while (table.hasChildNodes()) {
            table.removeChild(table.lastChild);
        }
    write(width, height, table);

    // Call the function that set the bg color
    styleNthChild();
}

/**
 * Write elements to create the rows and columns
 */
function write(width, height, table) {
    w = width;
    h = height;
    for (var k = 0; k < h; k++) {
        createElement('tr', table);
        for (var l = 0; l < w; l++)
            createElement('td', table.children[k]);
    }
}

/**
 * Reset the values of the inputs
 */
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