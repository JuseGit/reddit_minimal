import { default as topicsReducer } from '../topicsSlice.js';


describe('store/topics/topicsSlice', () => {

	it('initial state should be empty object', () => {
		const expState = {
			topics: {}
		}

		expect(topicsReducer(undefined, {})).toEqual(expState);
	});

});
