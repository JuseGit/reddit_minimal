import React from 'react'
import { Provider } from 'react-redux'


const StoreWrapper = ({children, store}) => {
	return <Provider store={store}> {children} </Provider>
}

export default StoreWrapper
