import './style.css'
import Logo from "../logo/Logo";

const Nav = ({onRouteChange, route}) => {
	const onSignOut = (event) => {
		event.preventDefault();
		onRouteChange('signForm');
	}
	
    return (
        <nav>
            <Logo/>
            {route === 'home'
                ? <h3 onClick={onSignOut}>Sign Out</h3>
                : null
            }
        </nav>
    )
}

export default Nav;