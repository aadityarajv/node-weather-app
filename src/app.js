const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast');
const forcasts = require('./utils/forecasts');


// Define paths for express engine
const pubDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup public path directory
app.use(express.static(pubDir));
 
// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Aaditya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About', 
        name: 'Aaditya'
    })
})

app.get('/help', (req, res) => {
    res.render('about', {
        title: 'Help', 
        name: 'Aaditya'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error });
        }
        
        forcast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }

            res.send({
                location,
                fdata: forecastData
            })
        })
    })
})


app.get('/weather/your-location', (req, res) => {
    if(!req.query.lat && !req.query.lon){
        return res.send({
            error: 'You are missing co-ordinates'
        })
    }
    // console.log(req.query.lat + "," + req.query.lon);
    forcasts(req.query.lat, req.query.lon, (error, forecastData) => {
        if(error){
            return res.send({ error });
        }

        res.send({
            location: forecastData.location,
            fData: forecastData.fData
        })
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Help article not found',
        name: 'Aaditya'
    });
})


app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'This page is not found',
        name: 'Aaditya'
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})