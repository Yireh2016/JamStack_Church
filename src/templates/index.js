import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'

import { mainTheme } from '../themes/mainTheme'

import { Layout as MainLayout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ location }) => (
  // return (
  //     <>
  //         <MetaData location={location} />
  //         <Layout isHome={true}>
  //             <div className="container">
  //                 <section className="post-feed">
  //                     {posts.map(({ node }) => (
  //                         // The tag below includes the markup for each post - components/common/PostCard.js
  //                         <PostCard key={node.id} post={node} />
  //                     ))}
  //                 </section>
  //                 <Pagination pageContext={pageContext} />
  //             </div>
  //         </Layout>
  //     </>
  // );
  <>
    <ThemeProvider theme={mainTheme}>
      <MetaData location={location} />
      <MainLayout id='MainLayout' />
    </ThemeProvider>
  </>
)

Index.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
