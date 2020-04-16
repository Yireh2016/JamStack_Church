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
      }
    }
  `)
  console.log(`data data`, data)
  const { html, slug, feature_image } = data.ghostPage
  const mainTitle = html.match(/<h1 id="Main Title">.*<\/h1>/)
  console.log(`mainTitle`, mainTitle[0])
  const mainImage = feature_image

  const htmlToRender = html.replace(mainTitle[0], ``)
  console.log(`htmlToRender`, htmlToRender)

  return (
    <AboutLayout id='AboutLayout'>
      <img src={mainImage} alt={`${slug} main image`} />
      <section dangerouslySetInnerHTML={{ __html: htmlToRender }}></section>
    </AboutLayout>
  )
}

AboutTemplate.propTypes = {
  data: PropTypes.object
}

export default AboutTemplate

const AboutLayout = styled.div`
  margin: 100px auto 0 auto;
  width: calc(100% * 8 / 12);
  height: 100%;
  background: ${({ theme }) => theme.blanco};
`
