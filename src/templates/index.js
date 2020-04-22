import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { mainTheme } from '../themes/mainTheme'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import HomeTemplate from './homeTemplate'

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ location, pageContext }) => (
  <>
    <ThemeProvider theme={mainTheme}>
      <MetaData location={location} />
      <Layout isHome={true} nav={pageContext.navigation} id='Layout'>
        <HomeTemplate title={pageContext.title}></HomeTemplate>
      </Layout>
    </ThemeProvider>
  </>
)

Index.propTypes = {
  location: PropTypes.object,
  pageContext: PropTypes.shape({
    title: PropTypes.string,
    navigation: PropTypes.object
  })
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
