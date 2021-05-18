// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import StoreWrapper from './store/storeWrapper.js';


function render (
	ui,
	{
		initialState,
		...renderOptions
	} = {}
) {
	const initWrapper = ({children}) => <StoreWrapper initialState={initialState}>{children}</StoreWrapper>

	return rtlRender ( ui, { wrapper: initWrapper, ...renderOptions } );
}

// re-export everything
export * from '@testing-library/react';
export * from '@testing-library/jest-dom';
// override render method
export { render };
