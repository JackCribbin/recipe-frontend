function AddIngredientModal({ formData, setFormData, onAddIngredient }) {

    const handleFieldChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2 className="modal-title">Add Ingredient</h2>
                <div className="modal-form-fields">
                    <input
                        className="form-input"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                    />

                    <input
                        className="form-input"
                        placeholder="Unit"
                        value={formData.unit}
                        onChange={(e) => handleFieldChange('unit', e.target.value)}
                    />

                    <input
                        className="form-input"
                        placeholder="Price Per Unit"
                        value={formData.pricePerUnit}
                        onChange={(e) => handleFieldChange('pricePerUnit', e.target.value)}
                    />
                </div>

                <div className="modal-actions">
                    <button className="modal-button" onClick={() => onAddIngredient(true)}>
                        Add Ingredient 
                    </button>
                    <button className="modal-button modal-button--cancel" onClick={() => onAddIngredient(false)}>
                        Cancel 
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddIngredientModal;