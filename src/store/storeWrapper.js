import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { default as subredditsReducer } from './subreddits/subredditsSlice.js';
import { default as postsReducer } from './posts/postsSlice.js';
import { default as commentsReducer } from './comments/commentsSlice.js';

const reducer = {
	subreddits: subredditsReducer,
	posts: postsReducer,
	comments: commentsReducer,
}

const createStore = (preloadedState) => configureStore({reducer, preloadedState});

const StoreWrapper = ({children, initialState}) => {
	return <Provider store={createStore(initialState)}> {children} </Provider>;
}

export default StoreWrapper;
