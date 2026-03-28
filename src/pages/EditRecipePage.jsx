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
        const fetchData = async () => {
            try {
                const [recipeResponse, ingredientsResponse] = await Promise.all([
                    fetch(`${API_URL}/recipes/${id}`),
                    fetch(`${API_URL}/ingredients`)
                ]);

                if (!recipeResponse.ok) throw new Error("Failed to fetch recipe");
                if (!ingredientsResponse.ok) throw new Error("Failed to fetch ingredients");

                const [recipeData, ingredientsData] = await Promise.all([
                    recipeResponse.json(),
                    ingredientsResponse.json()
                ]);

                setFormData({
                    name: recipeData.name,
                    description: recipeData.description,
                    servings: recipeData.servings,
                    recipeIngredients: recipeData.recipeIngredients.map(ingredient => ({
                        ingredientId: ingredient.ingredientId,
                        quantity: ingredient.quantity,
                        notes: ingredient.notes
                    })),
                    steps: recipeData.steps.map(step => ({
                        stepNumber: step.stepNumber,
                        instructions: step.instructions,
                        notes: step.notes
                    })),
                    images: recipeData.images.map(image => ({
                        imageUrl: image.imageUrl,
                        caption: image.caption,
                        isPrimary: image.isPrimary
                    }))
                });

                setIngredients(ingredientsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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