import styled from "styled-components"
import burgerMenuWhite from "../../res/burgerMenu/burgerMenuWhite.png"
import burgerMenuBlack from "../../res/burgerMenu/burgerMenuBlack.png"

const StyledImg = styled.img`
  width: 2rem;
  padding: 2rem;
  &:hover {
    opacity: 70%;
  }

  @media only screen and (max-width: 470px) {
    width: 1rem;
    padding: 1rem;
  }
`

const Hamburger = ({action, mobile, theme}) => {
    if (mobile) {
        return (
            <StyledImg src={theme.name === 'light' ? burgerMenuBlack : burgerMenuWhite}
                       alt="burger menu"
                       onClick={action}/>
        )
    }
}

export default Hamburger;