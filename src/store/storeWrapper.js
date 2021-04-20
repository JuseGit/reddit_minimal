import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore, combineReducers } from 'redux';
import { default as subredditsReducer } from './subreddits/subredditsSlice.js';
import { default as postsReducer } from './posts/postsSlice.js';

const rootReducer = combineReducers({
	subreddits: subredditsReducer,
	posts: postsReducer,
})

const createStore = () => reduxCreateStore(rootReducer);

const StoreWrapper = ({children}) => (
	<Provider store={createStore()}> {children} </Provider>
)
// export default ({ element }) => (
// 	<Provider store={createStore()}> {element} </Provider>
// )

export default StoreWrapper;
