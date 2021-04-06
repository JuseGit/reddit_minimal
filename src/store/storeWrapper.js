import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore, combineReducers } from 'redux';
import { default as topicsReducer } from './topics/topicsSlice.js';

const rootReducer = combineReducers({
	topics: topicsReducer,
})

const createStore = () => reduxCreateStore(rootReducer);

export default ({ element }) => (
	<Provider store={createStore()}> {element} </Provider>
)
