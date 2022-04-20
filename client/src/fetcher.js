import config from './config.json'

const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}





const getRestaurantByPostalCode = async (postal_code, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurant_by_postal_code?postal_code=${postal_code}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getZipsForGoodMealsByType = async (meal_type, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/zips_for_good_meals_by_type?postal_code=${meal_type}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getFilterAttributes = async (state, bike_parking, wifi, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/filter_attributes?state=${state}&bike_parking=${bike_parking}&wifi=${wifi}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getFilterNeighborhoods = async (state, postal_code, meal_type, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/filter_neighborhoods?state=${state}&postal_code=${postal_code}&meal_type=${meal_type}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


const getTopTenRestaurantsByCityCOVID = async (city, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top_ten_restaurants_by_city_COVID?city=${city}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}



export {
    getAllMatches,
    getAllPlayers,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch,

    getRestaurantByPostalCode,
    getZipsForGoodMealsByType,
    getFilterAttributes,
    getFilterNeighborhoods,
    top_ten_restaurants_by_city_COVID
}