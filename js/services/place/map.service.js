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
                zoom: 12
            })
    });

}

function addMarker({lat , lng}) {
    var marker = new google.maps.Marker({
        position: {lat , lng},
        map: map,
        title: 'Current address',
    })
    markers.push(marker);
    marker.addListener('mouseover', function() {
        console.log(map, this);
    });
}

function removeMarker(idx) {
    markers[idx].setMap(null)
    markers.splice(idx,1);
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
    removeMarker,
    setCenter,
    setZoom
}