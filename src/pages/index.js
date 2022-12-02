import React, { useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SearchNav from "../components/searchNav.js"
import SubredditsList from "../components/subredditsList"
import PostsList from "../components/postsList"

const IndexPage = () => {
  const [selSubr, setSelSubr] = useState("Home")
  const [text, setText] = useState("")


  return (
    <Layout
      header={<SearchNav initialInput={text} updateSeachText={setText} />}
      main={<PostsList subreddit={selSubr} filterText={text} />}
      aside={<SubredditsList selSubr={setSelSubr} />}
    >
      <Seo title="Home" />
    </Layout>
  )
}

export default IndexPage
