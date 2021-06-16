import React, { useEffect } from 'react';
import { StaticImage } from 'gatsby-plugin-image'
import { useSelector, useDispatch } from 'react-redux'
import { selectSubreddits, fetchSubreddits, updateCurSubreddit } from '../store/subreddits/subredditsSlice.js';
import * as styles from './subredditsList.module.css'


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

		return subreddits.map((item) => <li key={item.name} className={styles.topicItem} onClick={() => dispatch(updateCurSubreddit(item.subreddit))} data-testid="subrContent">
												<StaticImage
												  src="../images/gatsby-astronaut.png"
												  width={30}
												  quality={95}
												  formats={["AUTO", "WEBP", "AVIF"]}
												  alt="A Gatsby astronaut"
												  style={{ borderRadius: "20px", border:"2px solid green", marginRight: "10px" }}
												/>
												<p style={{alignSelf:"center"}}>{item.subreddit}</p>
											</li>)
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
