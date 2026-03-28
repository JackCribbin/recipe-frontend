import { useNavigate } from 'react-router-dom';

function RecipeDetails({ recipe }) {
    const navigate = useNavigate();

    if (recipe == null) {
        return <p>No recipe found</p>;
    }
    
    return (
        <div className="recipe-details">
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back to recipes
            </button>

            <div className="recipe-header">
                <h1>{recipe.name}</h1>
                {recipe.description && <p className="recipe-description">{recipe.description}</p>}
                <span className="recipe-servings">Serves {recipe.servings}</span>
            </div>

            <div className="recipe-primary-image">
                {recipe.images.filter(image => image.isPrimary).map(image => (
                    <img 
                        src={image.imageUrl}
                        alt={image.caption}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ))}
            </div>

            <div className="recipe-body">
                <section className="recipe-section">
                    <h2>Ingredients</h2>
                    <ul className="recipe-ingredient-list">
                        {recipe.recipeIngredients.map(ingredient => (
                            <li key={ingredient.id} className="recipe-ingredient-entry">
                                <span className="ingredient-quantity">
                                    {ingredient.quantity} {ingredient.ingredientUnit}
                                </span>
                                <div className="ingredient-content">
                                    <span className="ingredient-name">{ingredient.ingredientName}</span>
                                    {ingredient.notes && (
                                        <span className="ingredient-notes">{ingredient.notes}</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="recipe-section">
                    <h2>Method</h2>
                    <ol className="recipe-step-list">
                        {[...recipe.steps]
                            .sort((a, b) => a.stepNumber - b.stepNumber)
                            .map(step => (
                                <li key={step.id} className="recipe-step-entry">
                                    <div className="step-content">
                                        <p className="step-instructions">{step.instructions}</p>
                                        {step.notes && (
                                            <p className="step-notes">💡 {step.notes}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                    </ol>
                </section>

                <section className="recipe-section">
                    <h2>Images</h2>
                    <div className="recipe-image-list">
                        {[...recipe.images].filter(image => !image.isPrimary).map(image => (
                                <div key={image.id} className="recipe-image-entry">
                                    <img
                                        src={image.imageUrl}
                                        alt={image.caption}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {image.caption && <p className="image-caption">{image.caption}</p>}
                                </div>
                            ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default RecipeDetails;