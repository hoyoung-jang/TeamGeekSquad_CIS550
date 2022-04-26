import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    // Pagination,
    Row,
    Col,
    Divider,
    Select,
    Slider
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
            restaurantsResults: [],
            page: 1,
            pagesize: 10,
            starsLow: 0,
            starsHigh: 5
        }

        this.stateChange = this.stateChange.bind(this)
        this.cityChange = this.cityChange.bind(this)
        this.bikeParkingChange = this.bikeParkingChange.bind(this)
        this.creditCardsChange = this.creditCardsChange.bind(this)
        this.deliveryChange = this.deliveryChange.bind(this)
        this.takeOutChange = this.takeOutChange.bind(this)
        this.mealTypeChange = this.mealTypeChange.bind(this)
        this.handleStarsChange = this.handleStarsChange.bind(this)
    }

    stateChange(event) {
        this.setState({state: event.target.value})
    }

    cityChange(event) {
        this.setState({city: event.target.value})
    }

    bikeParkingChange(event) {
        this.setState({bikeParking: event.target.value})
    }

    creditCardsChange(event) {
        this.setState({creditCards: event.target.value})
    }

    deliveryChange(event) {
        this.setState({delivery: event.target.value})
    }

    takeOutChange(event) {
        this.setState({takeOut: event.target.value})
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
        getRestaurantsByStateCity(this.state.state, this.state.city, this.state.bikeParking, this.state.creditCards, this.state.delivery  , this.state.takeOut, this.state.mealType, this.state.page, this.state.pagesize).then(res => {
            this.setState({restaurantsResults: res.results})
        })
    }

    goToReview(businessId) {
        window.location = `/reviews?id=${businessId}`
    }


    componentDidMount() {
        // getRestaurantsByStateCity(this.state.state, this.state.city, this.state.bikeParking, this.state.creditCards, this.state.delivery, this.state.takeOut, this.state.mealType, this.state.page, this.state.pagesize).then(res => {
        //     this.setState({restaurantsResults: res.results})
        // })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>State</label><br/>
                            <Select defaultValue="PA" value={this.state.state} style={{ width: 180 }} onChange={this.stateChange}>
                                <Option Value='AL'>Alabama</Option>
                                <Option Value='AK'>Alaska</Option>
                                <Option Value='AZ'>Arizona</Option>
                                <Option Value='AR'>Arkansas</Option>
                                <Option Value='CA'>California</Option>
                                <Option Value='CZ'>Canal Zone</Option>
                                <Option Value='CO'>Colorado</Option>
                                <Option Value='CT'>Connecticut</Option>
                                <Option Value='DE'>Delaware</Option>
                                <Option Value='DC'>District of Columbia</Option>
                                <Option Value='FL'>Florida</Option>
                                <Option Value='GA'>Georgia</Option>
                                <Option Value='GU'>Guam</Option>
                                <Option Value='HI'>Hawaii</Option>
                                <Option Value='ID'>Idaho</Option>
                                <Option Value='IL'>Illinois</Option>
                                <Option Value='IN'>Indiana</Option>
                                <Option Value='IA'>Iowa</Option>
                                <Option Value='KS'>Kansas</Option>
                                <Option Value='KY'>Kentucky</Option>
                                <Option Value='LA'>Louisiana</Option>
                                <Option Value='ME'>Maine</Option>
                                <Option Value='MD'>Maryland</Option>
                                <Option Value='MA'>Massachusetts</Option>
                                <Option Value='MI'>Michigan</Option>
                                <Option Value='MN'>Minnesota</Option>
                                <Option Value='MS'>Mississippi</Option>
                                <Option Value='MO'>Missouri</Option>
                                <Option Value='MT'>Montana</Option>
                                <Option Value='NE'>Nebraska</Option>
                                <Option Value='NV'>Nevada</Option>
                                <Option Value='NH'>New Hampshire</Option>
                                <Option Value='NJ'>New Jersey</Option>
                                <Option Value='NM'>New Mexico</Option>
                                <Option Value='NY'>New York</Option>
                                <Option Value='NC'>North Carolina</Option>
                                <Option Value='ND'>North Dakota</Option>
                                <Option Value='OH'>Ohio</Option>
                                <Option Value='OK'>Oklahoma</Option>
                                <Option Value='OR'>Oregon</Option>
                                <Option Value='PA'>Pennsylvania</Option>
                                <Option Value='PR'>Puerto Rico</Option>
                                <Option Value='RI'>Rhode Island</Option>
                                <Option Value='SC'>South Carolina</Option>
                                <Option Value='SD'>South Dakota</Option>
                                <Option Value='TN'>Tennessee</Option>
                                <Option Value='TX'>Texas</Option>
                                <Option Value='UT'>Utah</Option>
                                <Option Value='VT'>Vermont</Option>
                                <Option Value='VI'>Virgin Islands</Option>
                                <Option Value='VA'>Virginia</Option>
                                <Option Value='WA'>Washington</Option>
                                <Option Value='WV'>West Virginia</Option>
                                <Option Value='WI'>Wisconsin</Option>
                                <Option Value='WY'>Wyoming</Option>
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




