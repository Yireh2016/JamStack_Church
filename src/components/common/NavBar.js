import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Link, graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

const NavBar = ({ children, isHome, nav }) => {
  const [isNavColor, setIsNavColor] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const [overflow, setOverflow] = useState(`hidden`)

  const crownRef = useRef(null)
  const navbarLayoutRef = useRef(null)

  const data = useStaticQuery(graphql`
    query ghostSettings {
      ghostSettings {
        logo
        navigation {
          label
          url
        }
      }
    }
  `)
  const logo = data.ghostSettings.logo

  const scrollControl = () => {
    navbarLayoutRef.current.addEventListener(`scroll`, e => {
      if (e.target.scrollTop <= 10) {
        setIsScrolled(false)
        return
      }
      setIsScrolled(true)
    })
  }

  useEffect(() => {
    scrollControl()
  }, [])

  useEffect(() => {
    if (!isHome) {
      setIsNavColor(true)
      setOverflow(`scroll`)
      return
    }
    setIsNavColor(false)
    setOverflow(`hidden`)
  }, [isHome])

  useEffect(() => {}, [])

  const navigationArr = []

  for (let navName in nav) {
    const navItem = nav[navName]
    const { label, url, sub } = navItem
    if (sub.length === 0) {
      navigationArr.push(
        <Link className='menuOptions' key={label} to={url}>
          {label}
        </Link>
      )
    } else {
      const submenu = sub.map(menu => (
        <StyledLink
          key={menu.label}
          to={`/${menu.url.match(/^\/(.*)\/$/)[1].replace(/\//g, `-`)}/`}
        >
          {menu.label}
        </StyledLink>
      ))
      navigationArr.push(
        <div
          id={`${navName}_MenuOptions`}
          className='menuOptions'
          key={navName}
        >
          {label}
          <SubMenuCont isScrolled={isScrolled} id={`${navName}_SubMenuCont`}>
            {submenu}
          </SubMenuCont>
        </div>
      )
    }
  }

  return (
    <NavbarLayout ref={navbarLayoutRef} overflow={overflow} id='NavbarLayout'>
      <NavBackground id='NavBackground' isNavColor={isNavColor}>
        <Crown isScrolled={isScrolled} ref={crownRef} id='Crown'>
          <img src={logo} alt='page logo' />
        </Crown>
        <Nav isScrolled={isScrolled} id='Nav'>
          <div className='navLayout'>{navigationArr}</div>
        </Nav>
      </NavBackground>

      {children}
    </NavbarLayout>
  )
}

NavBar.defaultProps = {
  isHome: false
}

NavBar.propTypes = {
  isHome: PropTypes.bool,
  nav: PropTypes.object
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
  position: sticky;
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
  width: 600px;
  background: transparent;
  .navLayout {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .menuOptions {
    position: relative;
    font-family: ${({ theme }) => theme.font};
    ::after {
      content: '';
      width: 0px;
      opacity: 0;
      position: absolute;
      bottom: ${({ isScrolled }) => (isScrolled ? `1px` : `4px`)};
      left: 0%;
      transform: translateX(-50%);
      border: 2px solid ${({ theme }) => theme.color.dorado};
      transition: all 200ms ease;
    }
    ${({ theme }) => theme.link};
    padding: ${({ isScrolled }) => (isScrolled ? `5px` : `15px`)};

    :hover {
      text-decoration: none;
      cursor: pointer;
      ::after {
        opacity: 1;
        left: 50%;
        width: 114px;
        border: 2px solid ${({ theme }) => theme.color.dorado};
      }
    }
  }
`

const Crown = styled.div`
  margin: 0px 0 0 30px;
  transition: all 200ms ease;
  width: ${({ isScrolled }) => (isScrolled ? `60px` : `100px`)};
`
const SubMenuCont = styled.div`
  display: none;
  position: absolute;
  max-width: 200px;
  top: ${({ isScrolled }) => (isScrolled ? `32px` : `53px`)};
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;

  background: ${({ theme }) => theme.color.violet};
  .menuOptions:hover & {
    display: flex;
  }
`

const StyledLink = styled(Link)`
  ${({ theme }) => theme.link};
  padding: 15px;

  &:hover {
    ${({ theme }) => theme.linksHovered};
  }
`
