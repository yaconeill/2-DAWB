var colors = {
	0: 'aquamarine',
	1: 'wheat',
	2: 'palegreen',
	3: 'yellow',
	4: 'darkorange'
};
var listTmp = [];
var _color = null;
createBasicElements();
loadList();

/**
 * Object type note
 */

var Note = function () {
	this.key;
	this.text;
	this.color;
};

function CreateNote(text, color) {
	this.text = text;
	this.color = color != undefined ? color : _color;
	let list = document.getElementById('list');
	let p = createElement('p', list);
	createElement('input', p, null, 'type', 'checkbox');
	createElement('span', p, this.text);
	p.style.backgroundColor = this.color;
	this.clave = list.childElementCount;
}
CreateNote.prototype = Object.create(Note.prototype);

/**
 * 
 */
function createBasicElements() {
	let basket = document.getElementById('cesta');
	createElement('h2', basket);
	let h2 = document.getElementsByTagName('h2')[0];
	createElement('i', h2, 'shopping_cart', 'class', 'material-icons', 'style', 'font-size:98px');
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
	createElement('input', basket, null, 'id', 'amount', 'type', 'number', 'PlaceHolder', 'Cant');
	createElement('input', basket, null, 'id', 'product', 'PlaceHolder', 'Producto');
	createElement('button', basket, null, 'id', 'add');

	// Icon addition in button elements
	let buttons = document.querySelectorAll('button');
	createElement('i', buttons[0], 'add_circle_outline', 'class', 'material-icons');
	createElement('i', buttons[1], 'remove_circle_outline', 'class', 'material-icons');
	createElement('i', buttons[2], 'delete_forever', 'class', 'material-icons');
	createElement('i', buttons[3], 'cached', 'class', 'material-icons');
	createElement('i', buttons[4], 'swap_vert', 'class', 'material-icons');
	createElement('i', buttons[5], 'add_circle', 'class', 'material-icons');

	//
	createElement('div', basket, null, 'id', 'list');

}

/**
 * Events
 */
let add = document.getElementById('add');
add.addEventListener('click', addProductToList, false);

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

//
let categoryReset = document.getElementById('reset');
categoryReset.addEventListener('click', function () {
	let listElements = document.querySelectorAll('p');
	listElements.forEach(function (element) {
		element.style.backgroundColor = '';
	});
}, false);

//
var order = document.getElementById('order');
order.addEventListener('click', function name() {
	let list = document.getElementById('list');
	let items = list.children;
	let color0 = document.createDocumentFragment();
	let color1 = document.createDocumentFragment();
	let color2 = document.createDocumentFragment();
	let color3 = document.createDocumentFragment();
	let color4 = document.createDocumentFragment();
	var colorTmp = [color0, color1, color2, color3, color4];

	for (let i = 0; i < items.length; i++)
		for (let j = 0; j < 5; j++)
			if (items[i].style.backgroundColor == colors[j])
				switch (j) {
				case 0:
					color0.appendChild(items[i].cloneNode(true));
					break;
				case 1:
					color1.appendChild(items[i].cloneNode(true));
					break;
				case 2:
					color2.appendChild(items[i].cloneNode(true));
					break;
				case 3:
					color3.appendChild(items[i].cloneNode(true));
					break;
				case 4:
					color4.appendChild(items[i].cloneNode(true));
					break;
				}
	selectDeselectListElements(true);
	deleteSelected();
	for (let i = 0; i < 5; i++)
		list.appendChild(colorTmp[i]);
}, false);

function selectDeselectListElements(state) {
	let listElements = document.querySelectorAll('p');
	listElements.forEach(function (element) {
		element.firstChild.checked = state;
	});
}

function addProductToList() {
	if (_color != null) {
		let amount = document.getElementById('amount').value;
		let product = document.getElementById('product').value;
		if (amount != '' && product != '' && product.indexOf(' ') != 0) {
			var element = new CreateNote(amount + ' ' + product);
			listTmp.push(element);
			localStorage.setItem('Lista', JSON.stringify(listTmp));
			//noteCreation(amount + ' ' + product);
		} else
			alert('Debe añadir cantidad y producto');
	} else
		alert('Selecciona un color antes de añadir a la lista.');
}

/**
 * 
 * @param {String} text - Amount + Product description 
 */

function deleteSelected() {
	var anyChecked = false;
	let node = document.getElementById('list');
	if (node.hasChildNodes) {
		var children = node.children;
		for (let i = children.length - 1; i >= 0; i--)
			if (children[i].firstChild.checked) {
				while (children[i].firstChild)
					children[i].removeChild(children[i].lastChild);
				children[i].parentNode.removeChild(children[i]);
				removeMemberByValue(listTmp, i);
				localStorage.setItem('Lista', JSON.stringify(listTmp));
				anyChecked = true;
			}
		if (!anyChecked)
			alert('No has seleccionado ningún elemento');
	}
}

function loadList() {
	var list = JSON.parse(localStorage.getItem('Lista'));
	if (list != null)
		for (let i = 0; i < list.length; i++) {
			var element = new CreateNote(list[i].text, list[i].color);
			listTmp.push(element);

			// noteCreation(list[i].texto, list[i].color);
		}
}

function removeMemberByValue(arr, value) {
	for (var i = 0, iLen = arr.length; i < iLen; i++) {
		if (arr[i] && arr[i].hasOwnProperty(value));
		//Do 1 of the following, not both:
		// to remove member i (i.e. there will no longer be a member i)
		delete (arr[i]);
		// Remove member i and shift later members -1
		arr.splice(i, 1);
		return arr;  // return is optional
	}
}

/**
 * Global function to create elements with text(null if not) and 3 attributes max.
 */
function createElement(tag, node, text, attr1, attrValue1, attr2, attrValue2, attr3, attrValue3) {
	let element = document.createElement(tag);
	if (attr1 != undefined) {
		element.setAttribute(attr1, attrValue1);
		if (attr2 != undefined) {
			element.setAttribute(attr2, attrValue2);
			if (attr3 != undefined)
				element.setAttribute(attr3, attrValue3);
		}
	}
	if (text != null) {
		let string = document.createTextNode(text);
		element.appendChild(string);
	}
	node.appendChild(element);
	return element;
}