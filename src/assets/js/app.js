import $ from 'jquery';
import validate from 'jquery-validation';

//import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
//require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


//$(document).foundation();

if (document.documentElement.lang.toLowerCase() === 'fr') {
    const translationScript = document.createElement('script');
    translationScript.type = 'text/javascript';
    translationScript.src = "https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/localization/messages_fr.min.js";
    $("head").append(translationScript);
}

var backgroundVideos = {
    '1280': '/assets/video/background-video-large.mp4',
    '768' : '/assets/video/background-video-medium.mp4',
    '500' : '/assets/video/background-video-small.mp4'
};

var currentVideo = null;

function updateVideoSource() {
    var el = $('video.background');

    var width = $(window).width();
    var video = backgroundVideos['500'];
    
    for (const size in backgroundVideos) {
        if (width > parseInt(size)) {
            video = backgroundVideos[size];
        }
    }

    if (currentVideo != video) {
        el.empty().append(`<source src="${video}" type="video/mp4">`);
    }
}

$(window).resize(updateVideoSource);
updateVideoSource();

$('#newsletter-form').validate({
    submitHandler: function(form) {
        $.ajax({
            url: form.action,
            type: form.method,
            data: $(form).serialize(),
            beforeSubmit: function() {
                $('#newsletter-form :input').prop('disabled', true);
            },
            success: function(response) {
                $('#newsletter-form').fadeOut();
                $('#response').html(response.message);
            },
            error: function(response) {
                $('#newsletter-form :input').prop('disabled', false);
            }
        });
    }
});

const shareMessage = {
    en: 'All the places we love are waiting for us. Where will you go first? #NBalways',
    fr: 'Tellement de choses nous ont manqué. Vos lieux préférés n’attendent que vous. #NBAlways'
}

const shareURL = {
    en: 'https://nbalways.ca',
    fr: 'https://nbtoujours.ca'
}

$('.facebook-share-button').click((event) => {
    event.preventDefault();
    FB.ui({
        method: 'share',
        href: shareURL[document.documentElement.lang.toLowerCase()],
        quote: shareMessage[document.documentElement.lang.toLowerCase()]
      }, function(response){});
});