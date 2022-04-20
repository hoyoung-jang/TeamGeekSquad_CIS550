const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));


// Route A - register as GET
app.get('/restaurant_by_postal_code', routes.restaurant_by_postal_code)

// Route B - register as GET
app.get('/zips_for_good_meals_by_type', routes.zips_for_good_meals_by_type)

// Route C - register as GET
app.get('/filter_attributes', routes.filter_attributes)

// Route D - register as GET
app.get('/filter_neighborhoods', routes.filter_neighborhoods)

// Route E - register as GET
app.get('/calc_revisit_rate_by_business_id', routes.calc_revisit_rate_by_business_id)

// Route F - register as GET
app.get('/top_ten_restaurants_by_city_COVID', routes.top_ten_restaurants_by_city_COVID)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
