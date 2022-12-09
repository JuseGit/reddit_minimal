/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, lang, meta, title }) => {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
			}
		`
	)

	const metaDescription = description || site.siteMetadata.description
	const defaultTitle = site.siteMetadata?.title

	return (
		<>
			<title>{`${title} | ${defaultTitle}`}</title>
			<meta name="description" content={metaDescription}></meta>
		</>
	)
}

Seo.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
}

Seo.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
}

export default Seo
