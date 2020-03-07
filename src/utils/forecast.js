const request = require('request');

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    let url = 'https://api.darksky.net/forecast/10977407db71808f928cc199152b8d93/';
    url += latitude + ',' + longitude;
    request({url : url, json : true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to darksky services', undefined);
        }
        else if(body.error) {
            callback('Some error occurred', undefined);
        }
        else {
            callback(undefined, body.currently.summary + '. Temperature : ' + body.currently.temperature + '. Humidity : ' + body.currently.humidity);
        }
    });
}

module.exports = forecast;