// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { setupStore } from '../store/storeSetup'
import StoreWrapper from '../store/storeWrapper'
import { setupListeners } from '@reduxjs/toolkit/dist/query'


function render (
	ui,
	{
		preloadedState = {},
		store = setupStore(preloadedState),
		...renderOptions
	} = {}
) {
	setupListeners(store.dispatch)
	const initWrapper = ({children}) => <StoreWrapper store={store}>{children}</StoreWrapper>

	return {store, ...rtlRender(ui, { wrapper: initWrapper, ...renderOptions })}
}

// re-export everything
export * from '@testing-library/react'
export * from '@testing-library/jest-dom'
// override render method
export { render }
