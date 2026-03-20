import { useNavigate } from 'react-router-dom';

function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    return (
        <div className="recipe-card" onClick={() => navigate(`/recipes/${recipe.id}`)}>
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