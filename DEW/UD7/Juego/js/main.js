$(document).ready(function () {
    var label = $('label');
    label.hide();
    // label.each(function(){
    //     $(this).next().val($(this).text());
    // });
    var input = $('input[type=text]');
    input.each(function () {
        $(this).on('focus', function () {
            $(this).val('').prev().fadeIn().show();
        });
        $(this).on('blur', function () {
            if ($(this).val().length < 1)
                $(this).prev().fadeOut().hide();
        });
    });
});