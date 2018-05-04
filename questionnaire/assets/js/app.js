var index = 0;
var finish = false;
var resultFinal = 0;

var p = extractUrlParams();
var reserved_code_media = getCodeMedia();

$("#f_phone").intlTelInput({
    utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
    initialCountry:"fr"
});

$(document).ready( function () {
    fillFieldsFromUrl();
});

$(".answer").hover(
    function() {
        $(this).addClass("active");
    }, function() {
        $(this).removeClass("active");
    }
).click( function() {
    if (finish)
        return;
    changeQuestion(index + 1, $(this).index());
});

$('#submit').click(function(e) {
    e.preventDefault();
    /*if (validateForm()) {
        $('#form').fadeOut(function () {
            $('#merci').fadeIn();
            $('footer').fadeIn();
        });*/
        sendData();
        sendDataRecommandation();
    //}
});
$('.header .btn-header').click( function(e) {
    $('#begin').fadeOut(function() {
        window.scroll(0, 0);
        $('#questions').fadeIn();
    });
});

$('#f_male').click(function() {
    $('#f_female').prop( "checked", false );
});
$('#f_female').click(function() {
    $('#f_male').prop( "checked", false );
});


function getCodeMedia() {
    if ("reserved_code_media" in p) {
        return p["reserved_code_media"];
    }
    else
        return "";
}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
}


function changeQuestion(nb, selected) {
    if (checkLastQuestion(nb, selected))
        return ;
    if (index > titleQuestions.length - 1)
        return ;


    selectedAnswer[nb - 1] = selected;
    hideElement(function() {
        $('#q-nb').text(nb + 1);
        $('#title').html(titleQuestions[nb]);
    });
    showElement(function() {
        removeActive();
    });

    index = nb;
}

function removeActive() {
    $('.answer').each(function () {
       $(this).removeClass('active')
    });
}

function checkLastQuestion(nb, selected) {
    var check = false;

    if (selectedAnswer.length === titleQuestions.length - 1) {
        selectedAnswer[nb - 1] = selected;
        finish = true;
        check = true;
        $('#questions').fadeOut(function() {
            $('#form').fadeIn(function() {
                window.scroll(0, 0);
            });
        });
    }
    return check;
}



function hideElement(_callback) {
    $('#b_summit').prop("disabled",true);
    $('#q-nb').fadeOut();
    $('#title').fadeOut( function() {
        _callback();
    });

}
function showElement(_callback) {
    $('#q-nb').fadeIn();
    $('#title').fadeIn();

    _callback();
}

function 	scrollTo(next){
    $('html, body').stop().animate({
        scrollTop: $(next).offset().top + 1
    }, 700, 'swing');
}

function validateForm() {
    var check = true;
    var selectedOption;
    if ($('#f_female').is(":checked"))
        selectedOption = "Madame";
    else if ($('#f_male').is(":checked"))
        selectedOption = "Monsieur";
    else
        selectedOption = "";


    $('.civilite-container *').css('color','black');
    $('#form input').each( function() {
        $(this).removeClass('red-border');

        if ($(this).hasClass('required')) {
            if ($(this).val() === "") {
                $(this).addClass('red-border');
                check = false;
            }
        }
    });

    if (selectedOption === "") {
        $('.civilite-container *').css('color','red');
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