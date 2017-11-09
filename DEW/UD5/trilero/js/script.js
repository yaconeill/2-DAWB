// Amount of cards
const classNum = 3;
// Assigned to random
const numCards = 3;
//
var body = document.getElementsByTagName('body')[0];
createElement('div', body, 'id', 'container');
/**
 * Elements creation
 */
function elementsCreation() {
    var img = ['img/Asdeoros.png', 'img/3deespadas.png', 'img/4deoros.png'];
    var container = document.getElementById('container');
    createElement('div', container, 'class', 'board');

    shuffle(img);
    var board = container.firstElementChild;
    for (var i = 0; i < classNum; i++) {
        createElement('div', board, 'class', 'cards');
        var cards = document.getElementsByClassName('cards')[i];
        createElement('div', cards, 'class', `back card-${i+1}`);
        createElement('div', cards, 'class', `front card-${i+1}`);
        var frontCard = document.getElementsByClassName(`card-${i+1}`)[1];
        frontCard.style.background = `url(${img[i]})`;
        frontCard.style.backgroundSize = '100%';
        frontCard.style.display = 'none';
    }
}
elementsCreation();

// var card1 = document.getElementsByClassName('cards')[0];
// card1.addEventListener('click', hideCard, false);
// var card2 = document.getElementsByClassName('cards')[1];
// card2.addEventListener('click', hideCard, false);
// var card3 = document.getElementsByClassName('cards')[2];
// card3.addEventListener('click', hideCard, false);

for (var i = 0; i < numCards; i++) {
    var card = document.getElementsByClassName('cards')[i];
    card.addEventListener('click', hideCard, false);
}

function hideCard(e) {
    var a = e.target;
    a.style.display = 'none';
    a.nextElementSibling.style.display = 'flex';
    disableEvents();
}

function disableEvents() {
    var cards = document.getElementsByClassName('cards');
    for (var i = 0; i < cards.length; i++) {
        cards[i].removeEventListener('click', hideCard);
    }
}

/**
 * Global function to create elements
 */
function createElement(tag, node, attr1, attrValue1, attr2, attrValue2, attr3, attrValue3) {
    var element = document.createElement(tag);
    if (attr1 != undefined) {
        element.setAttribute(attr1, attrValue1);
        if (attr2 != undefined) {
            element.setAttribute(attr2, attrValue2);
            if (attr3 != undefined)
                element.setAttribute(attr3, attrValue3);
        }
        node.appendChild(element);
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}