$(document).ready(function () {
    $game = $('#draggableImg');
    $game.hide();
    const RegEx = /^[a-zA-Z\s]*$/;
    var $modal = $('#difficulty');
    var islasObj = [];
    var difficulty;
    var name;
    var valid = false;
    var score = 0;
    // There's the gallery and the trash
    var $gallery = $("#gallery");
    var $islaClass = $('.islas');

    Isla = function (name, id, imgMin, imgFull) {
        this.name = name;
        this.id = id;
        this.imgMin = imgMin;
        this.imgFull = imgFull;
    }

    $(function () {
        $('#fullName').resizable();
    });

    var nextRndImg = randomFromListGenerator([0, 1, 2, 3, 4]);
    // var randomIsland = randomFromListGenerator([0, 1, 2, 3, 4, 5, 6]);
    function randomIsland() {
        return Math.floor((Math.random() * 7) + 0);
    }

    var nameInput = $('form').find('input[type=text]');
    nameInput.blur(function () {
        if (!validateAny(nameInput, RegEx)) {
            notification('warning', 'Solo letras y espacios');
            nameInput.removeClass('valid').addClass('invalid');
        }
        else if (nameInput.val().length == 0)
            nameInput.removeClass('valid').addClass('invalid');
        else {
            nameInput.removeClass('invalid').addClass('valid');
            valid = true;
        }

    });

    $('#submit').click(function () {
        preload();
    });

    function preload(reset) {

        if (valid || nameInput.length > 1) {
            name = nameInput.val()
            difficulty = parseInt($('form').find('input:checked').val());
            $modal.modal('hide');
            init();
        } else {
            nameInput.removeClass('valid').addClass('invalid');
            notification('warning', 'Debe introducir su nombre');
        }
    }

    function hideIsland() {
        $islaClass.children('div').hide();
        $islaClass.find('polygon').hide();
        $islaClass.find('[id*=Text]').hide();
    }

    function init() {
        var showIsland = [];
        // $('#init').text('Reiniciar juego');
        $('#init').prop("disabled", true);
        // $('#init').click(function () {
        //     reset();
        // });

        notification('info', 'Hola ' + name.toUpperCase());
        $('#user').text(name.toUpperCase());
        // $('#init').prop("disabled", true);
        $game.show();
        hideIsland();

        for (var i in islas) {
            let isla = new Isla(islas[i].name, islas[i].id, islas[i].imgMin, islas[i].imgFull);
            islasObj.push(isla);
        };

        var imgContainer = $('.imgIslas');
        var noImgRepeat = [-1 + ' ' + -1];
        var prueba = false;
        for (let i = 0; i < difficulty; i++) {
            var rndIsland = randomIsland();
            do {
                var rnd = nextRndImg();
            } while (noImgRepeat.includes(rndIsland + ' ' + rnd));

            showIsland.push(islasObj[rndIsland].id);
            imgContainer.append($('<li class="ui-widget-content ui-corner-tr">'));
            imgContainer.children('li').eq(i).append($(`<img src="${islasObj[rndIsland].imgMin[rnd]}" id="${islasObj[rndIsland].id}_img" class="ui-widget-content items" />`));
            imgContainer.children('li').eq(i).append($(`<a href="${islasObj[rndIsland].imgFull[rnd]}" title="Hacer zoom" class="ui-icon ui-icon-zoomin">View larger</a>`));
            noImgRepeat.push(rndIsland + ' ' + rnd);
        }

        showIsland.forEach(function (e) {
            $islaClass.find(`[id^=${e}]`).show();
        });

        // #region - jqueryUI


        // Let the gallery items be draggable
        $('li', $gallery).draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "#draggableImg",
            helper: "clone",
            cursor: "move"
        });

        // Let the trash be droppable, accepting the gallery items
        showIsland.forEach(function (e) {
            var $element = $(`#${e}`);
            $element.droppable({
                accept: "#gallery > li",
                classes: {
                    "ui-droppable-active": "ui-state-highlight"
                },
                drop: function (event, ui) {
                    if ($(this).attr('id') != ui.draggable[0].firstElementChild.id.slice(0, -4)) {
                        score -= 10;
                        notification('error', 'Isla incorrecta, -10 puntos: Puntuación ' + score);
                    } else {
                        deleteImage(ui.draggable, $element);
                        score += 50;
                        notification('success', 'Correcto, + 50 puntos: Puntuación ' + score);
                    }
                }
            });
        })

        // // Let the gallery be droppable as well, accepting items from the trash
        // $gallery.droppable({
        //     accept: "#trash li",
        //     classes: {
        //         "ui-droppable-active": "custom-state-active"
        //     },
        //     drop: function (event, ui) {
        //         recycleImage(ui.draggable);
        //     }
        // });

        // Image deletion function
        function deleteImage($item, $element) {
            $item.fadeOut(function () {
                var $list = $("ul", $element).length ?
                    $("ul", $element) :
                    $("<ul class='gallery ui-helper-reset'/>").appendTo($element);

                $item.find("a.ui-icon-trash").remove();
                $item.appendTo($list).fadeIn(function () {
                    $item
                        .animate({ width: "48px" })
                        .find("img")
                        .animate({ height: "36px" });
                    endGame();
                });
            });
        }

        // Image recycle function
        function recycleImage($item) {
            $item.fadeOut(function () {
                $item.find("a.ui-icon-refresh").remove().end().css("width", "96px")
                    .find("img").css("height", "72px")
                    .end().appendTo($gallery).fadeIn();
            });
        }

        // Image preview function, demonstrating the ui.dialog used as a modal window
        function viewLargerImage($link) {
            var src = $link.attr("href"),
                title = $link.siblings("img").attr("alt"),
                $modal = $("img[src$='" + src + "']");

            if ($modal.length) {
                $modal.dialog("open");
            } else {
                var img = $("<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />")
                    .attr("src", src).appendTo("body");
                setTimeout(function () {
                    img.dialog({
                        title: title,
                        width: 400,
                        modal: true
                    });
                }, 1);
            }
        }

        // Resolve the icons behavior with event delegation
        $("ul.gallery > li").on("click", function (event) {
            var $item = $(this),
                $target = $(event.target);

            if ($target.is("a.ui-icon-trash")) {
                deleteImage($item);
            } else if ($target.is("a.ui-icon-zoomin")) {
                viewLargerImage($target);
            } else if ($target.is("a.ui-icon-refresh")) {
                recycleImage($item);
            }
            return false;
        });
        // #endregion

        function endGame() {
            if ($('#gallery').children().length == 0) {
                $('#endGame').find('p').text('Fin del juego. Puntuación: ' + score + ' ¿Quieres seguir jugando?');
                $("#endGame").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Continuar": function () {
                            $(this).dialog("close");
                            reset();
                        },
                        Cancelar: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        }

        function reset() {
            score = 0;
            $gallery.children().remove();
            $islaClass.children('div').children().each(function () {
                $(this).children().remove();
            });
            $('label[for="fullName"]').hide();
            nameInput.prop('disabled', true);
            $modal.modal('show');
        }
    }
});

toastr.options.closeButton = true;
toastr.options.positionClass = "toast-bottom-right";
function notification(type, message) {
    if (type == 'success')
        toastr.success(message, '<i>Éxito</i>');
    else if (type == 'error')
        toastr.error(message, 'Ups!!');
    else if (type == 'warning')
        toastr.warning(message, 'Algo ha ido mal!');
    else
        toastr.info(message, 'Bienvenido');
}

function validateAny(input, rexExp) {
    let result;
    let field = rexExp.test(input.val());
    if (field)
        result = true;
    else
        result = false;
    return result;
}

var randomFromListGenerator = function (list) {
    var position = 0;

    for (var i = 0, l = list.length; i < l; i++) {
        var random = Math.floor((Math.random() * l));
        var aux = list[i];
        list[i] = list[random];
        list[random] = aux;
    }

    return function () {
        return list[position++ % list.length];
    }
}