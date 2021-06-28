/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import "./layout.css";
import * as styles from "./layout_custom.module.css"



/**
 * Layout - Component that arranges a page elements.
 *
 * @param  children	SEO component.
 * @param  header	Component/DOM element to be rendered in the header section.
 * @param  main     Component/DOM element to be rendered in the main section.
 * @param  aside 	Component/DOM element to be rendered in the aside section.
 * @return 			The newly arranged page.
 */
const Layout = ({ children, header, main, aside }) => {
	return (
		<>
		{children}
		<div className={styles.container}>
			<header className={styles.cellItem}>
				{header}
			</header>

			<main className={styles.cellItem}>
				{main}
			</main>

			<aside className={styles.cellItem}>
				{aside}
			</aside>
		</div>
		</>
	)
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
