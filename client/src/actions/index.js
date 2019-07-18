import axios from 'axios';

//Fetch Posts
export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

//Fetch a Post



const URL = 'http://localhost:5000';

export const getPosts = () => dispatch => {
	dispatch({type: FETCH_POSTS_START});
	axios
		.get(`${URL}/api/posts`)
		.then(response => {
            console.log('Fetch Posts Success', response);
			dispatch({type: FETCH_POSTS_SUCCESS, payload: response.data});
		})
		.catch(err => {
			console.log('Fetch posts failed', err);
			dispatch({type: FETCH_POSTS_FAILURE, payload: err});
		});
};


