import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import toast from 'react-hot-toast';

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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`${API_URL}/ingredients`);
                if (!response.ok)
                {
                    toast.error('Failed to fetch ingredients', { duration: Infinity });
                    return;
                }
                const data = await response.json();
                setIngredients(data);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchIngredients();
    }, []);
    

    const onSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/recipes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok)
            {
                toast.error('Failed to create recipe');
                return;
            }
            navigate('/');
            toast.success('Recipe added successfully');
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (loading) return <p>Loading ingredients...</p>;

    return (
        <div>
            <RecipeForm 
                formData={formData} 
                setFormData={setFormData}
                ingredients={ingredients}
                onSubmit={onSubmit}
                title="Create New Recipe"
                submitButtonText="Create Recipe"
             />
        </div>
    );
}

export default CreateRecipePage;