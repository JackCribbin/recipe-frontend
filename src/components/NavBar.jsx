import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <NavLink to="/" className="navbar-title">
                    🍴 My Recipes
                </NavLink>
                <div className="navbar-links">
                    <NavLink to="/" end className="navbar-link">
                        Recipes
                    </NavLink>
                    <NavLink to="/ingredients" className="navbar-link">
                        Ingredients
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;