import React from 'react';
import { shallow } from 'enzyme';
import * as ReactReduxHooks from 'react-redux';

import PostsList from '../postsList.js';


describe('components/postsList', () => {

	let useSelectorSpy;

	beforeEach( () => {
		useSelectorSpy = jest.spyOn(ReactReduxHooks, 'useSelector');
	})

	it('renders a list of posts for a subreddit', () => {
		const items = [{user: 'User1', name: 'Post1', img: undefined}, {user: 'User2', name: 'Post1', img: undefined}];

		useSelectorSpy.mockReturnValue([{user: 'User1', name: 'Post1', img: undefined}, {user: 'User2', name: 'Post1', img: undefined}]);
    	const wrapper = shallow(<PostsList />);

	    // Check if an element in the Component exists
	    expect(wrapper.contains(items.map((item) => <li key={item.name} className="item">{item.name}</li>))).toBeTruthy();
	});
});
