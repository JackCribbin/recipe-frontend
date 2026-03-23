import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';

const API_URL = import.meta.env.VITE_API_URL;

function RecipeListPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes`);
                if (!response.ok) throw new Error("Failed to fetch recipes");
                const data = await response.json();
                setRecipes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="page">
            <div className="page-header">
                <h1>My Recipes</h1>
                <button className="add-button" onClick={() => navigate('/recipes/new')}>
                    + New Recipe
                </button>
            </div>
            <RecipeList recipes={recipes} />
        </div>
    );
}

export default RecipeListPage;