import { useState, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

function RecipeDetailsPage() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes/${id}`);
                if (!response.ok)
                {
                    toast.error('Failed to fetch recipe', { duration: Infinity });
                    return;
                }
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, []);

    if (loading) return <p>Loading recipes...</p>;

    return (
        <div>
            <RecipeDetails recipe={recipe} />
        </div>
    );
}

export default RecipeDetailsPage;