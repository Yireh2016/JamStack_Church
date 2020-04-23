import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import Iframe from 'react-iframe'
import PropTypes from 'prop-types'

import Call2Action from '../components/common/Call2Action'
import { Link } from 'gatsby'

import MultiTypeWriter from '../utils/multiTypeWriter/MultiTypeWriter'

const Home = ({ title }) => {
  const typewriterRef = React.useRef(null)

  React.useEffect(() => {
    const time = 200
    const textEl = typewriterRef.current

    const writer = new MultiTypeWriter({
      list: [`Caracas`, `Madrid`, `Pto La Cruz`, `Altagracia`],
      time,
      el: textEl,
      wait: 800
    })
    writer.play()

    return () => {
      writer.stop()
    }
  }, [])

  return (
    <>
      <BackGroundLayVideo id='BackGroundLayVideo'>
        <Iframe
          frameborder='0'
          scrolling='no'
          marginheight='0'
          marginwidth='0'
          allowfullscreen
          width='100%'
          height='100%'
          type='text/html'
          src='https://www.youtube.com/embed/RDMMtulshRDlQKM70_2DcsIncY?list=RD70_2DcsIncY&autoplay=1&mute=1&loop=1&controls=0&playsinline=0&showinfo=0'
        />
      </BackGroundLayVideo>
      <BackGroundLay id='BackGroundLay' />

      <Cruz id='Cruz'>
        <div id='horizontal' />
        <div id='vertical' />
      </Cruz>
      <Title id='Title'>
        <h1>
          {title}
          <TypeWriterText ref={typewriterRef} id='typewriter'></TypeWriterText>
        </h1>
        <Link to='/nosotros-historia'>
          <Call2Action>Conócenos</Call2Action>
        </Link>
      </Title>
    </>
  )
}

Home.propTypes = {
  title: PropTypes.string
}

export default Home

const BackGroundLayVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
`

const Title = styled.div`
  width: 880px;
  position: absolute;
  z-index: 100;
  top: 15%;
  left: 5%;
  font-family: Montserrat, sans-serif;
  font-style: normal;

  h1 {
    margin: 0;
    font-size: 100px !important;
    color: ${({ theme }) => theme.color.blanco};
  }
`

const pulse = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const TypeWriterText = styled.div`
  &::after {
    content: '|';
    font-weight: bold;
    color: ${({ theme }) => theme.color.dorado};
    animation-duration: 200ms;
    animation-iteration-count: infinite;
    animation-name: ${pulse};
    animation-direction: alternate;
  }
`

const BackGroundLay = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
  background: ${({ theme }) => theme.color.violetAlpha};
`

const Cruz = styled.div`
  box-sizing: border-box;
  position: absolute;
  right: -7%;
  top: calc(75px + 30%);
  width: 50%;
  height: 100%;

  #horizontal {
    box-sizing: border-box;
    position: absolute;
    top: 20%;
    width: 100%;
    height: 100px;
    background: transparent;
    border: 8px solid ${({ theme }) => theme.color.dorado};
  }
  #vertical {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 50%;
    height: calc(75px + 100%);
    width: 115px;
    transform: translateX(-50%);
    border: 8px solid ${({ theme }) => theme.color.dorado};
    background: transparent;
  }
`
