import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurSubreddit, selectCurrentSubreddit } from '../store/subreddits/subredditsSlice.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as styles from './subreddit.module.css';


const Subreddit = ( { name, icon_url } ) => {
	const [selected, setSelected] = useState(false);
	const dispatch = useDispatch();
	const curSubreddit = useSelector(selectCurrentSubreddit);

	// NOTE: For Jest styles is undefined, the module should be called like import styles from ...
	// NOTE: but that way gatsby gives a warning.
	//const wrapperClass = selected ? styles.topic_item.concat(' ', styles.selected) : styles.topic_item;
	const wrapperClass = selected ? styles.topic_item + " " + styles.selected : styles.topic_item;


	useEffect( () => {
		if( curSubreddit !== name ) {
			setSelected(false);
		} else {
			setSelected(true);
		}
	}, [name, curSubreddit])

	const handleOnClick = (subrName) => {
		dispatch(updateCurSubreddit(subrName));
	}

	return (
		<div className={wrapperClass}>
			<button className={styles.button_wrapper} onClick={() => handleOnClick(name)} onKeyDown={() => handleOnClick(name)}>
				<div className={styles.iconWrapper}>
					{icon_url && <LazyLoadImage alt="subreddit image alt" src={icon_url} object-fit="cover" width="30px" style={{borderRadius:"20px"}}/>}
				</div>
				<p className={styles.topicTitle}>{name}</p>
			</button>
		</div>
	)
}

export default Subreddit;
