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
    
    
    var infowindow = new google.maps.InfoWindow({
        content: infowindowContent()
      });
    marker.addListener('mouseover', function() {
        infowindow.open(map, marker);   
    });
    marker.addListener('mouseout', function() {
        infowindow.close(map, marker);   
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

function infowindowContent(){
    return '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">MY PLACE</h1>'+
            '<div id="bodyContent">'+
            '<p><b>MY PLACE</b>, THIS IS MY FAVOURITE PLACE</p>'+
            '</div>'+
            '</div>';
}

export default {
    initMap,
    addMarker,
    removeMarker,
    setCenter,
    setZoom
}