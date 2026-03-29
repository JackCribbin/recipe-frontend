import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import ConfirmationPopup from '../components/ConfirmationPopup';
import AddIngredientModal from '../components/AddIngredientModal';

const API_URL = import.meta.env.VITE_API_URL;
const defaultIngredientData = {
        name: '',
        unit: '',
        pricePerUnit: ''
    };

function RecipeListPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const [addIngredientOpen, setAddIngredientOpen] = useState(false);
    const [ingredientData, setIngredientData] = useState(defaultIngredientData);
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
                setDeleteError(null);
            }
        } catch (err) {
            setDeleteError(err.message);
        }
        finally {
            setConfirmPopupOpen(false);
        }
    }
    
    const [addIngredientError, setAddIngredientError] = useState(null);
    const onAddIngredient = async (shouldAdd) => {
        try {
            if(shouldAdd) {
                const response = await fetch(`${API_URL}/ingredients/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(ingredientData)
                });
                if (!response.ok) throw new Error("Failed to add ingredient");
                setIngredientData(defaultIngredientData)
                setAddIngredientError(null);
            }
        } catch (err) {
            setAddIngredientError(err.message);
        }
        finally {
            setAddIngredientOpen(false);
        }
    }

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="page">
            {deleteError && <p>Error: {deleteError}</p>}
            {addIngredientError && <p>Error: {addIngredientError}</p>}
            <div className="page-header">
                <h1>My Recipes</h1>
                <button className="add-button" onClick={() => navigate('/recipes/new')}>
                    + New Recipe
                </button>
                <button className="add-button" onClick={() => {
                    setAddIngredientOpen(true);
                }}>
                    + New Ingredient
                </button>
            </div>
            {confirmPopupOpen && (<ConfirmationPopup onConfirmDeletion={onConfirmDeletion}/>)} 
            {addIngredientOpen && (<AddIngredientModal formData={ingredientData} setFormData={setIngredientData} onAddIngredient={onAddIngredient}/>)} 
            <RecipeList recipes={recipes} onRequestDelete={onRequestDelete}/>
        </div>
    );
}

export default RecipeListPage;