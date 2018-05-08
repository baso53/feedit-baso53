import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: null
		};

		axios.head('/api')
		.then(response => {
			if (response.status === 204){
				this.setState({
					isAuthenticated: true
				});
			}
		}).catch(error => {
			if (error.response){
				this.setState({
					isAuthenticated: false
				});
			}
		});
	}

	render() {
		if (this.state.isAuthenticated === true){
			return <Redirect to={{
                pathname: '/home',
                state: { isAuthenticated: true }
            }} />
		} else if (this.state.isAuthenticated === false) {
			return <Redirect to={{
                pathname: '/login',
                state: { referrer: this.state.profile }
            }} />
		} else {
			return '';
		}
	}
}

export default App;
