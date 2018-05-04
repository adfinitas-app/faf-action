/*window.fbAsyncInit = function() {
    FB.init({
        appId            : '161080551372481',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.9'
    });
    FB.AppEvents.logPageView();
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1538657022815637";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


$('#gif1').click( function() {
    var description = "J’ai obtenu " + resultFinal + "% de bonnes réponses, toi aussi teste tes connaissances ! http://action.la-spa.fr/cirque"
    FB.ui({
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
                object: {
                    'og:url': "https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA+-+LP+Cirque+2018/gif1.gif",
                    'og:title': "Animaux sauvages dans les Cirques : où en sommes-nous ?",
                    'og:description': description,
                    'og:image': "https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA+-+LP+Cirque+2018/gif1.gif"
                }
            })
        },
        function (response) {});
});


$('#gif2').click( function() {
    var description = "J’ai obtenu " + resultFinal + "% de bonnes réponses, toi aussi teste tes connaissances !"
    FB.ui({
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
                object: {
                    'og:url': "https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA+-+LP+Cirque+2018/gif2.gif",
                    'og:title': "Animaux sauvages dans les Cirques : où en sommes-nous ?",
                    'og:description': description,
                    'og:image': "https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA+-+LP+Cirque+2018/gif2.gif"
                }
            })
        },
        function (response) {});
});
*/