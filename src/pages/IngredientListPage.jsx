import { useState, useEffect } from 'react';
import IngredientList from '../components/IngredientList';
import ConfirmationPopup from '../components/ConfirmationPopup';
import IngredientModal from '../components/IngredientModal';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;
const defaultIngredientData = {
        name: '',
        unit: '',
        pricePerUnit: ''
    };

function IngredientListPage() {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
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
                if (!response.ok)
                {
                    toast.error('Failed to add ingredient');
                    return;
                }
                const data = await response.json();
                setIngredients([...ingredients, data]);
                setIngredientData(defaultIngredientData)
                toast.success('Ingredient added successfully');
            }
        } catch (err) {
            toast.error(err.message);
        }
        finally {
            setIngredientModalOpen(false);
        }
    }


    const onRequestEdit = async (id) => {
        try {
            const response = await fetch(`${API_URL}/ingredients/${id}`);
            if (!response.ok)
            {
                toast.error('Failed to fetch ingredients');
                return;
            }
            const data = await response.json();
            setIngredientData(data);
            setIngredientModalTitle("Edit Ingredient");
            setIngredientModalSubmitButtonText("Submit");
            setOnSubmit(() => onConfirmEdit);
            setIngredientModalOpen(true);
        } catch (err) {
            toast.error(err.message);
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
                if (!response.ok)
                {
                    toast.error('Failed to edit ingredient');
                    return;
                }
                setIngredients(ingredients.map(i => i.id === formData.id ? formData : i));
                setIngredientData(defaultIngredientData)
                toast.success('Ingredient updated successfully');
            }
        } catch (err) {
            toast.error(err.message);
        }
        finally {
            setIngredientModalOpen(false);
        }
    }


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
                if (response.status === 409)
                {
                    toast.error('Cannot delete ingredient as it is in use by an existing recipe');
                    return;
                }
                if (!response.ok)
                {
                    toast.error('Failed to delete ingredient');
                    return;
                }
                setIngredients(ingredients.filter(ingredient => ingredient.id !== ingredientToDelete));
                toast.success('Ingredient deleted successfully');
            }
        } catch (err) {
            toast.error(err.message);
        }
        finally {
            setConfirmPopupOpen(false);
        }
    }

    if (loading) return <p>Loading ingredients...</p>;

    return (
        <div className="page">
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