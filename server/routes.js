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
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
    } else {
        res.send(`Hello! Welcome to the FIFA server!`)
    }
}


// ********************************************
//                  WARM UP 
// ********************************************

// Route 2 (handler)
async function jersey(req, res) {
    const colors = ['red', 'blue', 'white']
    const jersey_number = Math.floor(Math.random() * 20) + 1
    const name = req.query.name ? req.query.name : "player"

    if (req.params.choice === 'number') {
        // TODO: TASK 1: inspect for issues and correct 
        res.json({ message: `Hello, ${name}!`, jersey_number: jersey_number })
    } else if (req.params.choice === 'color') {
        var lucky_color_index = Math.floor(Math.random() * 2);
        // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random (go Quakers!)
        res.json({ message: `Hello, ${name}!`, jersey_color: colors[lucky_color_index] })
    } else {
        // TODO: TASK 3: inspect for issues and correct
        res.json({ message: `Hello, ${name}, we like your jersey!` })
    }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************

/////////////////////////////////////////////////////////////////

//QUERY A


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










///////////////////////////////////////////////////////////

// Route 3 (handler)
async function all_matches(req, res) {
    // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
    // We have partially implemented this function for you to 
    // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
    // we didn't specify this default value for league, and you could change it if you want! 
    // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here... 
    const league = req.params.league ? req.params.league : 'D1'
    // use this league encoding in your query to furnish the correct results
    const pagesize = req.query.pagesize ? req.query.pagesize : 10

    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:

        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam
        LIMIT ${(req.query.page-1)*pagesize}, ${pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
   
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// Route 4 (handler)
async function all_players(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    
    const pagesize = req.query.pagesize ? req.query.pagesize : 10

    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.

        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        ORDER BY Name
        LIMIT ${(req.query.page-1)*pagesize}, ${pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
            
    } else {

        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        ORDER BY Name`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    }

}


// ********************************************
//             MATCH-SPECIFIC ROUTES
// ********************************************

// Route 5 (handler)
async function match(req, res) {
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests

    if (req.query.id && !isNaN(req.query.id)) {
        connection.query(`SELECT MatchId, Date, Time, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals, HalfTimeGoalsH AS HTHomeGoals, HalfTimeGoalsA AS HTAwayGoals, ShotsH AS ShotsHome, ShotsA AS ShotsAway, ShotsOnTargetH As ShotsOnTargetHome, ShotsOnTargetA AS ShotsOnTargetAway, FoulsH AS FoulsHome, FoulsA AS FoulsAway, CornersH AS CornersHome, CornersA AS CornersAway, YellowCardsH AS YCHome, YellowCardsA AS YCAway, RedCardsH AS RCHome, RedCardsA AS RCAway
        FROM Matches 
        WHERE MatchId = ${req.query.id}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        res.json({ error: error })
    }
}

// ********************************************
//            PLAYER-SPECIFIC ROUTES
// ********************************************

// Route 6 (handler)
async function player(req, res) {
    // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
    if (req.query.id && !isNaN(req.query.id)) {
        var sqlGK = `SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, BestOverallRating, ReleaseClause, GKPenalties, GKDiving, GKHandling, GKKicking, GKPositioning, GKReflexes
        FROM Players
        WHERE PlayerId = ${req.query.id} AND BestPosition = 'GK';`

        var sqlN = `SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, BestOverallRating, ReleaseClause, NPassing, NBallControl, NAdjustedAgility, NStamina, NStrength, NPositioning
        FROM Players
        WHERE PlayerId = ${req.query.id} AND BestPosition <> 'GK';`
        
        connection.query(sqlGK + sqlN, function (error, results, fields) {    
            if (error) {
                console.log(error)
                res.json({ error: error });
            } else {

                if (results[0].length) {
                    res.json({results: results[0]});
                } else {
                    res.json({results: results[1]});
                }

            }
        });

        } else {
            res.json({ error: error })
            
        }
        
}


// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 7 (handler)
async function search_matches(req, res) {
    // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    
    const Home = req.query.Home ? req.query.Home : ''
    const Away = req.query.Away ? req.query.Away : ''
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize : 10


    if (page && !isNaN(page)) {
        // This is the case where page is defined.

        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE HomeTeam LIKE '%${Home}%' AND AwayTeam Like '%${Away}%'
        ORDER BY Home, Away
        LIMIT ${pagesize*(page-1)}, ${pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
            
    } else {

        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE HomeTeam LIKE '%${Home}%' AND AwayTeam Like '%${Away}%'
        ORDER BY Home, Away`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    }

}

// Route 8 (handler)
async function search_players(req, res) {
    // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string

    const Name = req.query.Name ? req.query.Name : ''
    const Nationality = req.query.Nationality ? req.query.Nationality : ''
    const Club = req.query.Club ? req.query.Club : ''
    const RatingLow = req.query.RatingLow ? req.query.RatingLow : 0
    const RatingHigh = req.query.RatingHigh ? req.query.RatingHigh : 100
    const PotentialLow = req.query.PotentialLow ? req.query.PotentialLow : 0
    const PotentialHigh = req.query.PotentialHigh ? req.query.PotentialHigh : 100
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize : 10

    if (page && !isNaN(page)) {
        // This is the case where page is defined.

        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        WHERE Name LIKE '%${Name}%' AND Nationality LIKE '%${Nationality}%' AND Club LIKE '%${Club}%' AND OverallRating BETWEEN ${RatingLow} AND ${RatingHigh} AND Potential BETWEEN ${PotentialLow} AND ${PotentialHigh}
        ORDER BY Name
        LIMIT ${pagesize*(page-1)}, ${pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
            
    } else {

        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        WHERE Name LIKE '%${Name}%' AND Nationality LIKE '%${Nationality}%' AND Club LIKE '%${Club}%' AND OverallRating BETWEEN ${RatingLow} AND ${RatingHigh} AND Potential BETWEEN ${PotentialLow} AND ${PotentialHigh}
        ORDER BY Name`, function (error, results, fields) {

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
    hello,
    jersey,
    all_matches,
    all_players,
    match,
    player,
    search_matches,
    search_players,
    zips_for_good_meals_by_type,
    filter_attributes,
    filter_neighborhoods
}