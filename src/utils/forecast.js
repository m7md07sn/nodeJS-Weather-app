const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/forecast/daily?&lat=' + lat + '&lon=' + long + '&key=1553dd622167486b8ce0f7e34ff36616'
    console.log(url)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('There is an error with connection', undefined)
        } else if (body.error) {
            callback('There is and Error with parameters', undefined)
        } else {
            callback(undefined, {
                minTemp: body.data[0].min_temp,
                maxTemp: body.data[0].max_temp,
                weatherDescription: body.data[0].weather.description
            })
        }
    })
}

module.exports = forecast