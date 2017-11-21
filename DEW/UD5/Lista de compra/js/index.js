/**
 * Associative array to establish in which order we want to show the elements based on its color
 */
var colors = {
	0: 'aquamarine',
	1: 'wheat',
	2: 'palegreen',
	3: 'yellow',
	4: 'darkorange'
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
	let p = createElement('p', list);
	let label = createElement('label', p);
	createElement('input', label, null, 'type', 'checkbox');
	createElement('span', label, this.amount + ' ' + this.product);
	p.style.backgroundColor = this.color;
	for (let i = 0; i < 5; i++)
		if (this.color == colors[i])
			this.key = key != undefined ? key : i;
}

CreateNote.prototype = Object.create(Note.prototype);
// endregion

// region - Create the structure of the document
function createBasicElements() {
	let basket = document.getElementById('cesta');
	createElement('h2', basket);
	let h2 = document.getElementsByTagName('h2')[0];
	createElement('i', h2, 'add_shopping_cart', 'class', 'material-icons', 'style', 'font-size:98px');
	createElement('span', h2, 'Lista de la compra');
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
	createElement('input', basket, null, 'id', 'amount', 'type', 'number', 'PlaceHolder', 'Cant', 'min', '1');
	createElement('input', basket, null, 'id', 'product', 'PlaceHolder', 'Producto');
	createElement('button', basket, null, 'id', 'add');
	createElement('button', basket, null, 'id', 'edit');

	// Icon addition in button elements
	let buttons = document.querySelectorAll('button');
	createElement('i', buttons[0], 'add_circle_outline', 'class', 'material-icons');
	createElement('i', buttons[1], 'remove_circle_outline', 'class', 'material-icons');
	createElement('i', buttons[2], 'delete_forever', 'class', 'material-icons');
	createElement('i', buttons[3], 'cached', 'class', 'material-icons');
	createElement('i', buttons[4], 'swap_vert', 'class', 'material-icons');
	createElement('i', buttons[5], 'add_circle', 'class', 'material-icons');
	createElement('i', buttons[6], 'mode_edit', 'class', 'material-icons');
	// end list elements

	// Create the container of the notes.
	createElement('div', basket, null, 'id', 'list');
}

// #region - Events creation
// List administration
let select = document.getElementById('select');
select.addEventListener('click', function () {
	selectDeselectListElements(true);
}, false);

let deselect = document.getElementById('deselect');
deselect.addEventListener('click', function () {
	selectDeselectListElements(false);
}, false);

let deleteElement = document.getElementById('delete');
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
let categoryReset = document.getElementById('reset');
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
let add = document.getElementById('add');
add.addEventListener('click', addProductToList, false);
let edit = document.getElementById('edit');
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
			var element = new CreateNote(amount, product);
			listNotes.push(element);
			localStorage.setItem('Lista', JSON.stringify(listNotes));
		} else
			alert('Debe añadir cantidad y producto');
	} else
		alert('Selecciona un color antes de añadir a la lista.');
}

/**
 * Load the notes stored in localstorage.
 */
function loadList() {
	var list = JSON.parse(localStorage.getItem('Lista'));
	if (list != null)
		for (let i = 0; i < list.length; i++) {
			var element = new CreateNote(list[i].amount, list[i].product, list[i].color, list[i].key);
			listNotes.push(element);
		}
}

// region - Interactions with the list elements
/**
 * Check all input type checkbox and select or deselect according to state parameter.
 * @param {Boolean} state
 */
function selectDeselectListElements(state) {
	let listElements = document.querySelectorAll('label');
	listElements.forEach(function (element) {
		element.firstChild.checked = state;
	});
}

/**
 * Check all checkbox checked and delete them. 
 * @param {Integer} sort - 
 */
function deleteSelected(sort) {
	var anyChecked = false;
	let node = document.getElementById('list');
	if (node.hasChildNodes) {
		var children = node.children;
		for (let i = children.length - 1; i >= 0; i--)
			// Tags guide: ( p ).( label ).( input:checkbox )
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
		// Show a message if no checkbox is checked.
		if (!anyChecked)
			alert('No has seleccionado ningún elemento');
	}
}

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
// #endregion

/**
 * Additional functionality
 */
function editListElement() {
	let node = document.getElementById('list');
	var children = node.children;
	for (let i = children.length - 1; i >= 0; i--)
		// Tags guide ( p ).( label ).( input:checkbox )
		if (children[i].firstChild.firstChild.checked) {
			let amount = prompt('Cambiar cantidad');
			let product = prompt('Cambiar descripción de producto');
			listNotes[i].amount = amount;
			listNotes[i].product = product;
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
				if (attr4 != undefined)
					element.setAttribute(attr4, attrValue4);
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