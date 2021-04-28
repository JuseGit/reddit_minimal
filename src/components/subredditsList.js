import React from 'react';
import { StaticImage } from 'gatsby-plugin-image'
import { useSelector } from 'react-redux'
import { selectSubreddits } from '../store/subreddits/subredditsSlice.js';
import * as styles from './subredditsList.module.css'


const SubredditsList = () => {
	const subreddits = useSelector(selectSubreddits);

	return (
		<section>
			<h2 className={styles.listTitle}>Subreddits</h2>
			<ul className={styles.listContainer}>
				{subreddits.map((subreddit) => <li key={subreddit.name} className={styles.topicItem} data-testid="subrContent">
					<StaticImage
					  src="../images/gatsby-astronaut.png"
					  width={30}
					  quality={95}
					  formats={["AUTO", "WEBP", "AVIF"]}
					  alt="A Gatsby astronaut"
					  style={{ borderRadius: "20px", border:"2px solid green", marginRight: "10px" }}
					/>
					<p style={{alignSelf:"center"}}>{subreddit.name}</p>
				</li>)}
			</ul>
		</section>
	);
}

export default SubredditsList;
