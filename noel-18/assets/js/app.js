
$(function() {
    let range = $('#range');

    range.on('input', function() {
        $(this).next().text($(this).val() + "€");

        let now = $(this).val();

        let v = 0;
        let plus = 0;

        if ($(window).width() > 640)
            plus = 13;
        else
            plus = 11;

        if (now == 80)
            v = plus;
        if (now == 100)
            v = plus * 2;
        if (now == 120)
            v = plus * 3;
        if (now == 140)
            v = plus * 4;
        if (now == 160)
            v = plus * 5;
        if (now == 180)
            v = plus * 6;
        if (now == 200)
            v = plus * 7;

        let ret = $(this).val() * (1/3);

        $(this).next().css('left', v + "%");
        $('#nb-don-return').text(Math.round(ret));
    });
});