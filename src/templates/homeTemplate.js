import React from 'react'
import styled from 'styled-components'
import Iframe from 'react-iframe'
import PropTypes from 'prop-types'

import Call2Action from '../components/common/Call2Action'

const Home = ({ title }) => {
  const goToAbout = () => {
    window.location.href = `/nosotros`
  }

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
        <h1>{title}</h1>
        <Call2Action onClick={goToAbout}>Conócenos</Call2Action>
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
