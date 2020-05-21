const getWeather = (location, callback) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error)
                return callback(data.error)
            console.log(data)
            callback(data.forecastData, data.location)
        })
    })

}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    getWeather(location, (forecastData, location) => {
        messageOne.textContent = 'max Temp: ' + forecastData.maxTemp + ' and min Temp: ' + forecastData.minTemp + ' with ' + forecastData.weatherDescription
        messageTwo.textContent = location
    })
})