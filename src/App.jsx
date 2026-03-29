import { Routes, Route } from 'react-router-dom';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailsPage';
import CreateRecipePage from './pages/CreateRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<RecipeListPage />} />
                <Route path="/recipes/new" element={<CreateRecipePage />} />
                <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
            </Routes>
        </div>
    );
}

export default App;