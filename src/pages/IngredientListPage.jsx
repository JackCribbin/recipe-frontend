import { useState, useEffect } from 'react';
import IngredientList from '../components/IngredientList';
import ConfirmationPopup from '../components/ConfirmationPopup';
import AddIngredientModal from '../components/AddIngredientModal';

const API_URL = import.meta.env.VITE_API_URL;
const defaultIngredientData = {
        name: '',
        unit: '',
        pricePerUnit: ''
    };

function IngredientListPage() {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ingredientToDelete, setIngredientToDelete] = useState(null);
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const [addIngredientOpen, setAddIngredientOpen] = useState(false);
    const [ingredientData, setIngredientData] = useState(defaultIngredientData);

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

    const [deleteError, setDeleteError] = useState(null);

    const onRequestDelete = async (id) => {
        setIngredientToDelete(id);
        setConfirmPopupOpen(true);
    }

    const onConfirmDeletion = async (shouldDelete) => {
        try {
            if(shouldDelete) {
                const response = await fetch(`${API_URL}/ingredients/${ingredientToDelete}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error("Failed to delete ingredients");
                setIngredients(ingredients.filter(ingredient => ingredient.id !== ingredientToDelete));
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
                const data = await response.json();
                setIngredients([...ingredients, data]);
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

    if (loading) return <p>Loading ingredients...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="page">
            {deleteError && <p>Error: {deleteError}</p>}
            {addIngredientError && <p>Error: {addIngredientError}</p>}
            <div className="page-header">
                <h1>Ingredients</h1>
                <button className="add-button" onClick={() => {
                    setAddIngredientOpen(true);
                }}>
                    + New Ingredient
                </button>
            </div>
            {confirmPopupOpen && (<ConfirmationPopup onConfirmDeletion={onConfirmDeletion}/>)} 
            {addIngredientOpen && (<AddIngredientModal formData={ingredientData} setFormData={setIngredientData} onAddIngredient={onAddIngredient}/>)} 
            <IngredientList ingredients={ingredients} onRequestDelete={onRequestDelete}/>
        </div>
    );
}

export default IngredientListPage;