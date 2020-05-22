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
    '1280': '/assets/video/background-video-large-2.mp4',
    '768' : '/assets/video/background-video-medium-2.mp4',
    '500' : '/assets/video/background-video-small-2.mp4'
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
    en: 'All our favourite places are waiting for us. Where will you go first?',
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

mapboxgl.accessToken = 'pk.eyJ1IjoianJyYW5raW4iLCJhIjoiY2s5dnQ5bjVuMDJzMzNtcnI1dnJuOTlocyJ9.SQv9UqQvK05yKgK9Xgxxrw';
var lastCoordinates = [-65.4894, 47.4170];
var lastZoom = 5;
var bounds = [
    [-69.138537, 44.343955], // Southwest coordinates
    [-63.446923, 48.405988] // Northeast coordinates
];
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jrrankin/ck9x4ba8z0r501ipas6h035kc/draft',
    center: lastCoordinates, // starting position [lng, lat],
    zoom: lastZoom,
    maxBounds: bounds
});

map.scrollZoom.disable();
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);
map.addControl(new mapboxgl.NavigationControl());
map.on('load', () => {
    fetch("https://api.mapbox.com/datasets/v1/jrrankin/ck9vtcwy20dtj2lk4etqjm4rd/features?access_token=pk.eyJ1IjoianJyYW5raW4iLCJhIjoiY2s5dnQ5bjVuMDJzMzNtcnI1dnJuOTlocyJ9.SQv9UqQvK05yKgK9Xgxxrw&limit=200")
    .then((response) => {
        if (response.status !== 200) {
            console.log('Looks like there was a problem fetching location data', response.status);
            return;
        }
        response.json().then((data) => {
            map.addSource('places', {
                'type': 'geojson',
                'data': data
            });
            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': 'heart',
                    'icon-allow-overlap': false,
                    'icon-size': 0.5
                }
            });
            map.on('click', 'places', (e) => {
                lastZoom = map.getZoom();
                lastCoordinates = map.getCenter();
                var coordinates = e.features[0].geometry.coordinates.slice();
                var name = e.features[0].properties.name;
                var content = e.features[0].properties.content;
                var address = e.features[0].properties.address;
                var image = e.features[0].properties.image;
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                var offsetX = 0;
                var offsetY = 0.02;
                var anchor = 'bottom';
                var maxWidth = '300px';
                if (window.innerWidth >= 1024) {
                    offsetX = 0.05;
                    offsetY = 0;
                    anchor = 'bottom-left';
                    maxWidth = 'none';
                }
                map.flyTo({
                    center: [coordinates[0] + offsetX, coordinates[1] + offsetY],
                    zoom: 12,
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });
                var popup = new mapboxgl.Popup({anchor: anchor, maxWidth: maxWidth})
                    .setLngLat(coordinates)
                    .setHTML(`<div class="popup-content"><p class="main">${content}</p><span class="address"><svg class="pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.59 75.01"><path d="M25.09,0l-.21,0-.07,0A25.5,25.5,0,0,0,3.19,37.91V38a1.91,1.91,0,0,0,.22.53l0,0L23.59,73.94a2.1,2.1,0,0,0,2.87.79,2.07,2.07,0,0,0,.79-.79L47.09,38.6l.13-.19a2,2,0,0,0,.15-.41,1.34,1.34,0,0,0,.07-.18,25.75,25.75,0,0,0,3.15-12.19A25.49,25.49,0,0,0,25.31,0Zm.19,10.22a14.68,14.68,0,0,1,0,29.35,14.68,14.68,0,0,1,0-29.35Z"/></svg>${name}<span class="separator">|</span>${address}</span></div><div class="image"><img src="${image}" /></div>`)
                    .addTo(map);
                popup.on('close', () => {
                    map.flyTo({
                        center: lastCoordinates,
                        zoom: lastZoom,
                        essential: true
                    });
                });
            });

            map.on('mouseenter', 'places', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
            });
        });
    })
    .catch((err) => {
        console.log('error!', err);
    })
});