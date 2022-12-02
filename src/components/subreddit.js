import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import * as styles from './subreddit.module.css'


const Subreddit = ( { name, icon_url } ) => {
	// NOTE: For Jest styles is undefined, the module should be called like import styles from ...
	// NOTE: but that way gatsby gives a warning.
	//const wrapperClass = selected ? styles.topic_item.concat(' ', styles.selected) : styles.topic_item;
	//const wrapperClass = selected ? styles.topic_item + " " + styles.selected : styles.topic_item;

	return (
		<button className={styles.button_wrapper}>
			<div className={styles.iconWrapper}>
				{icon_url && <LazyLoadImage alt="subreddit image alt" src={icon_url} object-fit="cover" width="30px" style={{borderRadius:"20px"}}/>}
			</div>
			<p className={styles.topicTitle}>{name}</p>
		</button>
	)
}

export default Subreddit;
