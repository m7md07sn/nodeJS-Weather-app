const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibTdtZDA3c24iLCJhIjoiY2s5dnJ4ZTVnMDIyaTNtazY5YmNtcWhmYSJ9.V2-pZfekUzTyR-VlJIch2A&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('There is an error with connection', undefined)
        }
        else if (body.features.length === 0) {
            callback('There is an Error with parameters', undefined)
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode