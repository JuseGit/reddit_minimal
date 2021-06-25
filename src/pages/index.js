import * as React from "react";
import { Link } from "gatsby";
import * as styles from './index.module.css';
import * as shared from "../components/sharedStyles.module.css";

import Layout from "../components/layout";
import SEO from "../components/seo";
import SearchNav from "../components/searchNav.js";
import SubredditsList from '../components/subredditsList';
import PostsList from '../components/postsList';


const IndexPage = () => (
  <Layout
	header={<SearchNav />}
	main={<PostsList />}
	aside={<SubredditsList />}
  >
    <SEO title="Home" />
  </Layout>
)

export default IndexPage
