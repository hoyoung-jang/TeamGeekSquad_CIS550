import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    Checkbox
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';




import MenuBar from '../components/MenuBar';
import { getRestaurantsByPostalCode,
    getAllRestaurants,
    getZipsForGoodMealsByType,
    getRestaurantsByStateCity,
    getFilterNeighborhoods,
    getRevisitRate,
    getTopTenRestaurantsByCityCOVID,
    getReviews,
    getRestaurant
} from '../fetcher'

const wideFormat = format('.3r');

const { Column, ColumnGroup } = Table;
const { Option } = Select;


class OwnerPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: "PA",
            city: "",
            bikeParking: 0,
            creditCards: 0,
            delivery: 0,
            takeOut: 0,
            mealType: "Italian",
            page: 1,
            pagesize: 1000000,
            starsLow: 0,
            starsHigh: 5,
            restaurantsResults: [],
            selectedRestaurantId: window.location.search ? window.location.search.substring(1).split('=')[1] : 'bZiIIUcpgxh8mpKMDhdqbA',
            selectedRestaurantReviews: [],
            selectedRestaurantStars: 0,
            selectedRestaurantPostalCode: 0,
            selectedRestaurantRevisitRate: 0,
            selectedRestaurantReviewCount: 0,
            selectedRestaurantCompetitorCount: 0,
            selectedRestaurantNearby: [],
            comparisonRestaurantId: window.location.search ? window.location.search.substring(1).split('=')[1] : 'bZiIIUcpgxh8mpKMDhdqbA',
            comparisonRestaurantStars: 0,
            comparisonRestaurantPostalCode: 0,
            comparisonRestaurantRevisitRate: 0,
            comparisonRestaurantReviewCount: 0,
            comparisonRestaurantCompetitorCount: 0

        }

        this.stateChange = this.stateChange.bind(this)
        this.cityChange = this.cityChange.bind(this)
        this.bikeParkingChange = this.bikeParkingChange.bind(this)
        this.creditCardsChange = this.creditCardsChange.bind(this)
        this.deliveryChange = this.deliveryChange.bind(this)
        this.takeOutChange = this.takeOutChange.bind(this)
        this.mealTypeChange = this.mealTypeChange.bind(this)
        this.pageChange = this.pageChange.bind(this)
        this.handleStarsChange = this.handleStarsChange.bind(this)

        this.updateGetRestaurantsByStateCity = this.updateGetRestaurantsByStateCity.bind(this)
        this.updateSelectedRestaurant = this.updateSelectedRestaurant.bind(this)

        this.goToReviews = this.goToReviews.bind(this)
    }

    stateChange(value) {
        this.setState({state: value})
    }

    cityChange(event) {
        this.setState({city: event.target.value})
    }

    bikeParkingChange(event) {
        if (event.target.checked = true) {
            this.setState({bikeParking: 1})
        } else {
            this.setState({bikeParking: 0})
        }
    }

    creditCardsChange(event) {
        if (event.target.checked = true) {
            this.setState({creditCards: 1})
        } else {
            this.setState({creditCards: 0})
        }
    }

    deliveryChange(event) {
        if (event.target.checked = true) {
            this.setState({delivery: 1})
        } else {
            this.setState({delivery: 0})
        }
    }

    takeOutChange(event) {
        if (event.target.checked = true) {
            this.setState({takeOut: 1})
        } else {
            this.setState({takeOut: 0})
        }
    }

    mealTypeChange(event) {
        this.setState({mealType: event.target.value})
    }

    pageChange(event) {
        this.setState({page: event.target.value})
    }

    handleStarsChange(value) {
        this.setState({starsLow: value[0]})
        this.setState({starsHigh: value[1]})
    }

    updateGetRestaurantsByStateCity() {
        getRestaurantsByStateCity(this.state.state, this.state.city, this.state.starsHigh, this.state.starsLow,
            this.state.bikeParking, this.state.creditCards, this.state.delivery, this.state.takeOut, this.state.mealType, this.state.page, this.state.pagesize)
            .then(res => {
                this.setState({ restaurantsResults: res.results })
            })
    }

    updateSelectedRestaurant(record) {
        getRestaurant(record.businessId).then(res => {
            this.setState({ selectedRestaurantStars: res.results.stars, selectedRestaurantPostalCode: res.results.postal_code, selectedRestaurantReviewCount: res.results.review_count })
        })

        getRevisitRate(record.businessId).then(res =>{
            this.setState({selectedRestaurantRevisitRate: res.results.revisiting_rate})
        })

        getRestaurantsByPostalCode(record.postalCode).then(res => {
            this.setState({ selectedRestaurantNearby: res.results, selectedRestaurantCompetitorCount: res.results.length })
        })

    }

    goToReviews(businessId) {
        // window.location = `/owner?id=${businessId}`
        getReviews(businessId).then(res => {
            this.setState({ selectedRestaurantReviews: res.results })
        })
    }

    goToDetails(businessId) {

    }


    componentDidMount() {
        getRestaurantsByStateCity(this.state.state, this.state.city, this.state.starsHigh, this.state.starsLow,
            this.state.bikeParking, this.state.creditCards, this.state.delivery, this.state.takeOut, this.state.mealType, this.state.page, this.state.pagesize)
            .then(res => {
                this.setState( {restaurantsResults: res.results} )
            })

        getReviews(this.state.selectedRestaurantId).then(res => {
            this.setState({ selectedRestaurantReviews: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>State</label><br/>
                            <Select defaultValue="PA" style={{ width: 180 }} onChange={this.stateChange}>
                                <Option value="AL">Alabama</Option>
                                <Option value="AK">Alaska</Option>
                                <Option value="AZ">Arizona</Option>
                                <Option value="AR">Arkansas</Option>
                                <Option value="CA">California</Option>
                                <Option value="CZ">Canal Zone</Option>
                                <Option value="CO">Colorado</Option>
                                <Option value="CT">Connecticut</Option>
                                <Option value="DE">Delaware</Option>
                                <Option value="DC">District of Columbia</Option>
                                <Option value="FL">Florida</Option>
                                <Option value="GA">Georgia</Option>
                                <Option value="GU">Guam</Option>
                                <Option value="HI">Hawaii</Option>
                                <Option value="ID">Idaho</Option>
                                <Option value="IL">Illinois</Option>
                                <Option value="IN">Indiana</Option>
                                <Option value="IA">Iowa</Option>
                                <Option value="KS">Kansas</Option>
                                <Option value="KY">Kentucky</Option>
                                <Option value="LA">Louisiana</Option>
                                <Option value="ME">Maine</Option>
                                <Option value="MD">Maryland</Option>
                                <Option value="MA">Massachusetts</Option>
                                <Option value="MI">Michigan</Option>
                                <Option value="MN">Minnesota</Option>
                                <Option value="MS">Mississippi</Option>
                                <Option value="MO">Missouri</Option>
                                <Option value="MT">Montana</Option>
                                <Option value="NE">Nebraska</Option>
                                <Option value="NV">Nevada</Option>
                                <Option value="NH">New Hampshire</Option>
                                <Option value="NJ">New Jersey</Option>
                                <Option value="NM">New Mexico</Option>
                                <Option value="NY">New York</Option>
                                <Option value="NC">North Carolina</Option>
                                <Option value="ND">North Dakota</Option>
                                <Option value="OH">Ohio</Option>
                                <Option value="OK">Oklahoma</Option>
                                <Option value="OR">Oregon</Option>
                                <Option value="PA">Pennsylvania</Option>
                                <Option value="PR">Puerto Rico</Option>
                                <Option value="RI">Rhode Island</Option>
                                <Option value="SC">South Carolina</Option>
                                <Option value="SD">South Dakota</Option>
                                <Option value="TN">Tennessee</Option>
                                <Option value="TX">Texas</Option>
                                <Option value="UT">Utah</Option>
                                <Option value="VT">Vermont</Option>
                                <Option value="VI">Virgin Islands</Option>
                                <Option value="VA">Virginia</Option>
                                <Option value="WA">Washington</Option>
                                <Option value="WV">West Virginia</Option>
                                <Option value="WI">Wisconsin</Option>
                                <Option value="WY">Wyoming</Option>
                            </Select>
                        </FormGroup></Col>

                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>City</label>
                            <FormInput placeholder="City" value={this.state.city} onChange={this.cityChange} />
                        </FormGroup></Col>

                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>Meal Type</label>
                            <FormInput placeholder="Meal Type" value={this.state.mealType} onChange={this.mealTypeChange} />
                        </FormGroup></Col>

                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>Stars</label>
                            <Slider range defaultValue={[0,5]} max={5} min={0} step={0.5} onChange={this.handleStarsChange} />
                        </FormGroup></Col>

                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateGetRestaurantsByStateCity}>Search</Button>
                        </FormGroup></Col>

                    </Row>

                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>Bike Parking</label><br/>
                            <Checkbox defaultChecked={false} onChange={this.bikeParkingChange} />
                        </FormGroup></Col>

                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>Accepting Credit Cards</label><br/>
                            <Checkbox defaultChecked={false} onChange={this.creditCardsChange} />
                        </FormGroup></Col>

                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>Delivery</label><br/>
                            <Checkbox defaultChecked={false} onChange={this.deliveryChange} />
                        </FormGroup></Col>

                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>Takeout</label><br/>
                            <Checkbox defaultChecked={false} onChange={this.takeOutChange} />
                        </FormGroup></Col>

                    </Row>

                </Form>
                <Divider />
                {/* TASK 12: Copy over your implementation of the matches table from the home page */}

                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Table onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {this.updateSelectedRestaurant(record)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
                        };
                    }} dataSource={this.state.restaurantsResults} pagination={{ pageSizeOptions:[5, 10, 20], defaultPageSize: 5, showQuickJumper:true }}>
                        <ColumnGroup title="Teams">
                            <Column title="Name" dataIndex="name" key="name" sorter= {(a, b) => a.name.localeCompare(b.name)}
                                    render={(text, row) => <a href={`/customer?id=${row.businessId}`}>{text}</a>}/>
                            <Column title="Stars" dataIndex="stars" key="stars" sorter= {(a, b) => a.stars - b.stars}/>
                        </ColumnGroup>
                        <ColumnGroup title="Location Info">
                            <Column title="City" dataIndex="city" key="city" sorter= {(a, b) => a.city.localeCompare(b.city)}/>
                            <Column title="Address" dataIndex="address" key="address" sorter= {(a, b) => a.address.localeCompare(b.address)}/>
                            <Column title="Postal Code" dataIndex="postalCode" key="postalCode" sorter= {(a, b) => a.postalCode - b.postalCode}/>
                            <Column title="Latitude" dataIndex="lat" key="lat" sorter= {(a, b) => a.lat - b.lat}/>
                            <Column title="Longitude" dataIndex="lon" key="lon" sorter= {(a, b) => a.lon - b.lon}/>
                        </ColumnGroup>
                    </Table>

                </div>

                <Divider />
                {this.state.selectedRestaurantNearby ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Table onRow={(record, rowIndex) => {
                    }} dataSource={this.state.selectedRestaurantNearby} pagination={{ pageSizeOptions:[5, 10, 20], defaultPageSize: 5, showQuickJumper:true }}>
                        <ColumnGroup title="Teams">
                            <Column title="Name" dataIndex="name" key="name" sorter= {(a, b) => a.name.localeCompare(b.name)}
                                    render={(text, row) => <a href={`/customer?id=${row.businessId}`}>{text}</a>}/>
                            <Column title="Stars" dataIndex="stars" key="stars" sorter= {(a, b) => a.stars - b.stars}/>
                        </ColumnGroup>
                    </Table>
                </div> : null}
                <Divider />

            </div>
        )
    }
}

export default OwnerPage
