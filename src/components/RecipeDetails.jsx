function RecipeDetails({ recipe }) {
    if (recipe == null) {
        return <p>No recipe found</p>;
    }

    return (
        <div className="recipe-details">
            <div className="recipe-details-content">
                <h1>{recipe.name}</h1>
                <p>Description: {recipe.description}</p>
                <p>Servings: {recipe.servings}</p>
                {recipe.recipeIngredients.map(ingredient => (
                    <div key={ingredient.id} >
                        <p>Ingredient Name: {ingredient.ingredientName}</p>
                        <p>Ingredient Unit: {ingredient.ingredientUnit}</p>
                        <p>Ingredient Quantity: {ingredient.quantity}</p>
                        {ingredient.notes && <p>Notes: {ingredient.notes}</p>}
                    </div>
                ))}
                {recipe.steps.sort((a, b) => a.stepNumber - b.stepNumber).map(step => (
                    <div key={step.id} >
                        <p>Step: {step.stepNumber}</p>
                        <p>Instructions: {step.instructions}</p>
                        {step.notes && <p>Notes: {step.notes}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeDetails;