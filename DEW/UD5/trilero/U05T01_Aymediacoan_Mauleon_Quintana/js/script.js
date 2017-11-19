// Amount of cards
var numCards = 3;
// Boolean that set true if the player win.
var win;
// Variable assigned to the body of the page.
var body = document.getElementsByTagName('body')[0];

newGame();

/**
 * Function that call all the functions needed to initiate the game
 */
function newGame() {
	win = false;
	elementsCreation();
	eventCreation();
	ShowScore();
}

/**
 * Elements creation
 */
function elementsCreation() {

	// Array of images path declaration
	var img = ['img/Asdeoros.png', 'img/3deespadas.png', 'img/3debastos.png'];
	// It adds more img into the array according to combobox selected option, by defect the value is 3.
	switch (numCards) {
	case 4:
		img.push('img/4deoros.png');
		break;
	case 5:
		img.push('img/4deoros.png');
		img.push('img/8decopas.png');
		break;
	}

	// If body has any child, this will eliminate them all.
	if (document.body.hasChildNodes())
		while (document.body.hasChildNodes())
			document.body.removeChild(document.body.lastChild);

	createElement('h1', body, 'Trileros');
	createElement('select', body.firstElementChild, null, 'id', 'select');

	var select = document.getElementById('select');
	createElement('option', select, 'Dificultad', 'id', 'difficulty');
	for (let j = 3; j <= 5; j++) {
		createElement('option', select, j + ' cartas', 'value', j, 'id', j);
	}

	createElement('div', body, null, 'id', 'container');
	var container = document.getElementById('container');
	createElement('div', container, null, 'class', 'board');

	// Change the order of the elements.
	shuffle(img);

	var board = container.firstElementChild;

	var fig = '';
	for (let i = 0; i < numCards; i++) {
		createElement('div', board, null, 'class', 'cards');
		var cards = document.getElementsByClassName('cards')[i];
		// Set the variable fig in case the card is the Gold.
		if (img[i].includes('Asdeoros'))
			fig = 'figure';
		createElement('div', cards, null, 'class', `back card-${i+1} ${fig}`);
		createElement('div', cards, null, 'class', `front card-${i+1} ${fig}`);
		var frontCard = document.getElementsByClassName(`card-${i+1}`)[1];
		frontCard.style.background = `url(${img[i]})`;
		frontCard.style.backgroundSize = '100%';
		frontCard.style.display = 'none';
	}
	createElement('div', body, null, 'class', 'footer');
	var footer = body.lastElementChild;
	createElement('p', footer, null, 'id', 'text');
	createElement('button', footer, 'Otra vez', 'id', 'button');
}

/**
 * Create the events for the interaction with the cards and buttons.
 */
function eventCreation() {
	for (let i = 0; i < numCards; i++) {
		var card = document.getElementsByClassName('cards')[i];
		card.addEventListener('click', hideCard, false);
	}
	var button = document.getElementById('button');
	button.addEventListener('click', newGame);
	var select = document.getElementById('select');
	select.addEventListener('change', function() {
		numCards = parseInt(select.value);
		newGame();
	}, false);
}

/**
 * Hide the div that contain the card selected, calls the function that disable the events and check if the player win.
 */
function hideCard(e) {
	var div = e.target;
	div.style.display = 'none';
	div.nextElementSibling.style.display = 'flex';
	disableEvents();
	isWinner();
}

/**
 * Disable the events of all cards.
 */
function disableEvents() {
	var cards = document.getElementsByClassName('cards');
	for (let i = 0; i < cards.length; i++) {
		cards[i].removeEventListener('click', hideCard);
	}
}

/**
 * Check if the player win and call function that show the score.
 */
function isWinner() {
	var fig = document.getElementsByClassName('figure');

	if (fig[1].style.display == 'flex') {
		win = true;
	}
	if (!win)
		var timer = setTimeout(function() {
			if (fig[1].style.display == 'none') {
				fig[1].style.display = 'flex';
				fig[0].style.display = 'none';
			}
		}, 500);
	ShowScore();
}

/**
 * Show below the card a message telling the times the player has won and add the result.
 */
function ShowScore() {
	try {
		var globalScore = localStorage.getItem('scoreCard');
		!isNaN(parseInt(globalScore)) ? globalScore = parseInt(globalScore) : globalScore = 0;
		if (win)
			globalScore += 1;
		localStorage.setItem('scoreCard', globalScore);
		document.getElementById('text').innerText = 'Has ganado! ' + globalScore + (globalScore == 1 ? ' vez ' : ' veces');
	} catch (error) {
		console.error(error);
	}
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

/**
 * Function that randomly change the order of the elements inside an array.
 */
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
}