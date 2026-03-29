import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    return (
        <div className="navbar-content">
            <div className="navbar-title" onClick={() => navigate('/')}>
                Test Text
            </div>
            <div className="navbar-buttons">
                <div onClick={() => navigate('/')}>
                    Recipes
                </div>
                <div onClick={() => navigate('/ingredients')}>
                    Ingredients
                </div>
            </div>
        </div>
    );
}

export default NavBar;