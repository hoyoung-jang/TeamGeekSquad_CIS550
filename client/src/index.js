import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import CustomerPage from './pages/CustomerPage';
import OwnerPage from './pages/OwnerPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


ReactDOM.render(
	<div>
		<Router>
			<Switch>
				<Route exact
					   path="/"
					   render={() => (
						   <HomePage />
					   )}/>
				<Route exact
					   path="/customer"
					   render={() => (
						   <CustomerPage />
					   )}/>
				<Route exact
					   path="/owner"
					   render={() => (
						   <OwnerPage />
					   )}/>
			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);
