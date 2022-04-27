import config from './config.json'

const getRestaurant = async (businessId) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getRestaurant?businessId=${businessId}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllRestaurants = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getAllRestaurants?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getRestaurantsByPostalCode = async (postal_code, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getRestaurantsByPostalCode?postal_code=${postal_code}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getRestaurantsByStateCity = async (state, city, starsHigh, starsLow, bikeParking, creditCards, delivery, takeOut, mealType, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getRestaurantsByStateCity?state=${state}&city=${city}&starsHigh=${starsHigh}&starsLow=${starsLow}&bikeParking=${bikeParking}&creditCards=${creditCards}&delivery=${delivery}&takeOut=${takeOut}&mealType=${mealType}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getRevisitRate = async (businessId) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getRevisitRate?businessId=${businessId}`, {
        method: 'GET',
    })
    return res.json()
}

const getRegularCustomers = async (businessId, number) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getRegularCustomers?businessId=${businessId}&number=${number}`, {
        method: 'GET',
    })
    return res.json()
}

const getReviews = async (businessId) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getReviews?businessId=${businessId}`, {
        method: 'GET',
    })
    return res.json()
}

const getCovidBanner = async (businessId) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getCovidBanner?businessId=${businessId}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getAllRestaurants,
    getRestaurantsByPostalCode,
    getRestaurantsByStateCity,
    getRevisitRate,
    getRegularCustomers,
    getReviews,
    getRestaurant,
    getCovidBanner
}


// const getZipsForGoodMealsByType = async (meal_type, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/zips_for_good_meals_by_type?postal_code=${meal_type}&page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }
// const getFilterNeighborhoods = async (state, postal_code, meal_type, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/filter_neighborhoods?state=${state}&postal_code=${postal_code}&meal_type=${meal_type}&page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }
// const getTopTenRestaurantsByCityCOVID = async (city, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/top_ten_restaurants_by_city_COVID?city=${city}&page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

