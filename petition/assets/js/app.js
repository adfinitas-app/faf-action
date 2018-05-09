var checked = false;
preload([
    'https://s3.amazonaws.com/heroku-adfinitas-campaign/FAF-petition/rect-ok.jpg'
]);
$("#f_phone").intlTelInput({
    utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
    initialCountry:"fr"
});
var database = firebase.database();

$(document).ready( function () {
    fillFieldsFromUrl();




    var CountRef = firebase.database().ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-signatures').html(snapshot.val());
    });
});

function addVote() {
    var CountRef = firebase.database().ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-signatures').html(snapshot.val() + 1);
        firebase.database().ref('count').set(snapshot.val() + 1);
    });

}

$("label[for='optin']").click(function() {
    if (!checked) {
        $('#imgCheckbox').attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/FAF-petition/check-v.png');
        checked = true;
    } else {
        checked = false;
        $('#imgCheckbox').attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/FAF-petition/check.png');
    }
});

$('.body-container .text .btn').click(function() {
    $('#letter').show();
    $('#letter').focus();
});
$('#letter .close').click(function() {
    hideLetter();
});

$('#submit').click(function(e) {
    e.preventDefault();
    if (validateForm()) {
        addVote();
        $('.body-container').fadeOut(function() {
            $('.merci-container').fadeIn(function() {
                $('#banniere-end').slideDown("slow", function() {
                    $('.body').addClass('margin-body');
                });
            });
        });
        sendData();
    }
});

var text;
$("#banniere-end .form-satisfaction .answer-container div").hover(
    function() {
        text = $(this).text();
        $(this).text(".");
        $(this).css('background-image','url("https://s3.amazonaws.com/heroku-adfinitas-campaign/FAF-petition/rect-ok.jpg")');
    }, function() {
        $(this).text(text);
        $(this).css('background-image','none');
    }
).click( function() {
    sendDataFinalBanniere($(this).index() + 1);
    setTimeout(function () {
        $('#banniere-end').slideUp("slow", function() {
            $('.body').removeClass('margin-body');
        });
    }, 1000);
});


function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

function hideLetter() {
    $('#letter').hide();
}


function validateForm() {
    var check = true;
    var selectedOption = $('#f_civility option:selected');


    $('#f_civility').removeClass("red-border");
    $('#form input').each( function() {
        $(this).removeClass('red-border');

        if ($(this).hasClass('required')) {
            if ($(this).val() === "") {
                $(this).addClass('red-border');
                check = false;
            }
        }
    });

    if (selectedOption.val() === "") {
        $('#f_civility').addClass("red-border");
        check = false;
    }

    if ($('#f_email').val() !== "") {
        if (!validateEmail($('#f_email').val())) {
            $('#f_email').addClass('red-border');
            check = false;
        }
    }
    if ($('#f_phone').val() != "") {
        if (!$("#f_phone").intlTelInput("isValidNumber")) {
            $('#f_phone').addClass('red-border');
            check = false;
        }
    }


    return check;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};

function fillFieldsFromUrl() {
    var p = extractUrlParams();

    if (p['email'] && p['email'] !== "undefined")
        $("#f_email").val(p['email']);
    if (p['firstname'] && p['firstname'] !== "undefined")
        $("#f_firstname").val(p['firstname']);
    if (p['lastname'] && p['lastname'] !== "undefined")
        $("#f_lastname").val(p['lastname']);
    if (p['phone'] && p['phone'] !== "undefined")
        $("#f_phone").val(p['phone']);
}