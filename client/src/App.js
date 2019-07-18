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

	//Fetch the State from server
	componentDidMount() {
		this.props.getPosts();
	}

	//Only allow content to render once posts are fully fetched
	componentDidUpdate(prevProps) {
		if (this.props.fetchingPosts !== prevProps.fetchingPosts) {
			if (!this.props.fetchingPosts) {
				this.setState({
					OKToRender: true
				});
			}
		}
	}

	render() {
		if (!this.state.OKToRender) {
			return <div> loading... </div>;
		}
		return (
			<>
				<div className='App'>Hello check it</div>
        {this.props.posts.map(post => (
					<div key={post.id} className='App'>
            {post.title} -- {post.contents}
          </div>
				))}
			</>
		);
	}
}

export default connect(
	({fetchingPosts, posts}) => ({fetchingPosts, posts}),
	{getPosts}
)(App);
