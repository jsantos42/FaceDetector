import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Title from "../components/Nav/Title";
import Hamburger from "../components/Nav/Hamburguer";
import PagesArray from "../components/Nav/PagesArray";
import ThemeSwitcher from "../components/Nav/ThemeSwitcher";
import {pages, personalData} from "../data";
import styled from "styled-components";
import logo from '../res/logo.png'

//==============================================================================
// STYLING
//==============================================================================
const StyledNav = styled.nav`
  background: ${props => props.theme.background};
  position: sticky;
  top: 0;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
  font-size: 0.8rem;

  a {
    text-decoration: none;
  }
  ul {
    display: flex;
    align-items: center;
    background: ${props => props.theme.background};
  }

  li {
    padding: 0.4rem 1.5rem;
  }

  .desktop-nav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0.3rem 0.3rem 0.3rem 1rem;
    padding: 0;
    font-weight: 800;
    list-style: none;
  }

  .mobile-nav {
    position: absolute;
    top: 6rem;
    right: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    padding: 0;
    box-shadow: 0 0 10px black;
    font-weight: 800;
    list-style: none;

    & li {
      margin-top: 1rem;
    }
  }

  @media only screen and (max-width: 470px) {
    .mobile-nav {
      top: 3rem;
    }
  }

  .mobile-nav.closed {
    display: none;
  }

  #download {
    background: #005684;
    box-shadow: -2px 2px 3px black;
    border-radius: 5px;
    padding: 0.9rem;
    color: #ffffff;
  }

  .inactive {
    border: 2px solid rgba(0, 0, 0, 0);
  }

  .active {
    font-weight: 800;
    border-width: 2px;
    border-style: solid;
    border-image: linear-gradient(to right,
    rgba(0, 0, 0, 0) 10%,
    #3391ff 40%,
    #3391ff 60%,
    rgba(0, 0, 0, 0) 90%) 0 0 100% 0; /* this is the side allocation */
  }
`


//==============================================================================
// NAVBAR COMPONENT
//==============================================================================
const Nav = ({themeData, onSwitchTheme}) => {
    const [mobile, setMobile] = useState(true);
    const [open, setOpen] = useState(false);
    const mobileThreshold = 768;
    let navClass = mobile ? 'mobile-nav' : 'desktop-nav';
    navClass += open ? '' : ' closed'; // Here the space between classes is paramount!

    function toggleMobile() {
        if (window.innerWidth < mobileThreshold) {
            setMobile(true);
            setOpen(false);
        } else {
            setMobile(false);
            setOpen(true);
        }
    }

    function toggleOpen() {
        if (open)
            setOpen(false);
        else
            setOpen(true);
    }

    useEffect(() => {
        if (window.innerWidth > mobileThreshold) {
            setMobile(false);
            setOpen(true);
        }
        window.addEventListener("resize", toggleMobile);
    }, []);

    return (
        <StyledNav>
            <Title>
                <Link to={pages.home.path}>
                    <img src={logo}/>
                </Link>
            </Title>
            <ThemeSwitcher src={themeData.themeSwitcher} onClick={onSwitchTheme}/>
            <Hamburger action={toggleOpen} mobile={mobile} theme={themeData.theme}/>
            <ul onClick={toggleOpen} className={navClass}>
                <PagesArray/>
            </ul>
        </StyledNav>
    );
}

export default Nav;