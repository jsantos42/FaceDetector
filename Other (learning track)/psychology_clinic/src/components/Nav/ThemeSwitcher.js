import styled from "styled-components";

const StyledImg = styled.img`
  width: 1.5rem;

  &:hover {
    opacity: 70%;
  }

  @media only screen and (max-width: 470px) {
    width: 1rem;
  }
`

const ThemeSwitcher = ({src, onClick}) => {
    return (
        <StyledImg src={src} alt="theme switcher" onClick={onClick}/>
    )
}

export default ThemeSwitcher;