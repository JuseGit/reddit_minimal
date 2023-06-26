import React, { useState } from "react";
import * as styles from "./subredditsList.module.css";
import Subreddit from "./subreddit";
import { useGetSubredditsQuery } from "../store/services/api";

type SubredditListProps = {
  selSubr: (val: string) => void;
};

/**
 * 	SubredditList - Component that renders the list of fetched subreddits.
 */
const SubredditsList = ({ selSubr }: SubredditListProps) => {
  const { data: subreddits, error, isLoading } = useGetSubredditsQuery();
  const [showList, setShowList] = useState(false);
  // The media query handles listContainer default display rule. On Mobile starts none, otherwise block.
  const listView = showList
    ? styles.listContainer + " " + styles.show
    : styles.listContainer;

  const handleClick = () => {
    // The media query handles if the section can be clicked.
    // This is for mobile only.
    setShowList(!showList);
  };

  if (error) return <div>Can't load subreddits</div>;
  if (isLoading) return <div>Loading List</div>;
  if (!subreddits) return <div>No subreddit available</div>;

  return (
    <section className={styles.sectionWrapper}>
      <button className={styles.listHeader} onClick={handleClick}>
        <p className={styles.listTitle}>Subreddits</p>
        <span className={styles.listArrow}>&#9660;</span>
      </button>
      <ul className={listView}>
        {" "}
        {subreddits.map((item) => (
          <li
            key={`subreddit__${item.data.id}`}
            style={{ marginBottom: 0 }}
            data-testid="subrContent"
            onClick={() => selSubr(item.data.display_name)}
          >
            <Subreddit
              name={item.data.display_name}
              icon_url={item.data.icon_img}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SubredditsList;
