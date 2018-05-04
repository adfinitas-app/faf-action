
function sendData() {
    var data = {
        "db": {
            "schema": "faf_cannes_2018",
            "db": {
                "email": pureField($('#f_email').val()),
                "phone": pureField(getPhone()),
                "firstname": pureField($('#f_firstname').val().toUpperCase()),
                "lastname": pureField($('#f_lastname').val().toUpperCase()),
                "civility": getCivility(),
                "sexe": getSexe(),
                "name":  pureField($('#f_firstname').val()) + " " + pureField($('#f_lastname').val()),
                "language": "fr_FR",
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

            /* Variables de l'événement, : préfixe : "ce_" */

            "event": "cannes_2018",				// Nom de l'événement à tracker si applicable. Non préfixé.
        },
        "mailjet": {
            "Email": pureField($('#f_email').val()),
            "Properties": {
                "firstname": pureField($('#f_firstname').val().toUpperCase()),
                "lastname": pureField($('#f_lastname').val().toUpperCase()),
                "sexe": getSexe(),
                "civility": getCivility(),
                "civility_dear": getCivilityDear(),
                "civility_long": getCivilityLong(),
                "personnalisation": getPersonnalisation(),
                "personnalisation_courte": getPersonnalisationCourte(),
                "name": pureField($('#f_firstname').val()) + " " + pureField($('#f_lastname').val()),
                "language": "fr_FR",
            },
            "addLists": getList(), // Noms de transmission des listes dans lesquelles ajouter le contact. Ne pas mettre les listes "Toute la base" et "Prospects" ici, le contact y est inséré par défaut (excepté dans "Prospect" si donateur).
            "delLists": []  // Noms de transmission des listes dans lesquelles supprimer le contact.
        }
    };
    if (pureField(getPhone()) != ""){
        data.woopra["cv_phone"] = pureField(getPhone());
        data.woopra["ce_phone"] = pureField(getPhone());
    }
    //console.log(data);
    makeCorsRequest(data);
}
function sendDataFinalBanniere(index) {
    var data = {

        "woopra": {
            "host": "aveuglesdefrance.org",			// Nom du projet dans Woopra.

            /* Variables de configuration de la fiche utilisateur, préfixe : "cv_" */

            "cv_email": pureField($('#f_email').val()),

            /* Variables de l'événement, : préfixe : "ce_" */

            "event": "nps",				// Nom de l'événement à tracker si applicable. Non préfixé.
            "ce_score": index
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
    if ($('#f_civility').val() === "Monsieur") {
        return 'Homme';
    }
    else {
        return 'Femme';
    }
}

function getCivility() {
    if ($('#f_civility').val() === "Monsieur") {
        return 'M';
    }
    else {
        return 'Mme';
    }
}

function getCivilityDear() {
    if ($('#f_civility').val() === "Monsieur") {
        return 'Cher';
    }
    else {
        return 'Chère';
    }
}

function getCivilityLong() {
    if ($('#f_civility').val() === "Monsieur") {
        return 'Monsieur';
    }
    else {
        return 'Madame';
    }
}
