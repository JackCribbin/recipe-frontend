# Recipe Frontend

A React frontend for managing recipes, consuming the [RecipeApp API](https://github.com/JackCribbin/RecipeApp). This is a personal project I built to learn React and modern frontend development practices.

**Live App:** https://recipe-frontend-rho.vercel.app

---

## Tech Stack

- **React 19** — Component-based UI library
- **React Router** — Client-side routing between pages
- **Vite** — Fast development server and build tool
- **Plain CSS** — Styling without a component library
- **react-hot-toast** — Toast notifications for user feedback
- **Vercel** — Hosting with automatic deployments from GitHub

---

## Features

- Recipe list view with responsive card grid layout and primary image display
- Recipe detail view showing ingredients, steps, primary image and additional images
- Full recipe CRUD — create, edit and delete recipes from the UI
- Full ingredient CRUD — create, edit and delete ingredients from the UI
- Create and edit forms with dynamic ingredient, step and image sections
- Confirmation modal before destructive actions
- Toast notifications for success and error feedback on all actions
- Ellipsis menu on cards for edit and delete actions
- Ordered step display with numbered step indicators
- Ingredient list with quantities, units and notes
- Image error handling with fallback placeholder display
- Loading and error states for all data fetching
- Persistent navigation bar across all pages
- Hover animations on recipe cards
- Responsive layout that works on mobile and desktop

---

## Architecture Decisions

**Pages and components separation**
The project separates page-level components (`RecipeListPage`, `RecipeDetailsPage`, `IngredientListPage` etc.) from reusable UI components (`RecipeCard`, `RecipeForm`, `IngredientCard` etc.). Page components own the data fetching and state, passing data down to presentational components as props. This keeps components focused and reusable.

**Data fetching at the page level**
Rather than fetching data deep inside components, all API calls happen at the page level. This makes the data flow easy to follow — you can always find where data comes from by looking at the page component, and child components are simpler because they just render what they're given.

**Lifting state for shared modals**
Modals (confirmation dialogs, ingredient forms) are rendered at the page level rather than inside individual cards. This means one modal instance exists per page regardless of how many cards are displayed, avoiding redundant DOM elements and giving the page direct access to update shared state after an action completes.

**Shared RecipeForm component**
The create and edit recipe flows reuse a single `RecipeForm` component. The parent page controls the initial form data, submit behaviour (POST vs PUT), and page title — the form itself is unaware of which mode it's in.

**Summary vs detail endpoints**
The recipe list uses a dedicated summary endpoint (`GET /recipes`) that returns lightweight data — just name, description and primary image. Full recipe detail including steps and ingredients is only fetched when a specific recipe is opened. This avoids loading unnecessary data when displaying a list of many recipes.

---

## Project Structure

```
recipe-frontend/
├── src/
│   ├── components/
│   │   ├── ConfirmationPopup.jsx   # Reusable delete confirmation modal
│   │   ├── IngredientCard.jsx      # Individual ingredient row with menu
│   │   ├── IngredientList.jsx      # List of ingredient cards
│   │   ├── IngredientModal.jsx     # Reusable add/edit ingredient modal
│   │   ├── NavBar.jsx              # Persistent navigation bar
│   │   ├── RecipeCard.jsx          # Individual recipe card for list view
│   │   ├── RecipeDetails.jsx       # Full recipe detail display
│   │   ├── RecipeForm.jsx          # Shared create/edit recipe form
│   │   └── RecipeList.jsx          # Grid of recipe cards
│   ├── pages/
│   │   ├── CreateRecipePage.jsx    # Create recipe page
│   │   ├── EditRecipePage.jsx      # Edit recipe page
│   │   ├── IngredientListPage.jsx  # Ingredient management page
│   │   ├── RecipeDetailsPage.jsx   # Recipe detail page
│   │   └── RecipeListPage.jsx      # Recipe list page
│   ├── App.jsx                     # Route definitions
│   ├── App.css                     # Global styles
│   └── main.jsx                    # App entry point
└── .env                            # Environment variables (not committed)
```

---

## Running Locally

**Prerequisites**
- Node.js 18+
- Git
- The [RecipeApp API](https://github.com/JackCribbin/RecipeApp) running locally or the deployed version

**Steps**

1. Clone the repository
```
git clone https://github.com/JackCribbin/recipe-frontend.git
cd recipe-frontend
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the project root
```
VITE_API_URL=http://localhost:[your-api-port]
```

To use the deployed API instead:
```
VITE_API_URL=https://recipeapp-api.azurewebsites.net
```

4. Start the development server
```
npm run dev
```

5. Open `http://localhost:5173` in your browser

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL of the RecipeApp API |

---

## Deployment

The frontend is deployed to Vercel. Every push to `main` triggers an automatic redeployment. The `VITE_API_URL` environment variable is configured in the Vercel project settings pointing to the deployed Azure API.

---

## Related

- [RecipeApp API](https://github.com/JackCribbin/RecipeApp) — The ASP.NET Core backend this frontend consumes