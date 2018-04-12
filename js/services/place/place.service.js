import mapService from './map.service.js'
import locService from './loc.service.js'

let gLoc = {};

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
            getRenderWeather(lat, lng);
        }).catch(err => {
            console.log('ERROR:', err);
        })
    } else {
        aimMapToLoc(lat, lng);
        getRenderWeather(lat, lng);
        locService.getLoc(lat, lng);
    }
}

function searchLocation(address) {
    locService.getLocByAddress(address)
        .then((loc) => {
            aimMapToLoc(loc.lat, loc.lng);
            getRenderWeather(loc.lat, loc.lng);
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

function getQueryString(){
    let queryString = `127.0.0.1:5500/?lat=${gLoc.lat}&lng=${gLoc.lng}`;
    let copyTextarea = document.querySelector('.copyClipboard');
    copyTextarea.innerText = queryString;
    copyTextarea.hidden = false;
    copyTextarea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    copyTextarea.hidden = true;
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

export default {
    loadMap
}