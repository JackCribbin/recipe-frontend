import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import ConfirmationPopup from '../components/ConfirmationPopup';

const API_URL = import.meta.env.VITE_API_URL;

function RecipeListPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
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

    const [deleteError, setDeleteError] = useState(null);

    const onRequestDelete = async (id) => {
        try {
            setRecipeToDelete(id);
            setConfirmPopupOpen(!confirmPopupOpen);
        } catch (err) {
            setDeleteError(err.message);
        }
    }

    const onConfirmDeletion = async (shouldDelete) => {
        try {
            if(shouldDelete) {
                const response = await fetch(`${API_URL}/recipes/${recipeToDelete}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error("Failed to delete recipe");
                setRecipes(recipes.filter(recipe => recipe.id !== recipeToDelete));
            }
        } catch (err) {
            setDeleteError(err.message);
        }
        finally {
            setConfirmPopupOpen(false);
        }
    }

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="page">
            {deleteError && <p>Error: {deleteError}</p>}
            <div className="page-header">
                <h1>My Recipes</h1>
                <button className="add-button" onClick={() => navigate('/recipes/new')}>
                    + New Recipe
                </button>
            </div>
            {confirmPopupOpen && (<ConfirmationPopup onConfirmDeletion={onConfirmDeletion}/>)} 
            <RecipeList recipes={recipes} onRequestDelete={onRequestDelete}/>
        </div>
    );
}

export default RecipeListPage;