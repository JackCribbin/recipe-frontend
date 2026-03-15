import RecipeCard from './RecipeCard';

function RecipeList({ recipes }) {
    if (recipes.length === 0) {
        return <p>No recipes found. Add one to get started!</p>;
    }

    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default RecipeList;