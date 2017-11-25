var size = 100;
var colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#6666ff",
    "#00cc00", "#cc6600", "#cc6699", "#99ffcc", "#666699"
];

function show() {
    var son = window.open('', '', 'width=' + size + ',height=' + size);

    var timer = setInterval(function() {
        if (size <= 400) {
            size += 5;
            var color = colors[Math.floor(Math.random() * colors.length)];
            son.window.document.getElementsByTagName('body')[0].style.backgroundColor = color;
            son.resizeTo(size, size);
            document.getElementById('text').innerHTML = 'Alto: ' + son.innerHeight +
                'Ancho: ' + son.window.innerWidth;
        } else
            clearInterval(timer);

    }, 500);
}

function autoResize(son) {
    var colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#6666ff",
        "#00cc00", "#cc6600", "#cc6699", "#99ffcc", "#666699"
    ];
    var color = colors[Math.floor(Math.random() * colors.length)];
    son.resizeTo(size, size);
    son.document.getElementsByTagName('body').style.backgroundColor = color;
}