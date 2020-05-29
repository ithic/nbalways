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
};

const shareURL = {
    en: 'https://nbalways.ca',
    fr: 'https://nbtoujours.ca'
};

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
var lastZoom = 6;
var bounds = [
    [-71.7540616, 44.829648], // Southwest coordinates
    [-60.7738239, 48.3619851] // Northeast coordinates
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

const mapdata = {
    'en': {
        "features": [
          {
            "type": "Feature",
            "properties": {
              "name": "Fundy National Park",
              "address": "8642 Route 114, Alma",
              "content": "We're hoping to snag one of the Yurts at Fundy and dine al fresco by the ocean our whole time there. ",
              "image": "Fundy National Park.jpg",
              "url": "https://www.pc.gc.ca/en/pn-np/nb/fundy"
            },
            "geometry": {
              "coordinates": [
                -64.950857,
                45.595537
              ],
              "type": "Point"
            },
            "id": "070e0cc5923ae7e6c6f0831e7e939193"
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Ministers Island",
              "address": "",
              "content": "Van Horne Estate was the original physical distancing trend setter. Can't wait for the next low tide to drive across the ocean for a visit! ",
              "image": "Ministers Island.jpg",
              "url": "https://www.ministersisland.net/"
            },
            "geometry": {
              "coordinates": [
                -67.042308,
                45.107784
              ],
              "type": "Point"
            },
            "id": "3c0f05aa3e4737f148da283616c482ad"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "57 Acadie St., Bouctouche",
              "content": "I can already hear the music! The contagious Acadian joie de vivre is exactly what we need this summer at le Pays de la Sagouine. ",
              "name": "Le Pays de la Sagouine",
              "image": "Le Pays de la Sagouine.jpg",
              "url": "https://www.sagouine.com/en/"
            },
            "geometry": {
              "coordinates": [
                -64.715473,
                46.457929
              ],
              "type": "Point"
            },
            "id": "address.113653526697432"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "interpolated",
              "address": "232 Des Huîtres Rd., Haut-Shippagan",
              "content": "Get me to the glamp ground. I need to get out of my house!",
              "name": "Cielo Glamping Maritime",
              "image": "Cielo Glamping.jpg",
              "url": "https://en.glampingcielo.com/"
            },
            "geometry": {
              "coordinates": [
                -64.767022,
                47.739175
              ],
              "type": "Point"
            },
            "id": "address.1961311480352980"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "860 Front Mountain Road, Moncton",
              "content": "Looking forward to raising a glass with some of the nicest views of the city at Magnetic Hill Winery.",
              "name": "Magnetic Hill Winery",
              "image": "Magnetic Hill Winery.jpg",
              "url": "https://magnetichillwinery.com/"
            },
            "geometry": {
              "coordinates": [
                -64.890489,
                46.140567
              ],
              "type": "Point"
            },
            "id": "address.2879449216878240"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "220 King Street, Saint Andrews",
              "content": "Excited to wander the beautiful gardens at Kingsbrae and enjoy the magic of the blossoms (also the perfect backdrop for IG shots)!",
              "name": "Kingsbrae Garden",
              "image": "Kingsbrae.jpg",
              "url": "https://www.kingsbraegarden.com/"
            },
            "geometry": {
              "coordinates": [
                -67.046339,
                45.079274
              ],
              "type": "Point"
            },
            "id": "address.3730081443775330"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "interpolated",
              "address": "5804 NB-102, Prince William",
              "content": "Stepping back in time at Kings Landing is just the getaway I've been dreaming of. ",
              "name": "Kings Landing",
              "image": "Kings Landing.jpg",
              "url": "https://kingslanding.nb.ca/"
            },
            "geometry": {
              "coordinates": [
                -66.978016,
                45.877017
              ],
              "type": "Point"
            },
            "id": "address.4934928059240438"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "415 Main St, St. Martins",
              "content": "Eating seafood on the ocean floor is next level and a meal we will never forget. Looking forward to trying epic culinary experiences this summer.",
              "name": "Red Rock Adventure",
              "image": "Red Rock.jpg",
              "url": "https://www.bayoffundyadventures.com/"
            },
            "geometry": {
              "coordinates": [
                -65.533215,
                45.358865
              ],
              "type": "Point"
            },
            "id": "address.5655783543400784"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "45 De l'Église St., Edmundston",
              "content": "Brut IPA #3 is my go-to summer beer. I can't wait to grab a couple bottles and cozy up by the campfire.",
              "name": "Les Brasseurs du Petit-Sault",
              "image": "Les Brasseurs.jpg",
              "url": "https://www.petitsault.com/home"
            },
            "geometry": {
              "coordinates": [
                -68.327412,
                47.366337
              ],
              "type": "Point"
            },
            "id": "address.7099390428001994"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "street",
              "address": "1 Lower Campus Road, St. Andrews",
              "content": "We miss Loki & Snorkel! Can't wait to see those furry faces.",
              "name": "Huntsman Fundy Discovery Aquarium",
              "image": "Huntsman Fundy Discovery Aquarium.jpg",
              "url": "https://www.huntsmanmarine.ca/fundy-discovery-aquarium/"
            },
            "geometry": {
              "coordinates": [
                -67.080048,
                45.084629
              ],
              "type": "Point"
            },
            "id": "address.8239661575638492"
          },
          {
            "type": "Feature",
            "properties": {
              "content": "A highlight reel of NB beer and wine is what I'm looking forward to most &ndash; excited to see what Uncorked will share!",
              "name": "Uncorked Tours",
              "address": "3-139 Leinster St. Saint John",
              "image": "uncorked.jpg",
              "url": "https://www.uncorkednb.com/"
            },
            "geometry": {
              "coordinates": [
                -66.056715,
                45.273153
              ],
              "type": "Point"
            },
            "id": "c66d71c2109d734d757596b12cfcf80b"
          },
          {
            "type": "Feature",
            "properties": {
              "address": "McNamee",
              "name": "Wilson's Sporting Camps",
              "content": "I know there's an Atlantic salmon with my name on it this year. I can't wait to get out on the river at Wilson's. ",
              "image": "Wilsons Sporting Camps.jpg",
              "url": "https://wilsonscamps.nb.ca/"
            },
            "geometry": {
              "coordinates": [
                -66.309839,
                46.505417
              ],
              "type": "Point"
            },
            "id": "postcode.18004809234808030"
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Arpin Canoe Restigouche ",
              "address": "8 Arpin St., Kedgwick River",
              "content": "There's nothing like paddling the Restigouche ... hands down the prettiest scenery in the province.",
              "image": "arpin_canoe_.jpg",
              "url": "https://www.canoerestigouche.ca/en"
            },
            "geometry": {
              "coordinates": [
                -67.4932651,
                47.6621316
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Villégiature Deux Rivières Resort",
              "address": "100 Deux Rivieres St, Tracadie",
              "content": "Our own little slice of paradise! Who says we need to travel far to experience a world-class resort? ",
              "image": "Villegiature Deux Rivieres Resort.jpg",
              "url": "http://villegiature-deux-rivieres-resort.gonewbrunswick.com/en/"
            },
            "geometry": {
              "coordinates": [
                -64.9002743,
                47.5200665
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Mactaquac Provincial Park",
              "address": "1265 NB-105, Mactaquac",
              "content": "One of the best spots to enjoy the Saint John river! Can't wait to take a dip in the freshwater and retreat back to a cozy campsite this summer. ",
              "image": "Mactaquac.jpg",
              "url": "https://parcsnbparks.ca/Mactaquac"
            },
            "geometry": {
              "coordinates": [
                -66.8970321,
                45.9611998
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Youghall Beach",
              "address": "1525 Queen Elizabeth Dr., Bathurst",
              "content": "Ever wonder why NB is famous for its beaches? This is IT. It has become our family tradition to hit the beach here every summer!  ",
              "image": "Bathurst - Youghall Beach-0368.jpg",
              "url": "https://www.bathurst.ca/en/services/recreation-and-tourism/74/youghall-beach"
            },
            "geometry": {
              "coordinates": [
                -65.6260464,
                47.657714
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Hopewell Rocks Park",
              "address": "131 Discovery Rd., Hopewell Cape",
              "content": "Each time I walk the ocean floor I'm in awe! Exploring the rocks at high tide will be the first thing on my bucket list this summer.",
              "image": "hopewell.jpg",
              "url": "https://www.thehopewellrocks.ca/index.php/en/home"
            },
            "geometry": {
              "coordinates": [
                -64.5808473,
                45.8171575
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Shake Shed",
              "address": "230 Main St, Fredericton",
              "content": "Absolutely LIVING for the feature flavour drops every few weeks at the Shake Shed! But when in doubt - the birthday cake shake never fails! ",
              "image": "Shake-Shed.jpg",
              "url": "https://www.theshakeshed.com/"
            },
            "geometry": {
              "coordinates": [
                -66.6524654,
                45.9764603
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Beaverbrook Art Gallery",
              "address": "703 Queen Street, Fredericton",
              "content": "I think Salvador Dali's Santiago el Grande speaks for itself. The Beaverbrook Art Gallery is must!",
              "image": "beaverbrook.jpg",
              "url": "http://beaverbrookartgallery.org/en/"
            },
            "geometry": {
              "coordinates": [
                -66.6377392,
                45.9599848
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Honeybeans Cafe",
              "address": "180 Water St, St. Andrews",
              "content": "The fresh puff pastries combined with the infectious smiles of the staff makes Honeybeans Cafe absolutely essential. ",
              "image": "Honeybeans.jpg",
              "url": "https://www.facebook.com/honeybeanscafe/"
            },
            "geometry": {
              "coordinates": [
                -67.0558196,
                45.0742426
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "New River Beach Provinvial Park",
              "address": "78 New River Beach Rd",
              "content": "New River Beach is a rare gem for camping right off the beach. Our family loves this little getaway on the Bay of Fundy. ",
              "image": "2016-new_river_beach-photo_by_aaron_mckenzie_fraser_50.jpg",
              "url": "https://parcsnbparks.ca/delaplageNewRiver?List"
            },
            "geometry": {
              "coordinates": [
                -66.5318122,
                45.1364726
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Parlee Beach Provincial Park",
              "address": "45 Parlee Beach Rd. Pointe-du-Chêne",
              "content": "Parlee Beach has easily become the quintessential spot for a warm summer day. I'm planning for many sunset walks here this summer! ",
              "image": "parlee option1.jpg",
              "url": "https://parcsnbparks.ca/ParleeBeach?List"
            },
            "geometry": {
              "coordinates": [
                -64.5119872,
                46.2397022
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Mount Carleton Provincial Park",
              "address": "Saint-Quentin",
              "content": "Mount Sagamook is easily the most challenging AND rewarding hike in the province. That spectacular view from the summit makes it all worth it!",
              "image": "Mount Carleton.jpg",
              "url": "https://parcsnbparks.ca/MountCarleton?List"
            },
            "geometry": {
              "coordinates": [
                -66.8970546,
                47.4176151
              ],
              "type": "Point"
            }
          },
        ],
        "type": "FeatureCollection"
      },
    'fr': {
        "features": [
          {
            "type": "Feature",
            "properties": {
              "name": "Île Ministers",
              "address": "",
              "content": "Le luxueux domaine de Van Horne aurait été un endroit rêvé pour s'isoler! On attend impatiemment la prochaine marée basse pour s'y rendre.",
              "image": "Ministers Island.jpg",
              "url": "https://www.ministersisland.net/"
            },
            "geometry": {
              "coordinates": [
                -67.042308,
                45.107784
              ],
              "type": "Point"
            },
            "id": "3e46876fc8634747da63dbb8a95edf6b"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "street",
              "address": "1 Lower Campus Road, St. Andrews",
              "content": "Nous avons hâte de revoir Loki et Snorkel, les gentils phoques de l'aquarium.",
              "name": "Aquarium-découverte Fundy de Huntsman",
              "image": "Huntsman Fundy Discovery Aquarium.jpg",
              "url": "https://www.huntsmanmarine.ca/fundy-discovery-aquarium/"
            },
            "geometry": {
              "coordinates": [
                -67.080048,
                45.084629
              ],
              "type": "Point"
            },
            "id": "4a7893ca10b85ba5a6d986a9f313644b"
          },
          {
            "type": "Feature",
            "properties": {
              "address": "McNamee",
              "name": "Wilson's Sporting Camps",
              "content": "C'est cette année que ça se passe, je vais enfin attraper un saumon. Très hâte d'aller pêcher sur la Miramichi à la pourvoirie Wilson's.",
              "image": "Wilsons Sporting Camps.jpg",
              "url": "https://wilsonscamps.nb.ca/"
            },
            "geometry": {
              "coordinates": [
                -66.309839,
                46.505417
              ],
              "type": "Point"
            },
            "id": "56fa0e88592f87d25377464c80c5877a"
          },
          {
            "type": "Feature",
            "properties": {
              "content": "On se planifie une visite-dégustation avec Uncorked pour redécouvrir les bières et les vins de chez nous!",
              "name": "Uncorked Tours",
              "address": "139 rue Leinster, app. 3, Saint John",
              "image": "uncorked.jpg",
              "url": "https://www.uncorkednb.com/"
            },
            "geometry": {
              "coordinates": [
                -66.056715,
                45.273153
              ],
              "type": "Point"
            },
            "id": "57a705faae6e16be982f133122c20b62"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "57, rue Acadie, Bouctouche",
              "content": "On entend la musique jusqu'ici! Le Pays de la Sagouine est un incontournable de la joie de vivre acadienne; en plein ce qu'il nous faut cet été!",
              "name": "Le Pays de la Sagouine",
              "image": "Le Pays de la Sagouine.jpg",
              "url": "https://www.sagouine.com/fr/"
            },
            "geometry": {
              "coordinates": [
                -64.715473,
                46.457929
              ],
              "type": "Point"
            },
            "id": "74274947c34d179261c781e1b1f60a73"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "interpolated",
              "address": "232, ch. des Huîtres, Haut-Shippagan",
              "content": "Il est grand temps d'aller au terrain de « glamping », ça fera du bien de sortir de la maison!",
              "name": "Cielo Glamping Maritime",
              "image": "Cielo Glamping.jpg",
              "url": "https://www.glampingcielo.com/"
            },
            "geometry": {
              "coordinates": [
                -64.767022,
                47.739175
              ],
              "type": "Point"
            },
            "id": "766d5902d795c05bae99f6c6d00c189e"
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Parc national Fundy",
              "address": "8642, route 114, Alma",
              "content": "Nous espérons réserver une des yourtes à Fundy et manger au bord de l'océan pendant tout notre séjour. ",
              "image": "Fundy National Park.jpg",
              "url": "https://www.pc.gc.ca/fr/pn-np/nb/fundy"
            },
            "geometry": {
              "coordinates": [
                -64.950857,
                45.595537
              ],
              "type": "Point"
            },
            "id": "954c52deb3c37e96d599fd5b91675a26"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "415, rue Main, St. Martins",
              "content": "Notre inoubliable repas de fruits de mer sur le fond de l'océan l'an dernier nous donne le goût de vivre d'autres expériences gourmandes cet été.",
              "name": "Red Rock Adventure",
              "image": "Red Rock.jpg",
              "url": "https://www.bayoffundyadventures.com/"
            },
            "geometry": {
              "coordinates": [
                -65.533215,
                45.358865
              ],
              "type": "Point"
            },
            "id": "95b07092d1f1339d8157c8b2e60fb589"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "interpolated",
              "address": "5804, route 102, Prince William",
              "content": "On se croirait dans un roman d'époque. Kings Landing est parfait pour faire un voyage dans le temps.",
              "name": "Kings Landing",
              "image": "Kings Landing.jpg",
              "url": "https://kingslanding.nb.ca/?lang=fr"
            },
            "geometry": {
              "coordinates": [
                -66.978016,
                45.877017
              ],
              "type": "Point"
            },
            "id": "b7dee866d6cffec865da845099884c89"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "45, rue de l'Église, Edmundston",
              "content": "Ma bière de prédilection pour l'été, c'est la Brut IPA #3. J'ai tellement hâte d'en boire autour du feu.",
              "name": "Les Brasseurs du Petit-Sault",
              "image": "Les Brasseurs.jpg",
              "url": "https://www.petitsault.com/"
            },
            "geometry": {
              "coordinates": [
                -68.327412,
                47.366337
              ],
              "type": "Point"
            },
            "id": "d313da7851d2f2ce7e96fb39856d9dcc"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "220, rue King, St. Andrews",
              "content": "Nous avons hâte de voir les fleurs du jardin Kingsbrae, un endroit magique pour se promener (et prendre des photos pour Instagram).",
              "name": "Jardin Kingsbrae",
              "image": "Kingsbrae.jpg",
              "url": "https://www.kingsbraegarden.com/"
            },
            "geometry": {
              "coordinates": [
                -67.046339,
                45.079274
              ],
              "type": "Point"
            },
            "id": "d618b30956881a33d3007565711a22a8"
          },
          {
            "type": "Feature",
            "properties": {
              "accuracy": "point",
              "address": "860, ch. Front Mountain, Moncton",
              "content": "On a hâte de boire un verre devant une vue imprenable sur Moncton au vignoble de Magnetic Hill.",
              "name": "Magnetic Hill Winery",
              "image": "Magnetic Hill Winery.jpg",
              "url": "https://magnetichillwinery.com/fr/"
            },
            "geometry": {
              "coordinates": [
                -64.890489,
                46.140567
              ],
              "type": "Point"
            },
            "id": "ecc504a4de15458bdac1f942cb5815a4"
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Arpin canoë Restigouche",
              "address": "8, rue Arpin, Kedgwick River",
              "content": "Le paysage de la rivière Restigouche ressemble aux tableaux des grands peintres. Je rêve de retourner y faire du canot.",
              "image": "arpin_canoe_.jpg",
              "url": "https://www.canoerestigouche.ca/"
            },
            "geometry": {
              "coordinates": [
                -67.4932651,
                47.6621316
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Villégiature Deux Rivières Resort",
              "address": "100, rue Deux Rivières, Tracadie",
              "content": "Notre petit coin de paradis préféré. Pas besoin d'aller loin pour retrouver l'ambiance d'un centre de villégiature!",
              "image": "Villegiature Deux Rivieres Resort.jpg",
              "url": "http://villegiature-deux-rivieres-resort.gonewbrunswick.com/en/"
            },
            "geometry": {
              "coordinates": [
                -64.9002743,
                47.5200665
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Parc provincial Mactaquac",
              "address": "1265, route 105, Mactaquac",
              "content": "Un de mes endroits favoris le long de la rivière Saint-Jean. À moi les journées de baignade et les soirées autour du feu au camping!",
              "image": "Mactaquac.jpg",
              "url": "https://parcsnbparks.ca/Mactaquac"
            },
            "geometry": {
              "coordinates": [
                -66.8970321,
                45.9611998
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Parc de la plage Youghall",
              "address": "1525, prom. Queen Elizabeth, Bathurst",
              "content": "Pas étonnant que le Nouveau-Brunswick soit réputé pour ses plages. Youghall fait partie de nos traditions familiales de l'été.",
              "image": "Bathurst - Youghall Beach-0368.jpg",
              "url": "https://www.bathurst.ca/fr/services/recreation-and-tourism/74/youghall-beach"
            },
            "geometry": {
              "coordinates": [
                -65.6260464,
                47.657714
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Parc des rochers Hopewell",
              "address": "131, chemin Discovery, Hopewell Cape",
              "content": "Le phénomène des marées me fascine toujours autant! Cet été je prévois marcher sur le fond marin et faire du kayak autour des rochers Hopewell.",
              "image": "hopewell.jpg",
              "url": "https://rochershopewellrocks.ca/index.php/fr/home"
            },
            "geometry": {
              "coordinates": [
                -64.5808473,
                45.8171575
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Shake Shed",
              "address": "230, rue Main, Fredericton",
              "content": "Je salive rien qu'à penser aux saveurs de la semaine des laits frappés gourmets de Shake Shed. J'ai bien l'intention de me payer la traite cet été!",
              "image": "Shake-Shed.jpg",
              "url": "https://www.theshakeshed.com/"
            },
            "geometry": {
              "coordinates": [
                -66.6524654,
                45.9764603
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Galerie d'art Beaverbrook",
              "address": "703, rue Queen, Fredericton",
              "content": "La Galerie d'art Beaverbrook contient tellement de trésors à découvrir. L'immense tableau de Salvador Dali m'impressionne chaque fois.",
              "image": "beaverbrook.jpg",
              "url": "http://beaverbrookartgallery.org/fr/"
            },
            "geometry": {
              "coordinates": [
                -66.6377392,
                45.9599848
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Honeybeans Cafe",
              "address": "180, rue Water, St. Andrews",
              "content": "Avec ses gâteries savoureuses et son personnel chaleureux, le café Honeybeans n'est pas un luxe, c'est un besoin essentiel! ",
              "image": "Honeybeans.jpg",
              "url": "https://www.facebook.com/honeybeanscafe/"
            },
            "geometry": {
              "coordinates": [
                -67.0558196,
                45.0742426
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Parc provincial de la plage New River",
              "address": "78, ch. New River Beach",
              "content": "Le parc de la plage New River Beach est l'endroit préféré de ma famille pour camper au bord de la baie de Fundy. ",
              "image": "2016-new_river_beach-photo_by_aaron_mckenzie_fraser_50.jpg",
              "url": "https://parcsnbparks.ca/delaplageNewRiver?List"
            },
            "geometry": {
              "coordinates": [
                -66.5318122,
                45.1364726
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Parc provincial de la plage Parlee",
              "address": "45, rue Parlee Beach, Pointe-du-Chêne",
              "content": "La plage Parlee est ma destination de rêve des beaux jours d'été. Je pourrais y rester du lever au coucher du soleil!",
              "image": "parlee option1.jpg",
              "url": "https://parcsnbparks.ca/ParleeBeach?List"
            },
            "geometry": {
              "coordinates": [
                -64.5119872,
                46.2397022
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "name": "Parc provincial Mont-Carleton",
              "address": "Saint-Quentin",
              "content": "Le sentier du mont Sagamook est une des randonnées les plus exigeantes de la province. La vue spectaculaire au sommet vaut largement l'effort.",
              "image": "Mount Carleton.jpg",
              "url": "https://parcsnbparks.ca/MountCarleton?List"
            },
            "geometry": {
              "coordinates": [
                -66.8970546,
                47.4176151
              ],
              "type": "Point"
            }
          },
        ],
        "type": "FeatureCollection"
      }
};

var tooltip = null;

map.addControl(new mapboxgl.NavigationControl());
map.on('load', () => {
    var dataSource = map.addSource('places', {
        'type': 'geojson',
        'data': mapdata[document.documentElement.lang.toLowerCase()],
        'cluster': true,
        clusterRadius: 50
    });
    var layer = map.addLayer({
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
        var url = e.features[0].properties.url;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var offsetX = 0;
        var offsetY = 0.02;
        var anchor = 'bottom';
        var maxWidth = '300px';
        
        if (!e.features[0].properties.cluster) {
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
          var popup = new mapboxgl.Popup({anchor: anchor, maxWidth: maxWidth, className: 'window'})
              .setLngLat(coordinates)
              .setHTML(`<div class="popup-content"><p class="main">${content}</p><div class="address"><svg class="pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.59 75.01"><path d="M25.09,0l-.21,0-.07,0A25.5,25.5,0,0,0,3.19,37.91V38a1.91,1.91,0,0,0,.22.53l0,0L23.59,73.94a2.1,2.1,0,0,0,2.87.79,2.07,2.07,0,0,0,.79-.79L47.09,38.6l.13-.19a2,2,0,0,0,.15-.41,1.34,1.34,0,0,0,.07-.18,25.75,25.75,0,0,0,3.15-12.19A25.49,25.49,0,0,0,25.31,0Zm.19,10.22a14.68,14.68,0,0,1,0,29.35,14.68,14.68,0,0,1,0-29.35Z"/></svg><span><a href="${url}" target="_blank" rel="noopener nofollow">${name}</a></span><span>${address}</span></div><div class="image"><img src="/assets/img/map/${image}" /></div>`)
              .addTo(map);                
          
          ga('send', 'event', 'Map', 'show', name);
          
          popup.on('close', () => {
              map.flyTo({
                  center: lastCoordinates,
                  zoom: lastZoom,
                  essential: true
              });
          });
        } else {
          map.flyTo({
            center: [coordinates[0] + offsetX, coordinates[1] + offsetY],
            zoom: lastZoom + 3,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        }
    });

    layer.on('mouseover', 'places', (e) => {
      var places = "";
      if (e.features[0].properties.cluster) {
        var clusterID = e.features[0].id;
        var pointCount = e.features[0].properties.point_count;
        var clusterSource = map.getSource('places');
        clusterSource.getClusterLeaves(clusterID, pointCount, 0, (err, features) => {
          var coordinates = features[0].geometry.coordinates;
          features.forEach(feature => places += feature.properties.name + ", ");
          places = places.slice(0, -2);
          tooltip = new mapboxgl.Popup({anchor: 'bottom', className: 'tooltip'})
                              .setLngLat(coordinates)
                              .setHTML(places)
                              .addTo(map);
        });
      } else {
        var coordinates = e.features[0].geometry.coordinates.slice();
        places = e.features[0].properties.name;

        tooltip = new mapboxgl.Popup({anchor: 'bottom', className: 'tooltip'})
                              .setLngLat(coordinates)
                              .setHTML(places)
                              .addTo(map);
      }
    });

    layer.on('mouseleave', 'places', (e) => {
      tooltip.remove();
    });

    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
    });
});

$(document).ready(() => {
    // Audio playback controls
    $('.sound').each((key, player) => {
        const track = $(player).find('.track');
        const trackWidth = $(track).innerWidth() - 26;
        const position = $(player).find('.position');
        var playing = false;
        var audio = $(player).find('audio')[0];
        audio.ontimeupdate = () => {
            if (audio.currentTime === audio.duration) {
                stopAudio(player);
            }

            var progress = audio.currentTime / audio.duration;
            console.info(trackWidth, progress, trackWidth * progress);
            $(position).css('transform', `translateX(${(trackWidth * progress)}px) translateY(-50%)`);
        };
        $(player).find('img, .playback').click(() => {
            playing = !playing;
            if (playing) {
                startAudio(player);
            } else {
                stopAudio(player);
            }
        });
    });
});

function stopAudio(player) {
    const position = $(player).find('.position');
    const audio = $(player).find('audio')[0];
    $(player).removeClass('playing');
    $(position).css('transform', 'translateX(0) translateY(-50%)');
    audio.pause();
    audio.currentTime = 0;
}

function startAudio(player) {
    $('.sound').each((index, player) => {
        stopAudio(player);
    });
    const audio = $(player).find('audio')[0];
    $(player).addClass('playing');
    audio.play();
    
    ga('send', 'event', 'Sounds', 'play', $(player).find('audio').attr('id'));
}