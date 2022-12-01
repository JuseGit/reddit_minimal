import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SearchNav from "../components/searchNav.js"
import SubredditsList from "../components/subredditsList"
import PostsList from "../components/postsList"

const IndexPage = () => (
  <Layout
    header={<SearchNav />}
    main={<PostsList />}
    aside={<SubredditsList />}
  >
    <Seo title="Home" />
  </Layout>
)

export default IndexPage
