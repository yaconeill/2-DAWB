$('use').on('click', function () {
    $(this).toggleClass('selected');
});

Taza = function (id, x , y, selected) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.selected = selected;
}
var tazaColl = [];
var tazas = $('use');

tazas.each(function () {
    var id = parseInt($('use').first().attr('id').split('taza').pop());
    
    var taza = new Taza(id, )
})

