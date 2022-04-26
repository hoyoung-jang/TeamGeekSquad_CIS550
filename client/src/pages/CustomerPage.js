import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    // Pagination,
    Row,
    Col,
    Divider,
    Select
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
            states: "CA",
            city: "LA",
            bikeParking: "False",
            wifi: "True",
            postalCode: 33707,
            mealType: 'Italian',
            restaurantResults: []
        }

        this.statesChange = this.statesChange.bind(this)
        this.cityChange = this.cityChange.bind(this)
        // this.bikeParkingChange = this.bikeParkingChange.bind(this)
        // this.wifiChange = this.wifiChange.bind(this)
        // this.postalCodeChange = this.postalCodeChange.bind(this)
        // this.mealTypeChange = this.mealTypeChange.bind(this)
    }

    statesChange(event) {
        this.setState({states: event.target.state})
    }

    cityChange(event) {
        this.setState({city: event.target.city})
    }

    updateFilterNeighborhoods(){
        getFilterNeighborhoods(this.state.states, this.state.postalCode, this.state.mealType, null, null).then(res => {
            this.setState({ restaurantResults: res.results })
        })
    }


    updateGetRestaurantsByStateCity(){
        getRestaurantsByStateCity().then(res => {
            this.setState({ restaurantResults: res.results })
        })
    }


    // goToMatch(matchId) {
    //     window.location = `/matches?id=${matchId}`
    //
    // }
    //



    componentDidMount() {
        // getFilterAttributes().then(res => {
        //     this.setState({ matchesResults: res.results })
        // })
        //
        // getRestaurantByPostalCode(this.state.postalCode).then(res => {
        //     this.setState({ restaurantResults: res.results[0] })
        // })

    }

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>State</label>
                            <FormInput placeholder="States" value={this.state.states} onChange={this.statesChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>City</label>
                            <FormInput placeholder="City" value={this.state.city} onChange={this.cityChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateFilterNeighborhoods}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                {/* TASK 12: Copy over your implementation of the matches table from the home page */}

                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>States</h3>
                    <Select defaultValue="PA" style={{ width: 120 }} onChange={this.statesChange}>
                        <Option value="PA">Pennsylvania</Option>
                        <Option value="CA">California</Option>
                    </Select>

                    <Table onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
                        };
                    }} dataSource={this.state.matchesResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                        <ColumnGroup title="Teams">

                            <Column title="Home" dataIndex="Home" key="Home" sorter= {(a, b) => a.Home.localeCompare(b.Home)}/>
                            <Column title="Away" dataIndex="Away" key="Away" sorter= {(a, b) => a.Away.localeCompare(b.Away)}/>
                        </ColumnGroup>
                        <ColumnGroup title="Goals">

                            <Column title="HomeGoals" dataIndex="HomeGoals" key="HomeGoals" sorter= {(a, b) => a.HomeGoals - b.HomeGoals}/>
                            <Column title="AwayGoals" dataIndex="AwayGoals" key="AwayGoals" sorter= {(a, b) => a.AwayGoals - b.AwayGoals}/>
                        </ColumnGroup>

                        <Column title="Date" dataIndex="Date" key="Date"/>
                        <Column title="Time" dataIndex="Time" key="Time"/>
                    </Table>

                </div>






                <Divider />
                {this.state.restaurantResults ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>


                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <CardTitle>{this.state.restaurantResults}</CardTitle>

                                </Col>
                                <Col flex={2} style={{ textAlign: 'center' }}>
                                    {this.state.restaurantResults} at {this.state.restaurantResults}
                                </Col>
                                {/* TASK 13: Add a column with flex = 2, and text alignment = right to display the name of the away team - similar to column 1 in this row */}
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    <CardTitle>{this.state.restaurantResults}</CardTitle>
                                </Col>

                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h3>{this.state.selectedMatchDetails}</h3>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Goals
                                </Col >
                                {/* TASK 14: Add a column with span = 9, and text alignment = right to display the # of goals the away team scored - similar 1 in this row */}

                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h3>{this.state.restaurantResults}</h3>
                                </Col>
                            </Row>
                            {/* TASK 15: create a row for goals at half time similar to the row for 'Goals' above, but use h5 in place of h3!  */}

                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantResults}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Half-time Goals
                                </Col >

                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantResults}</h5>
                                </Col>
                            </Row>



                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <Progress value={this.state.restaurantResults.avg_rating}>{this.state.restaurantResults.avg_rating}</Progress>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Shot Accuracy
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    {/* TASK 18: add a progress bar to display the shot accuracy for the away team -  look at the progress bar in column 1 of this row for reference*/}
                                    <Progress value={this.state.restaurantResults.avg_rating}>{this.state.restaurantResults.avg_rating}</Progress>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantResults.avg_rating}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Corners
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantResults.avg_rating}</h5>
                                </Col>
                            </Row>
                            {/* TASK 16: add a row for fouls cards - check out the above lines for how we did it for corners */}
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantResults.avg_rating}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Fouls
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantResults.avg_rating}</h5>
                                </Col>
                            </Row>



                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantResults.avg_rating}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Red Cards
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantResults.avg_rating}</h5>
                                </Col>
                            </Row>
                            {/* TASK 17: add a row for yellow cards - check out the above lines for how we did it for red cards */}
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{this.state.restaurantResults.avg_rating}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Yellow Cards
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{this.state.restaurantResults.avg_rating}</h5>
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




