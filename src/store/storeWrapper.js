import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'


const reducer = {
	[api.reducerPath]: api.reducer
}

const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)

const createStore = (preloadedState) => configureStore({reducer, middleware, preloadedState})

const StoreWrapper = ({children, initialState}) => {
	return <Provider store={createStore(initialState)}> {children} </Provider>
}

export default StoreWrapper
