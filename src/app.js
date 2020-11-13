const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Defining paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//GET commands
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Toregeldi Kabizhanov',

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Toregeldi Kabizhanov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Toregeldi Kabizhanov'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "Adress must be provided"
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                error
            }

            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})

//get not found
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})

//Serving app to localhost
app.listen(9000, () => {
    console.log('Server is up on port 9000')
})