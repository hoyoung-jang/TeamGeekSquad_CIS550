const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db,
    multipleStatements: true // for multiple statements in one query
});
connection.connect();


// ********************************************
//               GENERAL ROUTES
// ********************************************

/////////////////////////////////////////////////////////////////

//QUERY A
async function restaurant_by_postal_code(req, res) {
    const postal_code = req.params.postal_code ? req.params.postal_code : 33707
    // use this league encoding in your query to furnish the correct results
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        //replaced ‘%chinese%’ with the ability for the user to enter meal type
        connection.query(
            `SELECT a.*
                FROM Restaurant a, Location b
                WHERE 1=1
                    and a.business_id = b.business_id
                    and b.postal_code = ${postal_code};`, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
    }
}


//QUERY B

/* Recommend places to travel and want to eat in style and variety. 
Return zip codes (with accompanying restaurant information) that contain at restaurants with at least 4.0+ stars. 
This will render results using pagination functionality that will be created using LIMIT. 
*/

async function zips_for_good_meals_by_type(req, res) { 
    const mealtype = req.params.mealtype ? req.params.mealtype : 'chinese'
    // use this league encoding in your query to furnish the correct results
    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        //replaced '%chinese%' with the ability for the user to enter meal type
        connection.query(
            `select b.postal_code 
            from Restaurant a, Location b, Meals c
            where 1=1
            and a.business_id = b.business_id
            and a.business_id = c.business_id
            and a.stars >= 4
            and c.meal_type like '%${mealtype}%'
            order by a.stars desc
            limit ${(req.query.page-1)*pagesize}, ${pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(
            `select b.postal_code 
            from Restaurant a, Location b, Meals c
            where 1=1
            and a.business_id = b.business_id
            and a.business_id = c.business_id
            and a.stars >= 4
            and c.meal_type like '%${mealtype}%'
            order by a.stars desc
            limit 10`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}




//QUERY C
/*
Query a single restaurant and add/remove attributes to customize what
information is displayed on the screen. For example you want to see
restaurants that have Bike Parking,  free Wifi. This is accomplished by
joining the main Yelp data set against a list of sub-attributes. Recommend
Top 20 lists (location, cuisine) order by rating
*/
async function filter_attributes(req, res) {
    const state = req.query.Name ? req.query.State : 'CA'
    const bike_parking = req.query.bike_parking ? req.query.bike_parking : 'True'
    const wifi = req.query.wifi ? req.query.wifi : 'free'
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize : 20

        // This is the case where page is defined.
        connection.query(`
        select a.*
        from Restaurant a, Attribute b
        where 1=1
        and a.business_id = b.business_id
        and b.attributes like '%"BikeParking": ${bike_parking}%'
        and b.attributes like '%"WiFi": "${wifi}"%'
        order by stars desc
        limit pagesize;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}


//QUERY D
/*
Cluster neighborhoods by certain attributes and recommend a niche
market . For example, find average rating of Italian Restaurant in CA group
by near-by postal code
 */
async function filter_neighborhoods(req, res) {

    const state = req.query.Name ? req.query.State : 'CA'
    const postal_code = req.query.postal_code ? req.query.postal_code : '93'
    const meal_type = req.query.meal_type ? req.query.meal_type : 'Italian'
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize : 10

    if (page && !isNaN(page)) {
        // This is the case where page is defined.
        connection.query(`select b.postal_code, avg(a.stars) as avg_rating
        from Restaurant a, Location b, Meals c
        where 1=1
        and a.business_id = b.business_id
        and a.business_id = c.business_id
        and b.state = state
        and b.postal_code like '${postal_code}%'
        and c.meal_type like '%${mealtype}%'
        group by b.postal_code
        LIMIT ${pagesize*(page-1)}, ${pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {

        connection.query(`select b.postal_code, avg(a.stars) as avg_rating
        from Restaurant a, Location b, Meals c
        where 1=1
        and a.business_id = b.business_id
        and a.business_id = c.business_id
        and b.state = state
        and b.postal_code like postal_code
        and c.meal_type like meal_type
        group by b.postal_code`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    }
}



//QUERY E
async function calc_revisit_rate_by_business_id (req, res) {
    const business_id = req.params.business_id ? req.params.business_id : 'bZiIIUcpgxh8mpKMDhdqbA'
    // use this league encoding in your query to furnish the correct results
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        //replaced ‘%chinese%’ with the ability for the user to enter meal type
        connection.query(
            `SELCT a.business_id, sum(a.visit_count) as total_count,
                    sum(a.visit_count)-count(a.business_id) as revisit_count,
                    (sum(a.visit_count)-count(a.business_id))/sum(a.visit_count) as revisiting_rate
                FROM
                    (SELECT business_id, user_id, count(user_id) as visit_count
                    FROM Review
                    WHERE business_id = ‘%${business_id}%’
                    GROUP BY user_id
                    ORDER BY visit_count) a;`, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
    }
}

//QUERY F
/* Select top 10 businesses for a given city above a given rating threshold, ordered by rating and review count. 
Display business name, star rating, and any COVID-related messaging, if applicable.
 */

async function top_ten_restaurants_by_city_COVID(req, res) { 
    const city = req.params.city ? req.params.city : 'Nashville'
    // use this league encoding in your query to furnish the correct results
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        //replaced '%chinese%' with the ability for the user to enter meal type
        connection.query(
            `select main.name, main.stars, main.review_count, c.COVID_Banner from Restaurant main
            inner join Location l
            on main.business_id = l.business_id
            left join COVID_Response c
            on main.business_id = c.COVID_Business_id
            where main.stars >= 0
            and l.city like '%${city}%'
            order by main.stars desc, main.review_count desc
            limit 10`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}


module.exports = {
    restaurant_by_postal_code: restaurant_by_postal_code,
    zips_for_good_meals_by_type: zips_for_good_meals_by_type,
    filter_attributes: filter_attributes,
    filter_neighborhoods: filter_neighborhoods,
    calc_revisit_rate_by_business_id: calc_revisit_rate_by_business_id,
    top_ten_restaurants_by_city_COVID: top_ten_restaurants_by_city_COVID
}