import {
	FETCH_POSTS_START,
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_FAILURE
} from '../actions';

//Initial State
const initialState = {
	fetchingPosts: false,
	error: null,
	posts: []
};

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POSTS_START:
			return {
				...state,
				fetchingPosts: true
			};
		case FETCH_POSTS_SUCCESS:
			return {
				...state,
				error: null,
				episodes: action.payload
			};
		case FETCH_POSTS_FAILURE:
			return {
				...state,
				error: action.payload,
				fetchingPosts: false
			};
		default:
			return state;
	}
};

export default postsReducer;
