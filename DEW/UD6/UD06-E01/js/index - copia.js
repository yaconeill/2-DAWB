var RegExpOnlyNum = /^\d+$/;
var RegExpOnlyLetter = /^[a-z]+$/i;
var RegExpBoth = /^[a-z0-9]+$/i;
var RegExpName = /^[a-zñáéíóúü\s]+$/i;

// #region - Form 1
var error = document.querySelector('.error');
var msgNum = document.getElementById('num');
var msgLet = document.getElementById('letter');
var msgBoth = document.getElementById('both');

var button1 = document.getElementById('submit1');
let reset = document.getElementsByClassName('reset');
for (let i = 0; i < reset.length; i++) {
	reset[i].addEventListener('click', function name() {
		button1.disabled = false;
		error.innerHTML = '';
		msgNum.innerHTML = '';
		msgLet.innerHTML = '';
		msgBoth.innerHTML = '';
	}, false);

}

/**
 * Event listener for form 1
 */
button1.addEventListener('click', validationForm1, false);
function validationForm1() {
	this.disabled = true;
	// let message = '';
	let result = false;

	let onlyNum = document.getElementById('onlyNum');
	let onlyLetter = document.getElementById('onlyLetter');
	let numLetter = document.getElementById('num&Letter');
	let field1 = RegExpOnlyNum.test(onlyNum.value);
	let field2 = RegExpOnlyLetter.test(onlyLetter.value);
	let field3 = RegExpBoth.test(numLetter.value);
	if (field1)
		msgNum.innerHTML = 'Correcto';
	if (field2)
		msgLet.innerHTML = 'Correcto';
	if (field3)
		msgBoth.innerHTML = 'Correcto';

	if (field1 && field2 && field3) {
		result = true;
	} else {
		if (!field1)
			msgNum.innerHTML = 'Solo se aceptan números<br>';
		if (!field2)
			msgLet.innerHTML = 'Solo se aceptan letras<br>';
		if (!field3)
			msgBoth.innerHTML = 'Solo se aceptan números y letras<br>';
	}
	// if (field1 && field2 && field3) {
	// 	message = 'Correcto';
	// 	result = true;

	// } else {
	// 	if (!field1)
	// 		errorNum.innerHTML = 'Solo se aceptan números<br>';
	// 	if (!field2)
	// 		errorLet.innerHTML = 'Solo se aceptan letras<br>';
	// 	if (!field3)
	// 		errorBoth.innerHTML = 'Solo se aceptan números y letras<br>';
	// }
	// error.innerHTML = message;
	return result;
}
// #endregion

// #region - Form 2

var button2 = document.getElementById('submit2');

/**
 * Event listener for form 2
 */
button2.addEventListener('click', validationForm2, false);

function validationForm2() {
	document.getElementById('fullName');
	
}

// #endregion


function validateAny(input, rexExp, node, text){
	let result;
	let field = rexExp.test(input.value);
	if(field){
		node.innerHTML = 'Correcto';
		result = true;
	}else{
		node.innerHTML = text;
		result = false;
	}
	return result;
}