import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore, combineReducers } from 'redux';
import { default as subredditsReducer } from './subreddits/subredditsSlice.js';
import { default as postsReducer } from './posts/postsSlice.js';
import { default as commentsReducer } from './comments/commentsSlice.js';

const rootReducer = combineReducers({
	subreddits: subredditsReducer,
	posts: postsReducer,
	comments: commentsReducer,
})

const createStore = (initialState) => reduxCreateStore(rootReducer, initialState);

const StoreWrapper = ({children, initialState}) => {
	return <Provider store={createStore(initialState)}> {children} </Provider>;
}

export default StoreWrapper;
