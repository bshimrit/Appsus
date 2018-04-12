import mapService from './map.service.js'
import locService from './loc.service.js'
import storageService from '../storage.service.js'
import utilService from '../util.service.js'
import LoremIpsum from '../loremIpsum.js'

const PLACES_KEY = 'placesAppKey';
var gLoc = {}

function loadMap()
{
    let urlParams = getAllUrlParams(window.location.href);
    if (urlParams.lat && urlParams.lng) {
        let lat = +urlParams.lat;
        let lng = +urlParams.lng;
        return getLocation(lat, lng);
    } else {
        return getLocation();
    }
}

function getLocation(lat, lng){
    if (!lat && !lng) {
        locService.getPosition().then(pos => {
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            aimMapToLoc(lat, lng);
            locService.getLoc(lat, lng);
        }).catch(err => {
            console.log('ERROR:', err);
        })
    } else {
        aimMapToLoc(lat, lng);
        locService.getLoc(lat, lng);
    }
}

function searchLocation(address) {
    locService.getLocByAddress(address)
        .then((loc) => {
            aimMapToLoc(loc.lat, loc.lng);
        })
        .catch(err => {
            console.log('ERROR:', err);
        })
}

function aimMapToLoc(lat, lng) {
    gLoc.lat = lat;
    gLoc.lng = lng;
    if (mapService.map) {
        mapService.removeMarkers();
        mapService.map.setCenter({
            lat,
            lng
        });
        mapService.addMarker({
            lat,
            lng
        });
    } else {
        mapService.initMap(lat, lng)
            .then(
                () => {
                    mapService.addMarker({
                        lat: lat,
                        lng: lng
                    });
                })
    }
}

function getAllUrlParams(url){

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
            // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
}


function query() {
    return storageService.load(PLACES_KEY)
        .then(places => {
            if (!places) {
                places = generatePlaces();
                storageService.store(PLACES_KEY, places);
            }
            return places;
        })
}

function getById(placeId) {
    return storageService.load(PLACES_KEY)
        .then(places => {
            return places.find(place => place.id === placeId);
        })
}

function deletePlace(placeId) {
    return storageService.load(PLACES_KEY)
        .then(places => {
            var placeIdx = places.findIndex(place => place.id === placeId);
            places.splice(placeIdx, 1);
            return storageService.store(PLACES_KEY, places);
        })
}


function savePlace(place) {
    return storageService.load(PLACES_KEY)
        .then(places => {
            if (place.id) {
                var placeIdx = places.findIndex(currplace => currplace.id === place.id)
                places.splice(placeIdx, 1, place);
            } else {
                place.id = Date.now();
                places.push(place);
            }
            return storageService.store(PLACES_KEY, places);
        });
}

function generatePlaces() {
    var places = []
    for (let index = 0; index < 3; index++) {
        var place = createPlace(index)
        places.push(place)
    }
    return places;
}

function createPlace(idx){
    var coords = [{lat:32.2263222,lng:34.9994826},{lat:32.2263222,lng:35.0060487},{lat:32.17202,lng:34.9302587}]
    var loremIpsum = new LoremIpsum();
    var place = {
        id: utilService.getRandomString(11),
        name: 'My House',
        description: loremIpsum.generate(utilService.getRandomInt(1, 5), utilService.getRandomInt(3, 6)),
        photos: [],
        lat: coords[idx].lat,
        lng: coords[idx].lng,
        tags:[]
    }
    return place;
}

export default {
    query,
    getById,
    deletePlace,
    savePlace,
    loadMap,
    searchLocation
}
