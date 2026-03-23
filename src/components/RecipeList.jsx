import RecipeCard from './RecipeCard';
import { useNavigate } from 'react-router-dom';

function RecipeList({ recipes }) {
    const navigate = useNavigate();

    if (recipes.length === 0) {
        return <p>No recipes found. Add one to get started!</p>;
    }

    return (
        <div className="recipe-list">
            <button className="new-recipe-button" onClick={() => navigate('/recipes/new')}>
                New Recipe
            </button>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default RecipeList;