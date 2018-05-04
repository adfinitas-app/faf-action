
function sendData() {
    var data = {
        "db": {
            "schema": "faf_scoring_2018",
            "db": {
                "email": pureField($('#f_email').val()),
                "phone": pureField(getPhone()),
                "firstname": pureField($('#f_firstname').val().toUpperCase()),
                "lastname": pureField($('#f_lastname').val().toUpperCase()),
                "civility": getCivility(),
                "sexe": getSexe(),
                "name":  pureField($('#f_firstname').val()) + " " + pureField($('#f_lastname').val()),
                "language": "fr_FR",
                "quest_1_militant": selectedAnswer[0],
                "quest_2_accessibilite": selectedAnswer[1],
                "quest_3_famille": selectedAnswer[2],
                "quest_4_connaissance": selectedAnswer[3],
                "quest_5_communication": selectedAnswer[4]
            }
        },
        "woopra": {
            "host": "aveuglesdefrance.org",			// Nom du projet dans Woopra.

            /* Variables de configuration de la fiche utilisateur, préfixe : "cv_" */

            "cv_email": pureField($('#f_email').val()),
            "cv_firstname": pureField($('#f_firstname').val().toUpperCase()),
            "cv_lastname": pureField($('#f_lastname').val().toUpperCase()),
            "cv_sexe": getSexe(),
            "cv_civility": getCivility(),
            "cv_name":  pureField($('#f_firstname').val()) + " " + pureField($('#f_lastname').val()),
            "cv_language": "fr_FR",

            /* Variables de l'événement, : préfixe : "ce_" */

            "event": "scoring_18",				// Nom de l'événement à tracker si applicable. Non préfixé.
            "ce_quest_1_militant": selectedAnswer[0],
            "ce_quest_2_accessibilite": selectedAnswer[1],
            "ce_quest_3_famille": selectedAnswer[2],
            "ce_quest_4_connaissance": selectedAnswer[3],
            "ce_quest_5_communication": selectedAnswer[4]
        }
    };
    if (pureField(getPhone()) != ""){
        data.woopra["cv_phone"] = pureField(getPhone());
        data.woopra["ce_phone"] = pureField(getPhone());
    }
    //console.log(data);
    makeCorsRequest(data);
}

function sendDataRecommandation() {
    var data = {
        "woopra": {
            "host": "aveuglesdefrance.org",			// Nom du projet dans Woopra.

            /* Variables de configuration de la fiche utilisateur, préfixe : "cv_" */

            "cv_email": pureField($('#f_email').val()),

            /* Variables de l'événement, : préfixe : "ce_" */

            "event": "nps",				// Nom de l'événement à tracker si applicable. Non préfixé.
            "score": selectedAnswer[5]
        }
    };
    //console.log(data);
    makeCorsRequest(data);
}


/*
 * Debut de la lib
 */

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}
function makeCorsRequest(data) {
    var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/0acf83f3-6030-452d-8288-91cd05a0db71/webhook/5419ff16-f74e-4291-90e9-5fcf1b15f0a2';
    var body = JSON.stringify(data);
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
}

/*
 * Fin de la lib
 */

function getPhone() {
    return $('#f_phone').intlTelInput("getNumber");
}

function getPersonnalisationCourte() {
    return getCivilityLong().toUpperCase() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getPersonnalisation() {
    return getCivilityDear() + " " + getCivilityLong().toUpperCase() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getList() {
    var data = [];

    if (getOptin() === "true") {
        data.push("cannes_petition_2018");
    }

    return data;
}

function pureField(string) {
    return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}


function getOptin() {
    if ($('#optin').is(":checked")) {
        return "false";
    }
    return "true";
}

function getSexe() {
    if ($('#f_female').is(":checked"))
        return "Femme";
    else {
        return 'Homme';
    }
}

function getCivility() {
    if ($('#f_female').is(":checked"))
        return "Mme";
    else {
        return 'M';
    }
}

function getCivilityDear() {
    if ($('#f_female').is(":checked"))
        return "Chère";
    else {
        return 'Cher';
    }
}

function getCivilityLong() {
    if ($('#f_female').is(":checked"))
        return "Madame";
    else {
        return 'Monsieur';
    }
}
