import React from 'react';
import { NavLink , Link} from 'react-router-dom';

const Nav = () => {
    return(
        <div className="nav-wrapper">
            <nav className="nav">
                <div className="logo">
                    <Link to="/"><i className="rss icon"></i><span>ViMovie</span></Link>
                </div>              
                <div className="menu">
                    <NavLink to="/" exact activeClassName="navActive">Hem</NavLink>
                    <NavLink to="/movie" exact activeClassName="navActive">Movie</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Nav;