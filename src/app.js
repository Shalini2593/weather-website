const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();
const port = process.env.PORT || 3000;

const directoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Tell Express which templating method to use
//set method allows you to set a particular setting in Express.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(directoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Shalini'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        mob : 979797979797,
        name : 'Shalini',
        title : 'Contact Us'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        msg : 'This page is under-construction.',
        name : 'Shalini',
        title : 'Help'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name : 'Shalini',
        title : 'About'
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title : 'Error',
        name : 'Shalini',
        errorMsg : 'Help article not found'
    });
});


app.get('/weather', (req, res) => {
    console.log(req.query);
    if(!req.query.address) {
        return res.send({
            error : 'Please provide location in the query string'
        })
    }
    geocode(req.query.address, (error, { Latitude, Longitude, Location } = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(Latitude, Longitude, (error, data) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                location : Location,
                forecast : data
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title : 'Error',
        name : 'Shalini',
        errorMsg : 'Sorry, Page not found'
    });
});


// app.get('', (req, res) => {
//     res.send('<h1>Hello Express !</h1>');
// });

// app.get('/help', (req, res) => {
//     res.send([{ Title : 'Help Page'}, { Msg : 'Hello there'}]);
// });

// app.get('/contact', (req, res) => {
//     res.send({ Contact : 9797979797 });
// });


app.listen(port, () => {
    console.log('Server is up and running...')
})