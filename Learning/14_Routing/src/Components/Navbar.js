import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/" className="nav-link">Ho00me</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
                <li><Link to="/about" className="nav-link">About</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;
