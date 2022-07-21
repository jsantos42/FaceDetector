import './style.css'
import Logo from "../logo/Logo";

const Nav = ({onRouteChange, route}) => {
    return (
        <nav>
            <Logo/>
            {route === 'home'
                ? <h3 onClick={(e) => onRouteChange(e, 'signForm')}>Sign Out</h3>
                : null
            }
        </nav>
    )
}

export default Nav;