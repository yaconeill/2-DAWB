$(document).ready(function () {
    $game = $('#draggableImg');
    $game.hide();
    const RegEx = /^[a-zA-Z\s]*$/;
    var islasObj = [];
    var difficulty;
    var showIsland = [];
    var name;
    var score = 0;

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

    function randomIsland() {
        return Math.floor((Math.random() * 7) + 0);
    }

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

    function hideIsland() {
        $('.islas').children('div').hide();
        $('.islas').find('polygon').hide();
    }

    function init() {
        hideIsland();
        for (var i in islas) {
            let isla = new Isla(islas[i].name, islas[i].id, islas[i].imgMin, islas[i].imgFull);
            islasObj.push(isla);
        };

        var imgContainer = $('.imgIslas');
        for (let i = 0; i < difficulty; i++) {
            var rnd = nextRndImg();;
            var rndIsland = randomIsland();
            showIsland.push(islasObj[rndIsland].id);
            imgContainer.append($('<li class="ui-widget-content ui-corner-tr">'));
            imgContainer.children('li').eq(i).append($(`<img src="${islasObj[rndIsland].imgMin[rnd]}" id="${islasObj[rndIsland].id}_img" class="ui-widget-content items" />`));
            imgContainer.children('li').eq(i).append($(`<a href="${islasObj[rndIsland].imgFull[rnd]}" title="Hacer zoom" class="ui-icon ui-icon-zoomin">View larger</a>`));
        }

        showIsland.forEach(function (e) {
            $('.islas').find(`[id^=${e}]`).show();
        })

        // There's the gallery and the trash
        var $gallery = $("#gallery"),
            $trash = $("#trash");

        // Let the gallery items be draggable
        $('li', $gallery).draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "#draggableImg",
            // opacity: 0.7,
            helper: "clone",
            cursor: "move"
        });

        // Let the trash be droppable, accepting the gallery items
        showIsland.forEach(function (e) {
            var $element = $(`#${e}`);
            $element.droppable({
                accept: "#gallery > li",
                // accept: function (event, ui) {
                //     if ($(this).attr('id') == event[0].firstElementChild.id.slice(0, -4)) {
                //         // score += 50;
                //         // notification('success', 'Correcto, + 50 puntos: Puntuación ' + score);
                //         return true;
                //     }
                // },
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


        // Let the gallery be droppable as well, accepting items from the trash
        $gallery.droppable({
            accept: "#trash li",
            classes: {
                "ui-droppable-active": "custom-state-active"
            },
            drop: function (event, ui) {
                recycleImage(ui.draggable);
            }
        });

        // Image deletion function
        var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
        function deleteImage($item, $element) {
            $item.fadeOut(function () {
                var $list = $("ul", $element).length ?
                    $("ul", $element) :
                    $("<ul class='gallery ui-helper-reset'/>").appendTo($element);

                $item.find("a.ui-icon-trash").remove();
                $item.append(recycle_icon).appendTo($list).fadeIn(function () {
                    $item
                        .animate({ width: "48px" })
                        .find("img")
                        .animate({ height: "36px" });
                });
            });
        }

        // Image recycle function
        // var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
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
    }

});

toastr.options.closeButton = true;
toastr.options.positionClass = "toast-bottom-right";
function notification(type, message) {
    if (type == 'success') {
        toastr.success(message, '<i>Éxito</i>');
    } else if (type == 'error') {
        toastr.error(message, 'Error');
    } else if (type == 'warning') {
        toastr.warning(message, 'Peligro');
    } else {
        toastr.info(message, 'Información');
    }
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