import IngredientCard from './IngredientCard';

function IngredientList({ ingredients, onRequestDelete, onRequestEdit }) {
    if (ingredients.length === 0) {
        return <p>No ingredients found. Add one to get started!</p>;
    }

    return (
        <div className="ingredient-list">
            {ingredients.map(ingredient => (
                <IngredientCard key={ingredient.id} ingredient={ingredient} onRequestDelete={onRequestDelete} onRequestEdit={onRequestEdit} />
            ))}
        </div>
    );
}

export default IngredientList;