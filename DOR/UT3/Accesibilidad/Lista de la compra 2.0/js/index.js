/**
 * Associative array to establish in which order we want to show the elements based on its color.
 */
var colors = {
	0: 'cornflowerblue',
	1: 'mediumpurple',
	2: 'palegreen',
	3: 'yellow',
	4: 'peachpuff',
};

/**
 * Temporally array where the objects are stored in order to print them on
 * screen and save them in the localstorage.
 */
var listNotes = [];

// Variable used to set the color that has been selected.
var _color = null;

createBasicElements();
loadList();

// #region - Definition of the Object type Note
var Note = function () {
	this.key;
	this.amount;
	this.product;
	this.color;
};

/**
 * Create each element of the note in the dom.
 * @param {Integer} amount
 * @param {String} product
 * @param {String} color
 * @param {Integer} key - Index of color value
 */
function CreateNote(amount, product, color, key) {
	// Set the given values to the properties.
	this.amount = amount;
	this.product = product;
	this.color = color != undefined ? color : _color;

	let list = document.getElementById('list');
	// var p = createElement('p', list);
	let label = createElement('label', list);
	let p = createElement('p', label);
	createElement('input', p, null, 'type', 'checkbox');
	createElement('span', p, this.amount + ' ' + this.product);
	p.style.backgroundColor = this.color;
	for (let i = 0; i < 5; i++) {
		if (this.color == colors[i])
			this.key = key != undefined ? key : i;
	}
}

CreateNote.prototype = Object.create(Note.prototype);
// #endregion

// #region - Create the structure of the document
function createBasicElements() {
	let basket = document.getElementById('cesta');
	createElement('h1', basket);
	let h1 = document.getElementsByTagName('h1')[0];
	createElement('i', h1, 'add_shopping_cart', 'class', 'material-icons', 'style', 'font-size:98px');
	createElement('span', h1, 'Lista de la compra');
	let header = createElement('div', basket, null, 'id', 'header');

	// Button basket list administration
	let listAdmin = createElement('div', header, null, 'id', 'listAdmin');
	createElement('button', listAdmin, null, 'id', 'select');
	createElement('button', listAdmin, null, 'id', 'deselect');
	createElement('button', listAdmin, null, 'id', 'delete');
	// end administration

	// Category section
	let category = createElement('div', header, null, 'class', 'category');
	createElement('span', category, 'Categoría:');
	createElement('button', category, null, 'id', 'reset');
	let colorsDiv = createElement('div', category, null, 'id', 'colors');
	for (let i = 0; i < 5; i++) {
		let divColor = createElement('div', colorsDiv, null, 'class', 'colorSelect');
		divColor.style.backgroundColor = colors[i];
	}
	createElement('button', category, null, 'id', 'order');
	// end category

	// List elements addition
	let addition = createElement('div', basket, null, 'id', 'addition');
	createElement('label', addition, 'Cantidad','for', 'amount');
	createElement('input', addition, null, 'id', 'amount', 'type', 'number', 'min', '1');
	createElement('label', addition, 'Producto','for', 'product');
	createElement('input', addition, null, 'id', 'product');
	createElement('button', addition, null, 'id', 'add');
	createElement('button', addition, null, 'id', 'edit');
	createElement('button', addition, null, 'id', 'info', 'title', 'Para cambiar de categoría, seleccione un color antes de clicar en editar.');

	// Icon addition in button elements
	let buttons = document.querySelectorAll('button');
	createElement('i', buttons[0], 'add_circle_outline', 'class', 'material-icons');
	createElement('i', buttons[1], 'remove_circle_outline', 'class', 'material-icons');
	createElement('i', buttons[2], 'delete_forever', 'class', 'material-icons');
	createElement('i', buttons[3], 'cached', 'class', 'material-icons');
	createElement('i', buttons[4], 'swap_vert', 'class', 'material-icons');
	createElement('i', buttons[5], 'add_circle', 'class', 'material-icons');
	createElement('i', buttons[6], 'mode_edit', 'class', 'material-icons');
	createElement('i', buttons[7], 'info_outline', 'class', 'material-icons');
	// end list elements

	// Create the container of the notes.
	createElement('div', basket, null, 'id', 'list');
}
// #endregion

// #region - Events creation
// List administration
var select = document.getElementById('select');
select.addEventListener('click', function () {
	selectDeselectListElements(true);
}, false);

var deselect = document.getElementById('deselect');
deselect.addEventListener('click', function () {
	selectDeselectListElements(false);
}, false);

var deleteElement = document.getElementById('delete');
deleteElement.addEventListener('click', deleteSelected, false);

// Color selection
let colorSelect = document.getElementsByClassName('colorSelect');
for (let i = 0; i < colorSelect.length; i++) {
	colorSelect[i].addEventListener('click', function () {
		// Reset selected border color.
		for (let j = 0; j < colorSelect.length; j++)
			colorSelect[j].style.border = '';
		_color = colors[i];
		colorSelect[i].style.border = '1px solid red';
	}, false);
}

// Reset colors from items list
var categoryReset = document.getElementById('reset');
categoryReset.addEventListener('click', function () {
	let listElements = document.querySelectorAll('p');
	listElements.forEach(function (element) {
		element.style.backgroundColor = '';
	});
}, false);

// Order items list by color
var order = document.getElementById('order');
order.addEventListener('click', function name() {
	let list = document.getElementById('list');
	let listSize = list.childElementCount;
	listNotes.sort(function (a, b) {
		return a.key - b.key;
	});
	selectDeselectListElements(true);
	deleteSelected(1);
	for (let i = 0; i < listSize; i++) {
		let newNote = new CreateNote(listNotes[i]['amount'], listNotes[i]['product'], listNotes[i]['color'], listNotes[i]['key']);
	}
	localStorage.setItem('Lista', JSON.stringify(listNotes));
}, false);

// Addition events
var add = document.getElementById('add');
add.addEventListener('click', addProductToList, false);
var edit = document.getElementById('edit');
edit.addEventListener('click', editListElement, false);

// #endregion

/**
 * Read the given values by the user and create the note object with them.
 * Verify if there is a color selected or any input is empty.
 */
function addProductToList() {
	if (_color != null) {
		let amount = document.getElementById('amount').value;
		let product = document.getElementById('product').value;
		if (amount != '' && product != '' && product.indexOf(' ') != 0) {
			let element = new CreateNote(amount, product);
			listNotes.push(element);
			localStorage.setItem('Lista', JSON.stringify(listNotes));
		} else { alert('Debe añadir cantidad y producto'); }
	} else { alert('Selecciona un color antes de añadir a la lista.'); }
}

/**
 * Load the notes stored in localstorage.
 */
function loadList() {
	let list = JSON.parse(localStorage.getItem('Lista'));
	if (list != null) {
		for (let i = 0; i < list.length; i++) {
			var element = new CreateNote(list[i].amount, list[i].product, list[i].color, list[i].key);
			listNotes.push(element);
		}
	}
}

// region - Interactions with the list elements
/**
 * Check all input type checkbox and select or deselect according to state parameter.
 * @param {Boolean} state
 */
function selectDeselectListElements(state) {
	let listElements = document.querySelectorAll('p');
	listElements.forEach(function (element) {
		element.firstChild.checked = state;
	});
}

/**
 * Check all checkbox checked and delete them.
 * @param {Integer} sort -
 */
function deleteSelected(sort) {
	let anyChecked = false;
	let node = document.getElementById('list');
	if (node.hasChildNodes) {
		let children = node.children;
		for (let i = children.length - 1; i >= 0; i--)
		// Tags guide: ( p ).( label ).( input:checkbox )
		{
			if (children[i].firstChild.firstChild.checked) {
				deleteTreeElements(children[i], true);
				// Prevent from deleting the list when reorder the list elements.
				if (sort != 1)
					listNotes.splice(i, 1);
				// If there is no elements in the list, delete the localstorage key.
				if (listNotes.length > 0)
					localStorage.setItem('Lista', JSON.stringify(listNotes));
				else
					localStorage.removeItem('Lista');
				anyChecked = true;
			}
		}
		// Show a message if no checkbox is checked.
		if (!anyChecked) { alert('No has seleccionado ningún elemento'); }
	}
}

/**
 * Recursive function to eliminate all sons, grandsons and itself if selfRemove is true.
 * @param {Object} node
 * @param {Boolean} selfRemove
 */
function deleteTreeElements(node, selfRemove) {
	while (node.hasChildNodes()) { clear(node.firstChild); }
	if (selfRemove) { node.remove(); }
}

/**
 * Complementary function to deleteTreeElements
 * @param {Object} node
 */
function clear(node) {
	while (node.hasChildNodes()) { clear(node.firstChild); }
	node.parentNode.removeChild(node);
}
// #endregion

/**
 * Additional functionality
 * Check the element selected and modifies the content
 */
function editListElement() {
	let node = document.getElementById('list');
	let children = node.children;
	// var checked = (children) => {
	let checked = 0;
	for (let i = 0; i < children.length; i++) {
		if (children[i].firstChild.firstChild.checked)
			checked += 1;
	}
	if (checked == 1) {
		for (let i = children.length - 1; i >= 0; i--)
		// Tags guide ( label ).( p ).( input:checkbox )
		{
			if (children[i].firstChild.firstChild.checked) {
				editList(i, node, listNotes[i].amount, listNotes[i].product, listNotes[i].color);
				localStorage.setItem('Lista', JSON.stringify(listNotes));
			}
		}
	} else if (checked == 0) { alert('Debe seleccionar un elemento para modificarlo'); }
	else { alert('Seleccione solo un elemento a modificar'); }
}

function editList(index, node, tmpAmo, tmpPro, tmpCol) {
	let listSize = node.childElementCount;
	let amount = prompt('Cambiar cantidad');
	let product = prompt('Cambiar descripción de producto');
	listNotes[index].amount = amount != undefined ? amount : tmpAmo;
	listNotes[index].product = product != undefined ? product : tmpPro;
	listNotes[index].color = _color != undefined ? _color : tmpCol;
	for (let i = 0; i < 5; i++) {
		if (_color == colors[i] && _color != undefined)
			listNotes[index].key = i;
	}
	// Tags guide ( label ).( p ).( span-text )
	selectDeselectListElements(true);
	deleteSelected(1);
	for (let i = 0; i < listSize; i++) {
		let newNote = new CreateNote(listNotes[i]['amount'], listNotes[i]['product'], listNotes[i]['color'], listNotes[i]['key']);
	}
}

/**
 * Global function to create elements with text(null if not) and 3 attributes max.
 */
function createElement(tag, node, text, attr1, attrValue1, attr2, attrValue2, attr3, attrValue3, attr4, attrValue4) {
	let element = document.createElement(tag);
	if (attr1 != undefined) {
		element.setAttribute(attr1, attrValue1);
		if (attr2 != undefined) {
			element.setAttribute(attr2, attrValue2);
			if (attr3 != undefined) {
				element.setAttribute(attr3, attrValue3);
				if (attr4 != undefined) { element.setAttribute(attr4, attrValue4); }
			}
		}
	}
	if (text != null) {
		let string = document.createTextNode(text);
		element.appendChild(string);
	}
	node.appendChild(element);
	return element;
}
