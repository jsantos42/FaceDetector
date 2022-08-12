import styled from "styled-components";
import A from '../components/A'
// import {personalData} from "../data";

//==============================================================================
// STYLING
//==============================================================================
const StyledFooter = styled.footer`
  width: 100%;
  margin: auto 0 0 0;
  background: #005684;
  color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  list-style: none;
  padding: 1rem 0;
  gap: 1rem;

  img {
    height: 1.5rem;
  }

  p {
    margin: 0;
  }
`

const Social = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  
  img:hover {
    opacity: 50%;
  }
`

//==============================================================================
// FOOTER COMPONENT
//==============================================================================
const Footer = () => {
    return (
        <StyledFooter>
        </StyledFooter>
    );
}

export default Footer;