import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    // Pagination,
    Row,
    Col,
    Divider,
    Select,
    Slider, Checkbox
} from 'antd'

import { getRestaurantByPostalCode,
    getZipsForGoodMealsByType,
    getRestaurantsByStateCity,
    getFilterNeighborhoods,
    getCalcRevisitRateByBusinessId,
    getTopTenRestaurantsByCityCOVID
} from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;
const { Option } = Select;


class CustomerPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: "PA",
            city: "Philadelphia",
            bikeParking: null,
            creditCards: null,
            delivery: null,
            takeOut: null,
            mealType: "Italian",
            page: 1,
            pagesize: 10,
            starsLow: 0,
            starsHigh: 5,
            restaurantsResults: []
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
    }

    stateChange(value) {
        this.setState({state: value})
    }

    cityChange(event) {
        this.setState({city: event.target.value})
    }

    bikeParkingChange(event) {
        if (event.target.checked) {
            this.setState({bikeParking: 1})
        } else {
            this.setState({bikeParking: null})
        }
    }

    creditCardsChange(event) {
        if (event.target.checked) {
            this.setState({creditCards: 1})
        } else {
            this.setState({creditCards: null})
        }
    }

    deliveryChange(event) {
        if (event.target.checked) {
            this.setState({delivery: 1})
        } else {
            this.setState({delivery: null})
        }
    }

    takeOutChange(event) {
        if (event.target.checked) {
            this.setState({takeOut: 1})
        } else {
            this.setState({takeOut: null})
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
            this.state.bikeParking, this.state.creditCards, this.state.delivery, this.state.takeOut, this.state.mealType, this.state.page, this.state.pagesize).then(res => {

            // this.setState({ restaurantsResults: res.results })
        })
    }

    goToReview(businessId) {
        window.location = `/reviews?id=${businessId}`
    }


    componentDidMount() {
        getRestaurantsByStateCity(this.state.state, this.state.city, this.state.starsHigh, this.state.starsLow,
            this.state.bikeParking, this.state.creditCards, this.state.delivery, this.state.takeOut, this.state.mealType, this.state.page, this.state.pagesize).then(res => {

                // this.setState({ restaurantsResults.name : res.results.name, restaurantsResults.stars:res.results.stars, restaurantsResults.address: res.results.address, "postalCode": res.results.postalCode, "lat": res.results.lat, "lon": res.results.lon}] })

            }
        )
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
                    {/*<h3>State</h3>*/}
                    {/*<Select defaultValue="PA" style={{ width: 120 }} onChange={this.stateChange}>*/}
                    {/*    <Option value="PA">Pennsylvania</Option>*/}
                    {/*    <Option value="CA">California</Option>*/}
                    {/*</Select>*/}

                    <Table onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {this.goToReview(record.businessId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
                        };
                    }} dataSource={this.state.restaurantsResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                        <ColumnGroup title="Teams">
                            <Column title="Name" dataIndex="name" key="name" sorter= {(a, b) => a.name.localeCompare(b.name)}/>
                            <Column title="Stars" dataIndex="stars" key="stars" sorter= {(a, b) => a.stars.localeCompare(b.stars)}/>
                        </ColumnGroup>
                        <ColumnGroup title="Location Info">
                            <Column title="Address" dataIndex="address" key="address" sorter= {(a, b) => a.address - b.address}/>
                            <Column title="Postal Code" dataIndex="postalCode" key="postalCode" sorter= {(a, b) => a.postalCode - b.postalCode}/>
                            <Column title="Latitude" dataIndex="lat" key="lat" sorter= {(a, b) => a.lat - b.lat}/>
                            <Column title="Longitude" dataIndex="lon" key="lon" sorter= {(a, b) => a.lon - b.lon}/>
                        </ColumnGroup>
                    </Table>

                </div>



                <Divider />
                {this.state.restaurantsResults ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>


                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <CardTitle>{this.state.restaurantsResults}</CardTitle>

                                </Col>
                                <Col flex={2} style={{ textAlign: 'center' }}>
                                    {this.state.restaurantsResults} at {this.state.restaurantsResults}
                                </Col>
                                {/* TASK 13: Add a column with flex = 2, and text alignment = right to display the name of the away team - similar to column 1 in this row */}
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    <CardTitle>{this.state.restaurantsResults}</CardTitle>
                                </Col>

                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h3>{this.state.restaurantsResults}</h3>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Goals
                                </Col >
                                {/* TASK 14: Add a column with span = 9, and text alignment = right to display the # of goals the away team scored - similar 1 in this row */}

                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h3>{this.state.restaurantsResults}</h3>
                                </Col>
                            </Row>
                            {/* TASK 15: create a row for goals at half time similar to the row for 'Goals' above, but use h5 in place of h3!  */}

                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Half-time Goals
                                </Col >

                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col>
                            </Row>



                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <Progress value={this.state.restaurantsResults}>{this.state.restaurantsResults}</Progress>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Shot Accuracy
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    {/* TASK 18: add a progress bar to display the shot accuracy for the away team -  look at the progress bar in column 1 of this row for reference*/}
                                    <Progress value={this.state.restaurantsResults}>{this.state.restaurantsResults}</Progress>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Corners
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col>
                            </Row>
                            {/* TASK 16: add a row for fouls cards - check out the above lines for how we did it for corners */}
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Fouls
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col>
                            </Row>



                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Red Cards
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col>
                            </Row>
                            {/* TASK 17: add a row for yellow cards - check out the above lines for how we did it for red cards */}
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Yellow Cards
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantsResults}</h5>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>

                </div> : null}
                <Divider />

            </div>
        )
    }
}

export default CustomerPage




