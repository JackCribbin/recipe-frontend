import { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes`);
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
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
        <div>
            <h1>My Recipes</h1>
            <RecipeList recipes={recipes} />
        </div>
    );
}

export default App;