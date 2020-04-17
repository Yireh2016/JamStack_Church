import * as React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const AboutTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      ghostPage(slug: { eq: "nosotros" }) {
        html
        feature_image
        slug
        title
      }
    }
  `)
  console.log(`data data`, data)
  const { html, slug, feature_image, title } = data.ghostPage
  const mainImage = feature_image

  return (
    <AboutLayout id='AboutLayout'>
      <AboutHeader id='AboutHeader'>
        <img src={mainImage} alt={`${slug} main image`} />
        <TitleCont>
          <h1> {title}</h1>
        </TitleCont>
      </AboutHeader>
      <section dangerouslySetInnerHTML={{ __html: html }}></section>
    </AboutLayout>
  )
}

AboutTemplate.propTypes = {
  data: PropTypes.object
}

export default AboutTemplate

const AboutLayout = styled.div`
  margin: 10px auto 0 auto;
  width: calc(100% * 8 / 12);
  height: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.blanco};
`

const AboutHeader = styled.header`
  position: relative;
  width: 100%;
  height: 400px;
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
  background: ${({ theme }) => theme.color.negroAlpha};
  h1 {
    color: ${({ theme }) => theme.color.dorado};
  }
`
