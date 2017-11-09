// Amount of cards
var numCards = 3;
//
var win;
//
var body = document.getElementsByTagName('body')[0];

newGame();
/**
 * 
 */
function newGame() {
	win = false;
	elementsCreation();
	eventCreation();
}

/**
 * Elements creation
 */
function elementsCreation() {
	var img = ['img/Asdeoros.png', 'img/3deespadas.png', 'img/3debastos.png'];
	switch (numCards) {
	case 4:
		img.push('img/4deoros.png');
		break;
	case 5:
		img.push('img/4deoros.png');
		img.push('img/8decopas.png');
		break;
	}

	if (document.body.hasChildNodes())
		while (document.body.hasChildNodes())
			document.body.removeChild(document.body.lastChild);

	createElement('h1', body, 'Trileros');

	createElement('select', body.firstElementChild, null, 'id', 'select');
	var select = document.getElementById('select');
	createElement('option', select, 'Dificultad', 'id', 'difficulty');
	for (var j = 3; j <= 5; j++) {
		createElement('option', select, j, 'value', j, 'id', j);
	}

	createElement('div', body, null, 'id', 'container');
	var container = document.getElementById('container');

	createElement('div', container, null, 'class', 'board');

	shuffle(img);
	var board = container.firstElementChild;
	var fig = '';
	for (var i = 0; i < numCards; i++) {
		createElement('div', board, null, 'class', 'cards');
		var cards = document.getElementsByClassName('cards')[i];

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
 * Events creation
 */
function eventCreation() {
	for (var i = 0; i < numCards; i++) {
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
 * 
 * @param {*} e 
 */
function hideCard(e) {
	var div = e.target;
	div.style.display = 'none';
	div.nextElementSibling.style.display = 'flex';
	disableEvents();
	isWinner();
	var footer = body.lastElementChild;
	footer.style.display = 'flex';
}

/**
 * 
 */
function disableEvents() {
	var cards = document.getElementsByClassName('cards');
	for (var i = 0; i < cards.length; i++) {
		cards[i].removeEventListener('click', hideCard);
	}
}

/**
 * 
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
 * 
 */
function ShowScore() {
	var globalScore = localStorage.getItem('scoreCard');
	!isNaN(parseInt(globalScore)) ? globalScore = parseInt(globalScore) : globalScore = 0;
	if (win)
		globalScore += 1;
	localStorage.setItem('scoreCard', globalScore);
	document.getElementById('text').innerText = 'Has ganado! ' + globalScore + (globalScore == 1 ? ' vez ' : ' veces');
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
 * 
 */
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
}