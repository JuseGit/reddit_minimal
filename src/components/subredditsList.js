import React, { useState } from "react"
import * as styles from "./subredditsList.module.css"
import Subreddit from "./subreddit.js"
import { useGetSubredditsQuery } from "../store/services/api"

/**
 * 	SubredditList - Component that renders the list of fetched subreddits.
 */
const SubredditsList = ({selSubr}) => {
  const { data: subreddits, error, isLoading } = useGetSubredditsQuery()
  const [showList, setShowList] = useState(false)
  // The media query handles listContainer default display rule. On Mobile starts none, otherwise block.
  const listView = showList
    ? styles.listContainer + " " + styles.show
    : styles.listContainer


  const handleClick = () => {
    // The media query handles if the section can be clicked.
    // This is for mobile only.
    setShowList(!showList)
  }

  const mapSubr = subreddits => {
    if( isLoading ) return "Loading List"

    if (subreddits.length === 0) {
      return "No subreddit available."
    }

    return subreddits.map(item => (
      <li key={item.data.name} style={{ marginBottom: 0 }} data-testid="subrContent" onClick={() => selSubr(item.data.display_name)}>
        <Subreddit name={item.data.display_name} icon_url={item.data.icon_img} />
      </li>
    ))
  }

  return (
    <section className={styles.sectionWrapper}>
      <button className={styles.listHeader} onClick={handleClick}>
        <p className={styles.listTitle}>Subreddits</p>
        <span className={styles.listArrow}>&#9660;</span>
      </button>
      <ul className={listView}>{mapSubr(subreddits)}</ul>
    </section>
  )
}

export default SubredditsList
