import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location, pageContext }) => {
  const page = data.ghostPage
  const { html, slug, feature_image, title } = data.ghostPage

  return (
    <>
      <MetaData data={data} location={location} type='website' />
      <Helmet>
        <style type='text/css'>{`${page.codeinjection_styles}`}</style>
      </Helmet>
      <Layout isHome={false} nav={pageContext.navigation}>
        <PageLayout id='PageLayout'>
          <PageHeader id='PageHeader'>
            <img src={feature_image} alt={`${slug} main image`} />
            <TitleCont id='TitleCont'>
              <h1> {title}</h1>
            </TitleCont>
          </PageHeader>
          <section
            style={{ margin: `15px 0 0 0` }}
            dangerouslySetInnerHTML={{ __html: html }}
          ></section>
        </PageLayout>
      </Layout>
    </>
  )
}

Page.propTypes = {
  data: PropTypes.shape({
    ghostPage: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string
    }).isRequired
  }).isRequired,
  pageContext: PropTypes.object,
  location: PropTypes.object.isRequired
}

export default Page

const PageLayout = styled.div`
  margin: 10px auto 0 auto;
  width: calc(100% * 8 / 12);
  height: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.blanco};
`

const PageHeader = styled.header`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  img {
    width: 100%;
  }
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const TitleCont = styled.div`
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  background: ${({ theme }) => theme.color.violetAlpha};
  h1 {
    color: ${({ theme }) => theme.color.dorado};
  }
`

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`
