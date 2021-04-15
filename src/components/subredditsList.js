import React from 'react';
import { useSelector } from 'react-redux'
import { selectSubreddits } from '../store/subreddits/subredditsSlice.js';


const SubredditsList = () => {
	const subreddits = useSelector(selectSubreddits);

	return (
		<section>
			<ul>
				{subreddits.map((subreddit) => <li key={subreddit.name} className='item'>{subreddit.name}</li>)}
			</ul>
		</section>
	);
}

export default SubredditsList;
