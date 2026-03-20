import { useState, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function RecipeDetailsPage() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes/${id}`);
                if (!response.ok) throw new Error("Failed to fetch recipes");
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, []);

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div>
                <button onClick={() => navigate('/')}>← Back to recipes</button>
            </div>
            <RecipeDetails recipe={recipe} />
        </div>
    );
}

export default RecipeDetailsPage;