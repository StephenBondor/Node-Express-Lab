import React, {Component} from 'react';
import './App.css';
import {getPosts} from './actions';
import {connect} from 'react-redux';

class App extends Component {
	constructor() {
		super();
		this.state = {
			OKToRender: false
		};
	}

	//Fetch the State from libsyn
	componentDidMount() {
		this.props.getPosts();
	}

	//Only allow content to render once podast is fully fetched
	componentDidUpdate(prevProps) {
		if (this.props.fetchingPodcast !== prevProps.fetchingPodcast) {
			if (!this.props.fetchingPodcast) {
				this.setState({
					OKToRender: true
				});
			}
		}
	}

	render() {
		return <div className='App'>Hello</div>;
	}
}

export default connect(
	({fetchingPosts}) => ({fetchingPosts}),
	{getPosts}
)(App);
