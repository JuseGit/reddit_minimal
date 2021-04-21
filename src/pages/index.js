import * as React from "react"
import { Link } from "gatsby"
//import { StaticImage } from "gatsby-plugin-image"
import * as styles from './index.module.css'

import Layout from "../components/layout"
import SEO from "../components/seo"
import SubredditsList from '../components/subredditsList'
import PostsList from '../components/postsList'


{/* <StaticImage
  src="../images/gatsby-astronaut.png"
  width={300}
  quality={95}
  formats={["AUTO", "WEBP", "AVIF"]}
  alt="A Gatsby astronaut"
  style={{ marginBottom: `1.45rem` }}
/> */}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className={styles.container}>
		<div className={styles.cellItem}>
			<nav className={styles.navWrapper}>
				Reddit Minimal
			</nav>
		</div>

		<div className={styles.cellItem}>
			<div className={styles.postsContainer}>
				<PostsList />
			</div>
		</div>

		<div className={styles.cellItem}>
			<div className={styles.subredditContainer}>
				<SubredditsList />
			</div>
		</div>
	</div>
  </Layout>
)

export default IndexPage
