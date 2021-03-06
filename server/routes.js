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

/*
    Get restaurants data using business ID
 */
async function getRestaurant (req, res) {
    const businessId = req.query.businessId ? req.query.businessId : 'oZzN706lKoL4faaTK739xA'
    connection.query(
        `SELECT a.*, b.*
            FROM Restaurant a, Location b
            WHERE 1=1
                and b.business_id = '${businessId}'
                and a.business_id = b.business_id
                ;`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        }
    );
}

/*
    Get all restaurants records
 */
async function getAllRestaurants (req, res) {
    //make a query by building query blocks
    const pagesize = req.query.pagesize? req.query.pagesize : 10;
    const pageQuery = (req.query.page && !isNaN(req.query.page))? `LIMIT ` + pagesize*(req.query.page-1) + `, ${pagesize}` : ``
    const basicQuery = `SELECT business_id,name,stars,review_count,hours FROM Restaurant a`
    const query = `${basicQuery} ${pageQuery};`

    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({error: error})
        } else if (results) {
            res.json({results: results})
        }
    });
}

/*
    Get restaurants by using postal code as a parameter
 */
async function getRestaurantsByPostalCode (req, res) {
    const postal_code = req.query.postal_code ? req.query.postal_code : 33707
    connection.query(
        `SELECT a.*, b.*
            FROM Restaurant a, Location b
            WHERE 1=1
                AND a.business_id = b.business_id
                AND b.postal_code = ${postal_code}
                ORDER by a.stars DESC;`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        }
    );
}


/*
    Get restaurants by using state and city parameters.
    Also, some attributes can be used as filters including bike parking, accepting credit card, delivery, takeout.
    And type of restaurant can also be used.
*/
async function getRestaurantsByStateCity(req, res) {
    //make a query by building query blocks
    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const basicQuery = req.query.mealType ?
        `SELECT R.business_id AS businessId, R.name, R.stars, R.review_count, L.state, L.city, L.address, L.postal_code AS postalCode, L.lat, L.lon, A.attributes 
        FROM Restaurant R, Attribute A, Location L, Meals M 
        WHERE R.business_id = A.business_id 
        AND R.business_id = L.business_id 
        AND R.business_id = M.business_id`
        : `SELECT R.business_id AS businessID, R.name, R.stars, R.review_count, L.state, L.city, L.address, L.postal_code AS postalCode, L.lat, L.lon, A.attributes 
            FROM Restaurant R, Attribute A, Location L 
            WHERE R.business_id = A.business_id 
            AND R.business_id = L.business_id`

    const stateQuery = req.query.state ? ` AND L.state LIKE '%${req.query.state}%'`: ``
    const cityQuery = req.query.city ? ` AND L.city LIKE '%${req.query.city}%'`: ``
    const starsHigh = req.query.starsHigh ? req.query.starsHigh : 5
    const starsLow = req.query.starsLow ? req.query.starsLow : 0
    const starsQuery = ` AND R.stars >= ${starsLow} AND R.stars <= ${starsHigh}`
    const bikeParkingQuery = (req.query.bikeParking > 0) ? ` AND A.attributes LIKE '%"BikeParking": "True"%'` : ``
    const creditCardsQuery = (req.query.creditCards > 0) ? ` AND A.attributes LIKE '%"BusinessAcceptsCreditCards": "True"%'` : ``
    const deliveryQuery = (req.query.delivery > 0) ? ` AND A.attributes LIKE '%"RestaurantsDelivery": "True"%'` : ``
    const takeOutQuery = (req.query.takeOut > 0) ? ` AND A.attributes LIKE '%"RestaurantsTakeOut": "True"%'` : ``
    const mealTypeQuery = req.query.mealType ? ` AND M.meal_type LIKE '%${req.query.mealType}%'` : ``

    const pageQuery = (req.query.page && !isNaN(req.query.page))? `LIMIT ` + pagesize*(req.query.page-1) + `, ${pagesize}` : ``

    const query = `${basicQuery}${stateQuery}${cityQuery}${starsQuery}${bikeParkingQuery}${creditCardsQuery}${deliveryQuery}${takeOutQuery}${mealTypeQuery} ORDER BY stars DESC ${pageQuery};`

    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({error: error})
        } else if (results) {
            res.json({results: results})
        }
    });
}

/*
    Calculate revisiting rate using query by business ID.
 */
async function getRevisitRate (req, res) {
    const businessId = req.query.businessId ? req.query.businessId : 'aneMSizALcN1XZo9lv1SYg'

    connection.query(
        `WITH a AS (SELECT business_id, user_id, count(user_id) as visit_count
                FROM Review
                WHERE business_id = '${businessId}'
                GROUP BY user_id
                ORDER BY visit_count)

            SELECT a.business_id AS businessId, sum(a.visit_count) as totalCount,
                sum(a.visit_count)-count(a.business_id) as revisitCount,
                (sum(a.visit_count)-count(a.business_id))/sum(a.visit_count) as revisitRate
            FROM a;`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}

/*
    Calculate regular customers using query by business ID.
 */
async function getRegularCustomers (req, res) {
    const businessId = req.query.businessId ? req.query.businessId : 'aneMSizALcN1XZo9lv1SYg'
    const number = req.query.number ? req.query.number : 3
    connection.query(
        `WITH customers AS (SELECT business_id, user_id, count(user_id) as visitCount
                FROM Review
                WHERE business_id = '${businessId}'
                GROUP BY user_id
                ORDER BY visitCount) 

        SELECT count(*) AS regularCustomers
        FROM customers        
        WHERE visitCount >= ${number};`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}

/*
    Get review data using business ID.
*/
async function getReviews(req, res) {
    const businessId = req.query.businessId ? req.query.businessId : 'bZiIIUcpgxh8mpKMDhdqbA'
    const basicQuery = `SELECT business_id AS businessId, date, stars, text AS review FROM Review WHERE business_id = '${businessId}' ORDER BY date DESC`
    const query = `${basicQuery} ;`

    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({error: error})
        } else if (results) {
            res.json({results: results})
        }
    });
}

/*
    Get COVID policy by restaurants using business ID
 */
async function getCovidBanner (req, res) {
    const businessId = req.query.businessId ? req.query.businessId : 'oZzN706lKoL4faaTK739xA'
    connection.query(
        `SELECT *
            FROM COVID_Response
            WHERE COVID_business_id = '${businessId}'
                ;`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        }
    );
}

module.exports = {
    getAllRestaurants,
    getRestaurant,
    getRestaurantsByPostalCode,
    getRestaurantsByStateCity,
    getRevisitRate,
    getReviews,
    getCovidBanner,
    getRegularCustomers
}


// //QUERY B
//
// /* Recommend places to travel and want to eat in style and variety.
// Return zip codes (with accompanying restaurant information) that contain at restaurants with at least 4.0+ stars.
// This will render results using pagination functionality that will be created using LIMIT.
// */
//
// async function zips_for_good_meals_by_type(req, res) {
//     const mealtype = req.query.mealtype ? req.query.mealtype : 'chinese'
//     // use this league encoding in your query to furnish the correct results
//     const pagesize = req.query.pagesize ? req.query.pagesize : 10
//     if (req.query.page && !isNaN(req.query.page)) {
//         // This is the case where page is defined.
//         //replaced '%chinese%' with the ability for the user to enter meal type
//         connection.query(
//             `select b.postal_code
//             from Restaurant a, Location b, Meals c
//             where 1=1
//             and a.business_id = b.business_id
//             and a.business_id = c.business_id
//             and a.stars >= 4
//             and c.meal_type like '%${mealtype}%'
//             order by a.stars desc
//             limit ${(req.query.page-1)*pagesize}, ${pagesize}`, function (error, results, fields) {
//
//                 if (error) {
//                     console.log(error)
//                     res.json({ error: error })
//                 } else if (results) {
//                     res.json({ results: results })
//                 }
//             });
//     }else {
//         // we have implemented this for you to see how to return results by querying the database
//         connection.query(
//             `select b.postal_code
//             from Restaurant a, Location b, Meals c
//             where 1=1
//             and a.business_id = b.business_id
//             and a.business_id = c.business_id
//             and a.stars >= 4
//             and c.meal_type like '%${mealtype}%'
//             order by a.stars desc
//             limit 10`, function (error, results, fields) {
//
//                 if (error) {
//                     console.log(error)
//                     res.json({ error: error })
//                 } else if (results) {
//                     res.json({ results: results })
//                 }
//             });
//     }
// }
//

// //QUERY D
// /*
// Cluster neighborhoods by certain attributes and recommend a niche
// market . For example, find average rating of Italian Restaurant in CA group
// by near-by postal code
//  */
// async function filter_neighborhoods(req, res) {
//
//     const stateQuery = req.query.state ? `AND L.state LIKE '%${req.query.state}%'`: ``
//     const postal_code = req.query.postal_code ? req.query.postal_code : '93'
//     const meal_type = req.query.meal_type ? req.query.meal_type : 'Italian'
//     const page = req.query.page
//     const pagesize = req.query.pagesize ? req.query.pagesize : 10
//
//     if (page && !isNaN(page)) {
//         // This is the case where page is defined.
//         connection.query(`select b.postal_code, avg(a.stars) as avg_rating
//         from Restaurant a, Location b, Meals c
//         where 1=1
//         and a.business_id = b.business_id
//         and a.business_id = c.business_id
//         and b.state = '${stateQuery}'
//         and b.postal_code like '${postal_code}%'
//         and c.meal_type like '%${meal_type}%'
//         group by b.postal_code
//         LIMIT ${pagesize*(page-1)}, ${pagesize}`, function (error, results, fields) {
//
//             if (error) {
//                 console.log(error)
//                 res.json({ error: error })
//             } else if (results) {
//                 res.json({ results: results })
//             }
//         });
//
//     } else {
//
//         connection.query(`select b.postal_code, avg(a.stars) as avg_rating
//         from Restaurant a, Location b, Meals c
//         where 1=1
//         and a.business_id = b.business_id
//         and a.business_id = c.business_id
//         and b.state = state
//         and b.postal_code like postal_code
//         and c.meal_type like meal_type
//         group by b.postal_code`, function (error, results, fields) {
//
//             if (error) {
//                 console.log(error)
//                 res.json({ error: error })
//             } else if (results) {
//                 res.json({ results: results })
//             }
//         });
//
//     }
// }

//
// //QUERY F
// /* Select top 10 businesses for a given city above a given rating threshold, ordered by rating and review count.
// Display business name, star rating, and any COVID-related messaging, if applicable.
//  */
//
// async function top_ten_restaurants_by_city_COVID(req, res) {
//     const city = req.query.city ? req.query.city : 'Nashville'
//     // use this league encoding in your query to furnish the correct results
//     if (req.query.page && !isNaN(req.query.page)) {
//         // This is the case where page is defined.
//         //replaced '%chinese%' with the ability for the user to enter meal type
//         connection.query(
//             `select main.name, main.stars, main.review_count, c.COVID_Banner from Restaurant main
//             inner join Location l
//             on main.business_id = l.business_id
//             left join COVID_Response c
//             on main.business_id = c.COVID_Business_id
//             where main.stars >= 0
//             and l.city like '%${city}%'
//             order by main.stars desc, main.review_count desc
//             limit 10`, function (error, results, fields) {
//
//                 if (error) {
//                     console.log(error)
//                     res.json({ error: error })
//                 } else if (results) {
//                     res.json({ results: results })
//                 }
//             });
//     }
// }
