$(document).ready(function () {
    var currentUser = getCookie("currentUser");
    if (currentUser == null) {
        $(location).attr('href','login.html');
            return false;
    } else{
        init(currentUser);
    }
        
});

function init(currentUser) {
    $('#userName').text(currentUser);
    var game = new Phaser.Game(960, 600, Phaser.CANVAS, '');
    game.state.add('Boot', Game.Boot);
    game.state.add('Preloader', Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('Level1', Game.Level1);
    game.state.start('Boot');
}
