import { useNavigate } from 'react-router-dom';

//function RecipeForm({ formData, setFormData, handleSubmit }) {
function RecipeForm({ formData, setFormData, ingredients, onSubmit }) {
    const navigate = useNavigate();

    const handleFieldChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = formData.recipeIngredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setFormData({ ...formData, recipeIngredients: updatedIngredients });
    };

    const addIngredient = () => {
        const newIngredient = { 
            ingredientId: '',
            quantity: '',
            notes: '' 
        };
        setFormData({ ...formData, recipeIngredients: [...formData.recipeIngredients, newIngredient] });
    };

    const removeIngredient = (index) => {
        const updatedIngredients = formData.recipeIngredients
            .filter((_, i) => i !== index);
        setFormData({ ...formData, recipeIngredients: updatedIngredients });
    };

    const handleStepChange = (index, field, value) => {
        const updatedSteps = formData.steps.map((step, i) =>
            i === index ? { ...step, [field]: value } : step
        );
        setFormData({ ...formData, steps: updatedSteps });
    };

    const addStep = () => {
        const newStep = { 
            stepNumber: formData.steps.length + 1, 
            instructions: '', 
            notes: '' 
        };
        setFormData({ ...formData, steps: [...formData.steps, newStep] });
    };

    const removeStep = (index) => {
        const updatedSteps = formData.steps
            .filter((_, i) => i !== index)
            .map((step, i) => ({ ...step, stepNumber: i + 1 }));
        setFormData({ ...formData, steps: updatedSteps });
    };

    return (
        <div className="recipe-form">
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back to recipes
            </button>

            <div className="basic-recipe-details">
                <input 
                    placeholder="Recipe Name e.g. Chocolate Brownies"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                />
                <textarea 
                    placeholder="Recipe Description e.g. Fudgy chocolate brownies"
                    value={formData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                />
                <input 
                    type="number"
                    value={formData.servings}
                    onChange={(e) => handleFieldChange('servings', e.target.value)}
                />
            </div>

            <div className="recipe-ingredients">
                <button className="add-ingredient-button" onClick={() => addIngredient()}>
                    Add Ingredient
                </button>
                {formData.recipeIngredients.map((recipeIngredient, index) => (
                    <div key={index} className="recipe-ingredient">
                        <select
                            value={recipeIngredient.ingredientId}
                            onChange={(e) => handleIngredientChange(index, 'ingredientId', e.target.value)}>
                            <option value="">Select an ingredient</option>
                            {ingredients.map(ingredient => (
                                <option key={ingredient.id} value={ingredient.id}>
                                    {ingredient.name} ({ingredient.unit})
                                </option>
                            ))}
                        </select>
                        <input 
                            type="number"
                            value={recipeIngredient.quantity}
                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                        />
                        <input 
                            placeholder="Notes e.g. use dark chocolate"
                            value={recipeIngredient.notes}
                            onChange={(e) => handleIngredientChange(index, 'notes', e.target.value)}
                        />
                        <button className="remove-ingredient-button" onClick={() => removeIngredient(index)}>
                            Remove Ingredient
                        </button>
                    </div>
                ))}
            </div>

            <div className="recipe-steps">
                <button className="add-step-button" onClick={() => addStep()}>
                    Add Step
                </button>
                {formData.steps.map((recipeStep, index) => (
                    <div key={index} className="recipe-step">
                        <textarea 
                            value={recipeStep.instructions}
                            onChange={(e) => handleStepChange(index, 'instructions', e.target.value)}
                        />
                        <textarea 
                            placeholder="Notes e.g. do not over-mix"
                            value={recipeStep.notes}
                            onChange={(e) => handleStepChange(index, 'notes', e.target.value)}
                        />
                        <button className="remove-step-button" onClick={() => removeStep(index)}>
                            Remove Step
                        </button>
                    </div>
                ))}
            </div>

            <button className="submit-button" onClick={() => onSubmit()}>
                Create Recipe
            </button>
        </div>
    );
}

export default RecipeForm;