const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohamed Hassan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohamed Hassan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Mohamed Hassan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No Address Provided'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        // console.log('mytest', data)
        if (error) {
            return res.send({
                error
            })
        }
        forecast(lat, long, (error, forecastData) => {

            if (error)
                return res.send({
                    error
                })
            res.send({
                forecastData,
                location
            })
        })
    })

})

app.get('/product', (req, res) => {
    console.log(req.query.mohamed)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('NF404', {
        errorMessage: 'Help Page Not found',
        title: '404',
        name: 'Mohamed Hassan'
    })
})

app.get('*', (req, res) => {
    res.render('NF404', {
        errorMessage: 'Page Not found',
        title: '404',
        name: 'Mohamed Hassan'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})