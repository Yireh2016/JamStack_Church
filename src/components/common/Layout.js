import * as React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { ThemeProvider } from 'styled-components'

import { mainTheme } from '../../themes/mainTheme'

import NavBar from './NavBar'

// Styles
import '../../styles/app.css'

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ children, bodyClass, isHome, nav }) => {
  const data = useStaticQuery(graphql`
    query GhostSettings {
      allGhostSettings {
        edges {
          node {
            ...GhostSettingsFields
          }
        }
      }
    }
  `)

  const site = data.allGhostSettings.edges[0].node

  console.log(`nav in Layout`, nav)

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Helmet>
          <html lang={site.lang} />
          <style type='text/css'>{`${site.codeinjection_styles}`}</style>
          <body className={bodyClass} />
        </Helmet>
        <NavBar id='NavBar' nav={nav} isHome={isHome}>
          {children}
        </NavBar>
      </ThemeProvider>
    </>
  )
}

DefaultLayout.propTypes = {
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  nav: PropTypes.object,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired
  })
}

export default DefaultLayout
