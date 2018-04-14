function getLoc(lat, lng) {
    return new Promise((resolve, reject) => {
        let urlApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCh3Ltw6wCnr2m--jghSaGY5mm5PzASMnU`;
        let prmData = fetch(urlApi);
        prmData.then(function (res) {
            res.json().then(function (data) {
                let locationAddress = data.results[0].formatted_address;
            })
        });
        let loc = {lat, lng};
        resolve(loc);
    });
}

let getLocByAddress = (address) => {
    return new Promise((resolve, reject) => {
        let urlApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCh3Ltw6wCnr2m--jghSaGY5mm5PzASMnU`;
        let prmData = fetch(urlApi);
        prmData.then(function (res) {
            res.json().then(function (data) {
                let addressData = data.results[0]; // DATA
                let addressName = addressData.formatted_address; // Full address.

                let addressCoords = addressData.geometry.location; // Objects that olds the lat and lng.
                resolve(addressData);
            })
        });
    });
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export default {
    getLoc,
    getLocByAddress,
    getPosition
}