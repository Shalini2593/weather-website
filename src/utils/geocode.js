const request = require('request');

//Function to provide lat and long of a given location
const geocode = (address, callback) => {

    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhbGluaTI1IiwiYSI6ImNrNmk2czdzdDAzazkzbG16ZDU3eHhob3AifQ.wEODnmtxNjh7iLoMGY_k0A';

    request({url, json : true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to mapbox services.', undefined);
        }
        else if(body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        }
        else {
            let long = body.features[0].center[0];
            let lat = body.features[0].center[1];
            let place = body.features[0].place_name;
            callback(undefined, { 'Location' : place, 'Longitude' : long, 'Latitude' : lat });
        }
    });
}

module.exports = geocode;