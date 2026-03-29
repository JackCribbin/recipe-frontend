import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RecipeCard({ recipe, onRequestDelete }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="recipe-card" onClick={() => navigate(`/recipes/${recipe.id}`)}>
            <div className={`card-menu ${menuOpen ? 'card-menu--open' : ''}`}>
                <button className="card-menu-trigger" onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                }}>
                    ···
                </button>
                <div className="card-menu-dropdown">
                    <button className="card-menu-item" onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/recipes/${recipe.id}/edit`);
                    }}>
                        ✏️ Edit
                    </button>
                    <button className="card-menu-item card-menu-item--danger" onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        onRequestDelete(recipe.id);
                    }}>
                        🗑️ Delete
                    </button>
                </div>
            </div>

            {recipe.image ? (
                <>
                    <img
                        src={recipe.image.imageUrl}
                        alt={recipe.image.caption}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="recipe-card-no-image" style={{ display: 'none' }}>
                        No image
                    </div>
                </>
            ) : (
                <div className="recipe-card-no-image">No image</div>
            )}
            <div className="recipe-card-content">
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
            </div>
        </div>
    );
}

export default RecipeCard;