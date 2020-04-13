const path = require('path') 
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

console.log('port value is ' + port)

//  Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//  Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//  Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tushar Upadhyay'+port
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tushar Upadhyay'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs',  {
        helpText: 'this is some helpful text',
        title: 'Help',
        name: 'Tushar Upadhyay'
    })
})


app.get('/weather', (req, res) => {
    

    if(!req.query.address)   {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    let enteredLocation = req.query.address
    
    geocode(enteredLocation, (error, {latitude, longitude, location} = {})  => {
        if(error)   {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
    
            if (error)  {
                return res.send({error})
            }
            res.send({
                latitude: latitude,
                longitude: longitude,
                forecast: forecastData,
                address: req.query.address,
                location
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })
})

app.get('/products', (req, res) =>  {
    if(!req.query.search)   {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res)   =>  {
    // res.send('Help article not found')
    res.render('404.hbs',  {
        errorMessage: 'Help article not found',
        title: 'Help',
        name: 'Tushar Upadhyay'
    })
})

app.get('*', (req, res) => {
//    res.send('My 404 page')
    res.render('404',  {
        errorMessage: 'Page not found',
        title: 'Error',
        name: 'Tushar Upadhyay'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})