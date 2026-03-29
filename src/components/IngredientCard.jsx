import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function IngredientCard({ ingredient, onRequestDelete }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="ingredient-card">
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
                        navigate(`/ingredients/${ingredient.id}/edit`);
                    }}>
                        ✏️ Edit
                    </button>
                    <button className="card-menu-item card-menu-item--danger" onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        onRequestDelete(ingredient.id);
                    }}>
                        🗑️ Delete
                    </button>
                </div>
            </div>

            <div className="ingredient-card-content">
                <h2 className="ingredient-name">{ingredient.name}</h2>
                <div className="ingredient-meta">
                    <span className="ingredient-meta-item">
                        <span className="ingredient-meta-label">Unit</span>
                        {ingredient.unit}
                    </span>
                    <span className="ingredient-meta-item">
                        <span className="ingredient-meta-label">Price per unit</span>
                        €{ingredient.pricePerUnit}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default IngredientCard;