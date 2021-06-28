import React, { useState, useEffect } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, fetchSubreddits, updateCurSubreddit } from '../store/subreddits/subredditsSlice.js';
import * as styles from './subredditsList.module.css';
import Subreddit from './subreddit.js';



/**
 * 	SubredditList - Component that renders the list of fetched subreddits.
 */
const SubredditsList = () => {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectSubreddits);
	const [showList, setShowList] = useState(false);
	// The media query handles listContainer default display rule. On Mobile starts none, otherwise block.
	const listView = showList ? styles.listContainer + " " + styles.show : styles.listContainer;


	useEffect( () => {
		dispatch(fetchSubreddits());
	}, [dispatch]);

	const handleClick = () => {
		// The media query handles if the section can be clicked.
		// This is for mobile only.
		console.log("we")
		setShowList(!showList);
	}

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
		<section className={styles.sectionWrapper} onClick={handleClick}>
			<div className={styles.listHeader}>
				<p className={styles.listTitle}>Subreddits</p>
				<span className={styles.listArrow}>&#9660;</span>
			</div>
			<ul className={listView}>
				{mapSubr(subreddits)}
			</ul>
		</section>
	);
}

export default SubredditsList;
