import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Link, graphql, useStaticQuery } from 'gatsby'
import gsap from 'gsap'
import PropTypes from 'prop-types'

const NavBar = ({ children, isHome, nav }) => {
  //data
  const [isNavColor, setIsNavColor] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [overflow, setOverflow] = useState(`hidden`)
  //refs
  const crownRef = useRef(null)
  const navbarLayoutRef = useRef(null)
  //queries
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
  //methods
  const setScrollControl = () => {
    navbarLayoutRef.current.addEventListener(`scroll`, e => {
      if (e.target.scrollTop <= 10) {
        setIsScrolled(false)
        return
      }
      setIsScrolled(true)
    })
  }

  const playAnim = (t1, name) => {
    t1[name].play()
  }

  const reverseAnim = (t1, name) => {
    t1[name].reverse()
  }
  const setNavAnimation = (subMenuObj, menuObj) => {
    const timelines = {}
    for (let menu in subMenuObj) {
      const submenu = subMenuObj[menu]
      if (submenu.current) {
        timelines[menu] = gsap.timeline({ paused: true })

        timelines[menu]
          .to(submenu.current, {
            duration: 0,
            display: `flex`
          })
          .to(submenu.current, {
            duration: 0.2,
            ease: `ease`,
            y: 50,
            opacity: 1
          })
          .from(`.${menu}_sublink`, {
            opacity: 0,
            x: 100,
            duration: 0.15,
            ease: `ease`,
            stagger: 0.15 / 2
          })
      }
    }

    for (let menuName in menuObj) {
      const menu = menuObj[menuName]
      menu.current &&
        menu.current.addEventListener(`mouseenter`, e => {
          e.stopPropagation()
          playAnim(timelines, menuName)
        })

      menu.current &&
        menu.current.addEventListener(`mouseleave`, e => {
          e.stopPropagation()
          reverseAnim(timelines, menuName)
        })
    }
  }
  //hooks
  useEffect(() => {
    setScrollControl()
    setNavAnimation(submenuRef, menuRef)
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

  //template
  const navigationArr = []
  const submenuRef = {}
  const menuRef = {}
  for (let navName in nav) {
    submenuRef[navName] = useRef(null)
    menuRef[navName] = useRef(null)
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
          className={`${navName}_sublink`}
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
          ref={menuRef[navName]}
        >
          {label}
          <SubMenuCont
            ref={submenuRef[navName]}
            isScrolled={isScrolled}
            id={`${navName}_SubMenuCont`}
          >
            {submenu}
          </SubMenuCont>
        </div>
      )
    }
  }
  return (
    <NavbarLayout ref={navbarLayoutRef} overflow={overflow} id='NavbarLayout'>
      <NavBackground id='NavBackground' isNavColor={isNavColor}>
        <Link to='/'>
          <Crown isScrolled={isScrolled} ref={crownRef} id='Crown'>
            <img src={logo} alt='page logo' />
          </Crown>
        </Link>
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
//styles
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
  padding: 10px;
  margin: 0px 0 0 30px;
  transition: all 200ms ease;
  width: ${({ isScrolled }) => (isScrolled ? `60px` : `100px`)};
`
const SubMenuCont = styled.div`
  display: none;
  position: absolute;
  max-width: 200px;
  top: ${({ isScrolled }) => (isScrolled ? `-18px` : `3px`)};
  left: 50%;
  transform: translate(-50%);
  opacity: 0;
  flex-direction: column;
  background: ${({ theme }) => theme.color.violet};
`

const StyledLink = styled(Link)`
  ${({ theme }) => theme.link};
  padding: 15px;

  &:hover {
    ${({ theme }) => theme.linksHovered};
  }
`
