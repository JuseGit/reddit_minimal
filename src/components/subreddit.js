import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurSubreddit, selectCurrentSubreddit } from '../store/subreddits/subredditsSlice.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as styles from './subreddit.module.css';


const Subreddit = ( { name, icon_url } ) => {
	const [selected, setSelected] = useState(false);
	const dispatch = useDispatch();
	const curSubreddit = useSelector(selectCurrentSubreddit);
	const wrapperClass = selected ? styles.topicItem.concat(' ', styles.selected) : styles.topicItem;


	useEffect( () => {
		if( curSubreddit !== name ) {
			setSelected(false);
		} else {
			setSelected(true);
		}
	}, [curSubreddit])

	const handleOnClick = (subrName) => {
		dispatch(updateCurSubreddit(subrName));
	}

	return (
		<>
		<div className={wrapperClass} onClick={() => handleOnClick(name)}>
			<button className={styles.button_wrapper}>
				<div className={styles.iconWrapper}>
					{icon_url && <LazyLoadImage alt="subreddit image alt" src={icon_url} object-fit="cover" width="30px" style={{borderRadius:"20px"}}/>}
				</div>
				<p className={styles.topicTitle}>{name}</p>
			</button>
		</div>
		</>
	)
}

export default Subreddit;
