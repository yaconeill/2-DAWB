// create initial div element
var body = document.getElementsByTagName('body')[0];
createElement('div', body, 'id', 'container');

function createElement(tag, node, attribute, value) {
    var element = document.createElement(tag);
    if (attribute != null)
        element.setAttribute(attribute, value);
    node.appendChild(element);
}