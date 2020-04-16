import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, graphql, useStaticQuery } from 'gatsby'

// import { crown } from "../svgIcons/svgIcons";

const NavBar = ({ children }) => {
  const [isNavColor, setIsNavColor] = useState(false)
  const [overflow, setOverflow] = useState(`hidden`)

  const data = useStaticQuery(graphql`
    query ghostSettings {
      ghostSettings {
        logo
      }
    }
  `)
  console.log(`data`, data)
  const logo = data.ghostSettings.logo
  let location = window.location
  useEffect(() => {
    if (location.pathname.match(/nosotros/)) {
      setIsNavColor(true)
      setOverflow(`scroll`)
      return
    }
    setIsNavColor(false)
    setOverflow(`hidden`)
  }, [location])

  return (
    <NavbarLayout overflow={overflow} id='NavbarLayout'>
      <NavBackground id='NavBackground' isNavColor={isNavColor}>
        <Crown id='Crown'>
          <img src={logo} alt='page logo' />
        </Crown>
        <Nav id='Nav'>
          <ul>
            <li>
              <Link to='/home'>Iglesia</Link>
            </li>
            <li>
              <Link to='/nosotros'>Nosotros</Link>
            </li>
            <li>Servicios</li>
            <li>Ministerios</li>
            <li>Contactanos</li>
          </ul>
        </Nav>
      </NavBackground>

      {children}
    </NavbarLayout>
  )
}
export default NavBar

const NavbarLayout = styled.div`
  position: relative;
  display: block;
  margin: auto;
  height: 100vh;
  width: 100vw;
  max-height: 1000px;
  max-width: 1500px;
  overflow: ${({ overflow }) => overflow};
`

const NavBackground = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background: ${({ theme, isNavColor }) => {
    const background = isNavColor ? theme.color.violet : `transparent`
    return background
  }};
`

const Nav = styled.nav`
  padding: 10px 0;
  width: 600px;
  background: transparent;
  ul {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    li {
      list-style-type: none;

      font-family: ${({ theme }) => theme.font};
      color: ${({ theme }) => theme.color.dorado};

      a {
        color: ${({ theme }) => theme.color.dorado} !important;
        text-decoration: none;
        text-decoration-color: ${({ theme }) => theme.color.dorado} !important;
      }
    }
  }
`

const Crown = styled.div`
  font-family: ${({ theme }) => theme.font};
  color: ${({ theme }) => theme.color.dorado};

  margin: 0px 0 0 30px;
  width: 100px;
`
