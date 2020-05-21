const getWeather = (location, callback) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error)
                return callback(data.error)
            console.log(data)
            callback(data.forecastData.maxTemp, data.location)
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

    getWeather(location, (maxTemp, location) => {
        messageOne.textContent = maxTemp
        messageTwo.textContent = location
    })
})