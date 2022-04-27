const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Routes - register as GET
app.get('/getAllRestaurants', routes.getAllRestaurants)
app.get('/getRestaurantsByPostalCode', routes.getRestaurantsByPostalCode)
app.get('/getRestaurantsByStateCity', routes.getRestaurantsByStateCity)
app.get('/getRevisitRate', routes.getRevisitRate)
app.get('/getRegularCustomers', routes.getRegularCustomers)
app.get('/getReviews', routes.getReviews)
app.get('/getRestaurant', routes.getRestaurant)
app.get('/getCovidBanner', routes.getCovidBanner)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;


// app.get('/top_ten_restaurants_by_city_COVID', routes.top_ten_restaurants_by_city_COVID)
// app.get('/filter_neighborhoods', routes.filter_neighborhoods)
// app.get('/zips_for_good_meals_by_type', routes.zips_for_good_meals_by_type)
