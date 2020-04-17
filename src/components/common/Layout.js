import * as React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { ThemeProvider } from 'styled-components'

import { mainTheme } from '../../themes/mainTheme'

import HomeTemplate from '../../templates/homeTemplate'
import AboutTemplate from '../../templates/aboutTemplate'

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
const DefaultLayout = ({ bodyClass }) => {
  const data = useStaticQuery(graphql`
    query GhostSettings {
      allGhostSettings {
        edges {
          node {
            ...GhostSettingsFields
          }
        }
      }
      file(relativePath: { eq: "ghost-icon.png" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const site = data.allGhostSettings.edges[0].node

  let templateToRender
  let location = window ? window.location.pathname : `/`
  switch (location) {
    case `/nosotros`: {
      templateToRender = <AboutTemplate id='AboutTemplate' />
      break
    }

    default: {
      templateToRender = <HomeTemplate id='HomeTemplate' title={site.title} />
      break
    }
  }

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Helmet>
          <html lang={site.lang} />
          <style type='text/css'>{`${site.codeinjection_styles}`}</style>
          <body className={bodyClass} />
        </Helmet>
        <NavBar id='NavBar'>{templateToRender}</NavBar>
      </ThemeProvider>
    </>
  )
}

DefaultLayout.propTypes = {
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired
  })
}

export default DefaultLayout
