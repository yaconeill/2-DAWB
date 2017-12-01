var checkBoxChecked = [];
/**
 * Regular expressions
 */
const RegExpOnlyNum = /^\d+$/;
const RegExpOnlyLetter = /^[a-z]+$/i;
const RegExpBoth = /^[a-z0-9]+$/i;
const RegExpFullName = /^[a-zñáéíóúü\s]+$/i;
const RegExpPhone = /^\d+$/;
const RegExpEmail = /^(.+@yaco.eu)$/;


let reset = document.getElementsByClassName('reset');
let spanError = document.getElementsByTagName('span');
let buttons = document.getElementsByTagName('button');
for (let i = 0; i < reset.length; i++) {
	reset[i].addEventListener('click', function name() {
		for (let i = 0; i < buttons.length; i++)
			buttons[i].disabled = false;
		for (let i = 0; i < checkBoxChecked.length; i++)
			checkBoxChecked[i].previousElementSibling.className = '';
		for (let j = 0; j < spanError.length; j++)
			spanError[j].innerHTML = '';
	}, false);

}

// #region - Form 1
// var error = document.querySelector('.error');
var msgNum = document.getElementById('num');
var msgLet = document.getElementById('letter');
var msgBoth = document.getElementById('both');
var button1 = document.getElementById('submit1');

/**
 * Event listener for form 1
 */
button1.addEventListener('click', validationForm1, false);
function validationForm1() {
	this.disabled = true;
	let result = false;

	let onlyNum = document.getElementById('onlyNum');
	let onlyLetter = document.getElementById('onlyLetter');
	let numLetter = document.getElementById('num&Letter');

	let field1 = validateAny(onlyNum, RegExpOnlyNum, msgNum, 'Solo se aceptan números');
	let field2 = validateAny(onlyLetter, RegExpOnlyLetter, msgLet, 'Solo se aceptan letras');
	let field3 = validateAny(numLetter, RegExpBoth, msgBoth, 'Solo se aceptan números y letras');

	if (field1 && field2 && field3) //{
		result = true;
	return result;
}
// #endregion

// #region - Form 2

var button2 = document.getElementById('submit2');

/**
 * Event listener for form 2
 */
button2.addEventListener('click', validationForm2, false);

var msgUser = document.getElementById('msgUser');
var msgName = document.getElementById('msgName');
var msgLName = document.getElementById('msgLName');
var msgAddress = document.getElementById('msgAddress');
var msgEmail = document.getElementById('msgEmail');
var msgPhone = document.getElementById('msgPhone');
var msgSug = document.getElementById('msgSug');

function validationForm2() {
	this.disabled = true;
	let message = 'Campo obligatorio';
	let userValid, nameValid, lastNameValid, phoneValid, emailValid, sugValid;
	let form = document.getElementById('form2');
	let result = false;
	let user = document.getElementById('user');
	let name = document.getElementById('name');
	let lastName = document.getElementById('lastName');
	let address = document.getElementById('address');
	let phone = document.getElementById('phone');
	let email = document.getElementById('email');
	let suggest = document.getElementById('suggestions');
	let img = document.getElementById('img');

	if (user.value.length == 0) {
		userValid = false;
		msgUser.innerHTML = message;
	} else
		userValid = true;

	if (name.value.length > 0)
		nameValid = validateAny(name, RegExpFullName, msgName, 'Sólo letras mayúsculas o minúsculas');
	else
		msgName.innerHTML = message;

	if (lastName.value.length > 0)
		lastNameValid = validateAny(lastName, RegExpFullName, msgLName, message);
	else
		msgLName.innerHTML = message;

	if (address.value.length > 100)
		msgAddress.innerHTML = 'Máximo 100 caracteres';
	if (phone.value.length != 0)
		phoneValid = validateAny(phone, RegExpPhone, msgPhone, 'Introducir sólo números');
	if (phone.value.length != 9 && phone.value.length != 0) {
		msgPhone.innerHTML = 'Insertar 9 dígitos, ' + phone.value.length + ' introducidos';
		phoneValid = false;
	}

	if (email.value.length > 0)
		emailValid = validateAny(email, RegExpEmail, msgEmail, 'Introducir formato correcto (...@yaco.eu).');
	else
		msgEmail.innerHTML = message;

	if (suggest.value.length == 0) {
		sugValid = false;
		msgSug.innerHTML = message;
	} else
		sugValid = true;

	validateUploadImg(img);

	if (userValid && nameValid && lastNameValid && phoneValid &&
		emailValid && sugValid) {
		form.action = 'validator.php';
		result = true;
	} else
		form.action = '';

	return result;
}

function validateUploadImg(img) {
	let validExtension = ['.gif', '.jpg'];
	let result = false;
	let file = img.files;
	let fileText = img.value;

	if (fileText) {
		let sizeMb = (file[0].size / 1000) / 1000;
		if (sizeMb > 1) {
			alert('El tamaño del archivo excede del máximo (1Mb).');
			result = false;
		} else {
			let extension = (fileText.substring(fileText.lastIndexOf('.'))).toLowerCase();
			let valid = false;
			for (let i = 0; i < validExtension.length; i++)
				if (validExtension[i] == extension) {
					valid = true;
					break;
				}
			if (!valid)
				alert('Sólo se pueden subir archivos con extensiones: ' + validExtension.join());
			else
				result = true;
		}
		return result;
	}
}

// #endregion

// #region - Form 3

var button3 = document.getElementById('submit3');
button3.addEventListener('click', checkCheckBox, false);

function checkCheckBox() {
	this.disabled = true;
	let checkBoxes = document.getElementsByClassName('checkBox');
	let msgCheckBox = document.getElementById('msgCheckBox');
	let result = false;
	let c = 0;
	for (let i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked) {
			c++;
			checkBoxChecked.push(checkBoxes[i]);
		}
	}
	switch (true) {
	case c == 0:
		msgCheckBox.innerHTML = 'Debes marcar al menos uno.';
		break;
	case c > 3:
		msgCheckBox.innerHTML = 'No debes marcar más de tres.';
		for (let i = 0; i < checkBoxChecked.length; i++) {
			checkBoxChecked[i].previousElementSibling.className = 'errorCheck';
		}
		break;
	case c > 0 && c <= 3:
		result = true;
		break;
	}
	return result;
}
// #endregion

function validateAny(input, rexExp, node, text) {
	let result;
	let field = rexExp.test(input.value);
	if (field) {
		// node.innerHTML = 'Correcto';
		result = true;
	} else {
		node.innerHTML = text;
		result = false;
	}
	return result;
}