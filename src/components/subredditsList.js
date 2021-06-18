import React, { useEffect } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, fetchSubreddits, updateCurSubreddit } from '../store/subreddits/subredditsSlice.js';
import * as styles from './subredditsList.module.css';
import Subreddit from './subreddit.js';


const SubredditsList = () => {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectSubreddits);


	useEffect( () => {
		dispatch(fetchSubreddits());
	}, [dispatch]);


	const mapSubr = (subreddits) => {
		if( subreddits.length === 0 ) {
			return 'No subreddit available.';
		}

		return subreddits.map (
			(item) =>	<li key={item.name} style={{marginBottom:0}} data-testid="subrContent">
							<Subreddit name={item.display_name} icon_url={item.icon_img}/>
						</li>
		)
	}

	return (
		<section className={styles.sectionWrapper}>
			<p className={styles.listTitle}>Subreddits</p>
			<ul className={styles.listContainer}>
				{mapSubr(subreddits)}
			</ul>
		</section>
	);
}

export default SubredditsList;
