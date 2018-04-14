import mapService from './map.service.js'
import locService from './loc.service.js'
import storageService from '../general/storage.service.js'
import utilService from '../general/util.service.js'
import LoremIpsum from '../general/loremIpsum.js'

const PLACES_KEY = 'placesAppKey';
var gLoc = {}

function searchLocation(address) {
    locService.getLocByAddress(address)
        .then((addressData) => {
            mapService.addMarker(addressData.geometry.location)
            mapService.setCenter(addressData.geometry.location);
            var place = createPlaceByLocation(addressData);
            return Promise.resolve(place);
        })
        .catch(err => {
            return Promise.reject(err);
        })
}

function goToLocation(place){
    mapService.setCenter({lng:place.lng,lat:place.lat});
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
            mapService.removeMarker(placeIdx);
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
    var coords = [{lat:32.2263222,lng:34.9994826},{lat:32.2263222,lng:35.0060487},{lat:32.17202,lng:34.9302587}]
    for (let index = 0; index < 3; index++) {
        var place = createPlace(index)
        places.push(place)
    }
    return places;
}

function createPlace(place){
    var loremIpsum = new LoremIpsum();
    var place = {
        id: utilService.getRandomString(11),
        name: 'Place' + (idx + 1),
        description: loremIpsum.generate(utilService.getRandomInt(1, 5), utilService.getRandomInt(3, 6)),
        photos: [],
        lat: coords[idx].lat,
        lng: coords[idx].lng,
        tags:[]
    }
    return place;
}

function createPlaceByLocation(addressData){
    console.log(addressData);
    
}

export default {
    query,
    getById,
    deletePlace,
    savePlace,
    searchLocation,
    goToLocation
}
