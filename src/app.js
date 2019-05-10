const express = require('express')
const path = require('path')
const hbs = require('hbs') // this is to load the hbs modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000 //Heroku provides diff port, so 3000 can be used locally.

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs') // default value for the first param is "view engine" and hbs is handlebars
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {

//     res.send([{
//         name: 'Vivaansh',
//         age: 2.5
//     },{
//         name: 'Chinook',
//         age: 2.5
//     }])

// })

// app.get('/help', (req, res) => {
//     //res.send('Help Page.')
//     res.send('<h1>Weather Application</h1> <h2>Details to follow</h2>')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1><h2>About the weather page, details to follow</h2><p>-- More details to be added --</p>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vivaansh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABout me',
        name: 'Vivaansh'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Vivaansh',
        text: 'This is the help text for the application'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // either error or data shall have the true at a time
        if (error) {
            return res.send({
                error: 'Please provide an address!'
            })
        }
        
        //forecast(data.latitude, data.longitude, (error, forecastData) => {
            forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            
            res.send({
                forecast: forecastData,
                location,  // used short hand property, replacing location: location
                address: req.query.address,
                coordinates: latitude + ' and longitude : ' + longitude
            })
            
            // console.log(location + ' and co-ordinates are, latitude : ' + latitude + ' and longitude : ' + longitude)
            // console.log(forecastData)
        })
    })

    // res.send({
    //     forecast: 'Sunny',
    //     location: 'Jayanagar, Bengaluru, India',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide the search term'
    })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Vivaansh',
        errorText: 'Help article not found'
    })
})

// Wild card character to match anything else defined above
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Vivaansh',
        errorText: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})