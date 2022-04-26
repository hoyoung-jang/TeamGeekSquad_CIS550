import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllRestaurants } from '../fetcher'

const restaurantColumns = [
  {
    title: 'business_id',
    dataIndex: 'business_id',
    key: 'business_id',
    sorter: (a, b) => a.business_id.localeCompare(b.business_id)
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: 'stars',
    dataIndex: 'stars',
    key: 'stars',
    sorter: (a, b) => a.stars - b.stars
    
  },
  // TASK 7: add a column for Potential, with the ability to (numerically) sort ,
  {
    title: 'review_count',
    dataIndex: 'review_count',
    key: 'review_count'
  },

  // TASK 8: add a column for Club, with the ability to (alphabetically) sort 
  {
    title: 'hours',
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
    }
  
    this.leagueOnChange = this.leagueOnChange.bind(this)
  }


  leagueOnChange() {
    getAllRestaurants(null, null).then(res => {
      // TASK 1: set the correct state attribute to res.results
      this.setState({ restaurantsResults: res.results })
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
          <Table dataSource={this.state.restaurantsResults} columns={restaurantColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>

      </div>
    )
  }

}

export default HomePage

