import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import ConfirmationPopup from '../components/ConfirmationPopup';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

function RecipeListPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes`);
                if (!response.ok)
                {
                    toast.error('Failed to fetch recipes', { duration: Infinity });
                    return;
                }
                const data = await response.json();
                setRecipes(data);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    
    const onRequestDelete = async (id) => {
        setRecipeToDelete(id);
        setConfirmPopupOpen(true);
    }

    const onConfirmDeletion = async (shouldDelete) => {
        try {
            if(shouldDelete) {
                const response = await fetch(`${API_URL}/recipes/${recipeToDelete}`, {
                    method: 'DELETE',
                });
                if (!response.ok)
                {
                    toast.error('Failed to delete recipe');
                    return;
                }
                setRecipes(recipes.filter(recipe => recipe.id !== recipeToDelete));
                toast.success('Recipe deleted successfully');
            }
        } catch (err) {
            toast.error(err.message);
        }
        finally {
            setConfirmPopupOpen(false);
        }
    }

    if (loading) return <p>Loading recipes...</p>;

    return (
        <div className="page">
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