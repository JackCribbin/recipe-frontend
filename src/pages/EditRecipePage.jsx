import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';

const API_URL = import.meta.env.VITE_API_URL;

function EditRecipePage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        servings: '',
        recipeIngredients: [{ ingredientId: '', quantity: '', notes: '' }],
        steps: [{ stepNumber: 1, instructions: '', notes: '' }],
        images: [{ imageUrl: '', caption: '', isPrimary: true }]
    });
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes/${id}`);
                if (!response.ok) throw new Error("Failed to fetch recipe");
                const data = await response.json();

                const retrievedFormData =
                {
                    name: data.name,
                    description: data.description,
                    servings: data.servings,
                    recipeIngredients: data.recipeIngredients.map(ingredient => ({
                        ingredientId: ingredient.ingredientId, quantity: ingredient.quantity, notes: ingredient.notes
                    })),
                    steps: data.steps.map(step => ({
                        stepNumber: step.stepNumber, instructions: step.instructions, notes: step.notes
                    })),
                    images: data.images.map(image => ({
                        imageUrl: image.imageUrl, caption: image.caption, isPrimary: image.isPrimary
                    }))
                };

                setFormData(retrievedFormData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();




        const fetchIngredients = async () => {
            try {
                const response = await fetch(`${API_URL}/ingredients`);
                if (!response.ok) throw new Error("Failed to fetch ingredients");
                const data = await response.json();
                setIngredients(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchIngredients();
    }, []);

    const [submitError, setSubmitError] = useState(null);

    const onSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/recipes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error("Failed to edit recipe");
            navigate('/');
        } catch (err) {
            setSubmitError(err.message);
        }
    };

    if (loading) return <p>Loading ingredients...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {submitError && <p>Error: {submitError}</p>}
            <RecipeForm 
                formData={formData} 
                setFormData={setFormData}
                ingredients={ingredients}
                onSubmit={onSubmit}
                title="Edit Recipe"
                submitButtonText="Save Changes"
            />
        </div>
    );
}

export default EditRecipePage;