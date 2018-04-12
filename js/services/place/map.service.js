import {
    GoogleMapsApi
} from './gmap.class.js';

var map;
var markers = [];

function initMap(lat = 32.0749831, lng = 34.9120554) {

    const gmapApi = new GoogleMapsApi();
    return gmapApi.load().then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: {
                    lat,
                    lng
                },
                zoom: 15
            })

        console.log('Map has been loaded.', map);
    });


}

function addMarker(loc) {

    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!',
    })
    marker.setIcon('http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Marker-Inside-Azure-icon.png');
    markers.push(marker);
    console.log(markers);
}




let removeMarkers = () => {
    markers.forEach((marker) => {
        marker.setMap(null);
    })
    markers = [];
}

let setCenter = (pos) => {
    map.setCenter(pos);
}

export default {
    initMap,
    addMarker,
    removeMarkers,
    setCenter,
    map
}