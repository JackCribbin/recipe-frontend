import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';

const API_URL = import.meta.env.VITE_API_URL;

function CreateRecipePage() {
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
    const navigate = useNavigate();

    useEffect(() => {
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
            const response = await fetch(`${API_URL}/recipes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error("Failed to create recipe");
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
            />
        </div>
    );
}

export default CreateRecipePage;