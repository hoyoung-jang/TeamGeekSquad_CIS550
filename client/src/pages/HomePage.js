import React from 'react';
import {
  Table,
  Pagination,
  Row,
  Col,
  Divider,
  Select,
  Slider,
  Checkbox
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllRestaurants, getCovidBanner } from '../fetcher'

const restaurantColumns = [
 /*  {
    title: 'business ID',
    dataIndex: 'businessId',
    key: 'businessId',
    sorter: (a, b) => a.business_id.localeCompare(b.business_id)
  }, */
  {
    title: 'Restaurant Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: 'Stars',
    dataIndex: 'stars',
    key: 'stars',
    sorter: (a, b) => a.stars - b.stars
    
  },
  // TASK 7: add a column for Potential, with the ability to (numerically) sort ,
  {
    title: 'Number of Reviews',
    dataIndex: 'review_count',
    key: 'review_count',
    sorter: (a, b) => a.review_count - b.review_count
  },

  // TASK 8: add a column for Club, with the ability to (alphabetically) sort 
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours'
  }
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      restaurantsResults: [],
      // pagination: null
      covidBanner: []
    }
  
    this.updateAllRestaurants = this.updateAllRestaurants.bind(this)
    this.updateCovidBanner = this.updateCovidBanner.bind(this)
  }


  updateAllRestaurants() {
    getAllRestaurants(null, null).then(res => {
      // TASK 1: set the correct state attribute to res.results
      this.setState({ restaurantsResults: res.results })
    })
  }


  updateCovidBanner(record) {
    getCovidBanner(record.business_id).then(res => {
      // TASK 1: set the correct state attribute to res.results
      this.setState({ covidBanner: res.results })
    })
  }


  componentDidMount() {
    getAllRestaurants(null, null).then(res => {
      // TASK 1: set the correct state attribute to res.results
      this.setState({ restaurantsResults: res.results })
    })
  }

  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Restaurants</h3>
          <Table onRow={(record, rowIndex) => {
            return {
              onClick: event => {this.updateCovidBanner(record)}
            };
          }} dataSource={this.state.restaurantsResults} columns={restaurantColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>

        <Divider />
        {this.state.covidBanner ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <Table onRow={(record, rowIndex) => {
          }} dataSource={this.state.covidBanner} pagination={{ pageSizeOptions:[5, 10, 20], defaultPageSize: 5, showQuickJumper:true }}>
            <Col title="COVID Policy" dataIndex="COVID_banner" key="COVID_banner"/>
          </Table>
        </div> : null}
        <Divider />
      </div>
    )
  }
}

export default HomePage

