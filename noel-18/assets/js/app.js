$(document).ready( function () {
    initRange();
    fillLink();
});


function initRange() {
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
}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};

function fillLink() {
    console.log('HERE');
    let p = extractUrlParams();

    let string = "";

    if (p['email'] && p['email'] !== "undefined")
        string += ("&email=" + p['email']);
    if (p['wv_email'] && p['wv_email'] !== "undefined")
        string += ("&email=" + p['wv_email']);
    if (p['wv_firstname'] && p['wv_firstname'] !== "undefined")
        string += ("&firstname=" + p['wv_firstname']);
    if (p['firstname'] && p['firstname'] !== "undefined")
        string += ("&firstname=" + p['firstname']);
    if (p['wv_lastname'] && p['wv_lastname'] !== "undefined")
        string += ("&lastname=" + p['wv_lastname']);
    if (p['lastname'] && p['lastname'] !== "undefined")
        string += ("&lastname=" + p['lastname']);

    $('.link-don').each(function() {
        let src = $(this).attr('href');
        $(this).attr('href', src + string);
    });
}