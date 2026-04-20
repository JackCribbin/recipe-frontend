import { Routes, Route } from 'react-router-dom';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailsPage';
import CreateRecipePage from './pages/CreateRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import IngredientListPage from './pages/IngredientListPage';
import NavBar from './components/NavBar';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
    return (
        <div>
            <NavBar/>
            <Toaster position="bottom-right"
                toastOptions={{
                    duration: 10000
                }}
            />
            <Routes>
                <Route path="/" element={<RecipeListPage />} />
                <Route path="/recipes/new" element={<CreateRecipePage />} />
                <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/ingredients" element={<IngredientListPage />} />
            </Routes>
        </div>
    );
}

export default App;