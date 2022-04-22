import config from './config.json'


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

const getCalcRevisitRateByBusinessId = async (business_id, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/calc_revisit_rate_by_business_id?business_id=${business_id}&page=${page}&pagesize=${pagesize}`, {
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
    getRestaurantByPostalCode,
    getZipsForGoodMealsByType,
    getFilterAttributes,
    getFilterNeighborhoods,
    getCalcRevisitRateByBusinessId,
    getTopTenRestaurantsByCityCOVID
}