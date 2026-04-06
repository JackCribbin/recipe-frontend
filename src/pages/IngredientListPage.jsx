import { useState, useEffect } from 'react';
import IngredientList from '../components/IngredientList';
import ConfirmationPopup from '../components/ConfirmationPopup';
import IngredientModal from '../components/IngredientModal';

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
    const [ingredientModalOpen, setIngredientModalOpen] = useState(false);
    const [ingredientData, setIngredientData] = useState(defaultIngredientData);
    const [ingredientModalTitle, setIngredientModalTitle] = useState();
    const [ingredientModalSubmitButtonText, setIngredientModalSubmitButtonText] = useState();
    const [onSubmit, setOnSubmit] = useState();

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

    const [addIngredientError, setAddIngredientError] = useState(null);
    
    const addButtonClicked = () =>
    {
        setIngredientModalTitle("Add New Ingredient");
        setIngredientModalSubmitButtonText("Add");
        setIngredientData(defaultIngredientData);
        setOnSubmit(() => onAddIngredient);
        setIngredientModalOpen(true);
    }

    const onAddIngredient = async (shouldAdd, formData) => {
        try {
            if(shouldAdd) {
                const response = await fetch(`${API_URL}/ingredients/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
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
            setIngredientModalOpen(false);
        }
    }


    const [editIngredientError, setEditIngredientError] = useState(null);

    const onRequestEdit = async (id) => {
        try {
            const response = await fetch(`${API_URL}/ingredients/${id}`);
            if (!response.ok) throw new Error("Failed to fetch ingredients");
            const data = await response.json();
            setIngredientData(data);
            setIngredientModalTitle("Edit Ingredient");
            setIngredientModalSubmitButtonText("Submit");
            setOnSubmit(() => onConfirmEdit);
            setIngredientModalOpen(true);
        } catch (err) {
            setEditIngredientError(err.message);
        }
    }

    const onConfirmEdit = async (shouldEdit, formData) => {
        try {
            if(shouldEdit) {
                const response = await fetch(`${API_URL}/ingredients/${formData.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) throw new Error("Failed to add ingredient");
                setIngredients(ingredients.map(i => i.id === formData.id ? formData : i));
                setIngredientData(defaultIngredientData)
                setEditIngredientError(null);
            }
        } catch (err) {
            setEditIngredientError(err.message);
        }
        finally {
            setIngredientModalOpen(false);
        }
    }


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

    if (loading) return <p>Loading ingredients...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="page">
            {deleteError && <p>Error: {deleteError}</p>}
            {editIngredientError && <p>Error: {editIngredientError}</p>}
            {addIngredientError && <p>Error: {addIngredientError}</p>}
            <div className="page-header">
                <h1>Ingredients</h1>
                <button className="add-button" onClick={() => {
                    addButtonClicked();
                }}>
                    + New Ingredient
                </button>
            </div>
            {confirmPopupOpen && (<ConfirmationPopup onConfirmDeletion={onConfirmDeletion}/>)} 
            {ingredientModalOpen && (<IngredientModal formData={ingredientData}
                setFormData={setIngredientData}
                onSubmit={onSubmit} 
                title={ingredientModalTitle}
                submitButtonText={ingredientModalSubmitButtonText}/>)} 
            <IngredientList ingredients={ingredients} onRequestDelete={onRequestDelete} onRequestEdit={onRequestEdit}/>
        </div>
    );
}

export default IngredientListPage;