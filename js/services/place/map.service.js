import {GoogleMapsApi} from './gmap.class.js';

var map;
var markers = [];

function initMap(nodeMap , lat = 32.0749831, lng = 34.9120554) {
    const gmapApi = new GoogleMapsApi();
    return gmapApi.load().then(() => {
        map = new google.maps.Map(
            nodeMap, {
                center: {
                    lat,
                    lng
                },
                zoom: 15
            })
    });

}

function addMarker({lat , lng}) {
    var marker = new google.maps.Marker({
        position: {lat , lng},
        map: map,
        title: 'Current address',
    })
    marker.addListener('mouseover', function() {
        console.log(map, this);
    });
}

function removeMarkers() {
    markers.forEach((marker) => {
        marker.setMap(null);
    })
    markers = [];
}

function setCenter({lat , lng}) {
    map.setCenter({lat , lng});
}

function setZoom(zoom){
    map.setZoom(zoom);
}

export default {
    initMap,
    addMarker,
    removeMarkers,
    setCenter,
    // map,
    setZoom
}