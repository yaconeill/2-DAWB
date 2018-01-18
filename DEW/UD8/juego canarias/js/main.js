$('form').submit(function () {
    difficulty = parseInt($(this).find('input:checked').val());
    $('#difficulty').modal('hide');
    name = $('form').find('input[type=text]').val();
    notification('info', 'Bienvenido ' + name.toUpperCase());
    $('#user').text(name.toUpperCase());
    $('#init').prop("disabled", true);
    $game.show();
    init();
});