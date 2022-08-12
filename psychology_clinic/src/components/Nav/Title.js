import styled from "styled-components";
import './Title.css'

const Title = styled.h1`
  //position: absolute;
  left: 0;
  margin: 0;
  padding: 0 1rem;
  font-size: 1.6rem;
  font-weight: 800;
  font-family: 'CONFORTA', sans-serif;
  text-shadow: none;

  @media only screen and (max-width: 470px) {
    font-size: 1rem;
  }
`

export default Title;