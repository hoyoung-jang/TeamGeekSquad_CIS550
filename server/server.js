const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route A - register as GET
app.get('/getAllRestaurants', routes.getAllRestaurants)

// Route A - register as GET
app.get('/getRestaurantsByPostalCode', routes.getRestaurantsByPostalCode)

// Route B - register as GET
app.get('/zips_for_good_meals_by_type', routes.zips_for_good_meals_by_type)

// Route C - register as GET
app.get('/getRestaurantsByStateCity', routes.getRestaurantsByStateCity)

// Route D - register as GET
app.get('/filter_neighborhoods', routes.filter_neighborhoods)

// Route E - register as GET
app.get('/getRevisitRate', routes.getRevisitRate)

// Route F - register as GET
app.get('/top_ten_restaurants_by_city_COVID', routes.top_ten_restaurants_by_city_COVID)

// Route G - register as GET
app.get('/getReviews', routes.getReviews)

// Route G - register as GET
app.get('/getRestaurant', routes.getRestaurant)

// Route G - register as GET
app.get('/getCovidBanner', routes.getCovidBanner)



app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;