import React from 'react';
import { shallow } from 'enzyme';
import * as ReactReduxHooks from 'react-redux';

import SubredditsList from '../subredditsList.js';


describe('components/subredditsList', () => {

	let useSelectorSpy;

	beforeEach( () => {
		useSelectorSpy = jest.spyOn(ReactReduxHooks, 'useSelector');
	})

	it('renders a list of subreddits', () => {
		const items = [{name: 'subreddit1', img: undefined}, {name: 'subreddit2', img: undefined}];

		useSelectorSpy.mockReturnValue([{name: 'subreddit1', img: undefined}, {name: 'subreddit2', img: undefined}]);
    	const wrapper = shallow(<SubredditsList />);

	    // Check if an element in the Component exists
	    expect(wrapper.contains(items.map((item) => <li key={item.name} className="item">{item.name}</li>))).toBeTruthy();
	});
});
