import { useNavigate } from 'react-router-dom';

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
        setFormData({ ...formData, recipeIngredients: [...formData.recipeIngredients, { ingredientId: '', quantity: '', notes: '' }] });
    };

    const removeIngredient = (index) => {
        setFormData({ ...formData, recipeIngredients: formData.recipeIngredients.filter((_, i) => i !== index) });
    };

    const handleStepChange = (index, field, value) => {
        const updatedSteps = formData.steps.map((step, i) =>
            i === index ? { ...step, [field]: value } : step
        );
        setFormData({ ...formData, steps: updatedSteps });
    };

    const addStep = () => {
        setFormData({ ...formData, steps: [...formData.steps, { stepNumber: formData.steps.length + 1, instructions: '', notes: '' }] });
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

            <h1 className="form-title">Create Recipe</h1>

            <section className="form-section">
                <div className="form-field">
                    <label className="form-label">Recipe Name *</label>
                    <input
                        className="form-input"
                        placeholder="e.g. Chocolate Brownies"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-textarea"
                        placeholder="e.g. Rich and fudgy chocolate brownies"
                        value={formData.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                    />
                </div>

                <div className="form-field form-field--short">
                    <label className="form-label">Servings *</label>
                    <input
                        className="form-input"
                        type="number"
                        placeholder="e.g. 4"
                        min="1"
                        value={formData.servings}
                        onChange={(e) => handleFieldChange('servings', e.target.value)}
                    />
                </div>
            </section>

            <section className="form-section">
                <div className="form-section-header">
                    <h2 className="form-section-title">Ingredients</h2>
                    <button className="add-button" onClick={addIngredient}>
                        + Add Ingredient
                    </button>
                </div>

                <div className="form-list">
                    {formData.recipeIngredients.map((recipeIngredient, index) => (
                        <div key={index} className="form-list-item">
                            <select
                                className="form-select"
                                value={recipeIngredient.ingredientId}
                                onChange={(e) => handleIngredientChange(index, 'ingredientId', e.target.value)}
                            >
                                <option value="">Select ingredient</option>
                                {ingredients.map(ingredient => (
                                    <option key={ingredient.id} value={ingredient.id}>
                                        {ingredient.name} ({ingredient.unit})
                                    </option>
                                ))}
                            </select>

                            <input
                                className="form-input form-input--quantity"
                                type="number"
                                placeholder="Qty"
                                min="0"
                                value={recipeIngredient.quantity}
                                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            />

                            <input
                                className="form-input"
                                placeholder="Notes (optional)"
                                value={recipeIngredient.notes}
                                onChange={(e) => handleIngredientChange(index, 'notes', e.target.value)}
                            />

                            <button
                                className="remove-button"
                                onClick={() => removeIngredient(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="form-section">
                <div className="form-section-header">
                    <h2 className="form-section-title">Steps</h2>
                    <button className="add-button" onClick={addStep}>
                        + Add Step
                    </button>
                </div>

                <div className="form-list">
                    {formData.steps.map((recipeStep, index) => (
                        <div key={index} className="form-step-item">
                            <div className="step-number">{recipeStep.stepNumber}</div>
                            <div className="step-content">
                                <textarea
                                    className="form-textarea"
                                    placeholder="Describe this step..."
                                    value={recipeStep.instructions}
                                    onChange={(e) => handleStepChange(index, 'instructions', e.target.value)}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Tip or note (optional)"
                                    value={recipeStep.notes}
                                    onChange={(e) => handleStepChange(index, 'notes', e.target.value)}
                                />
                            </div>
                            <button
                                className="remove-button"
                                onClick={() => removeStep(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <div className="form-actions">
                <button className="submit-button" onClick={onSubmit}>
                    Create Recipe
                </button>
            </div>
        </div>
    );
}

export default RecipeForm;