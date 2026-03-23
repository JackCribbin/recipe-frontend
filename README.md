# Recipe Frontend

A React frontend for browsing and viewing recipes, consuming the [RecipeApp API](https://github.com/JackCribbin/RecipeApp). This is a personal project I built to learn React and modern frontend development practices.

**Live App:** https://recipe-frontend-rho.vercel.app

---

## Tech Stack

- **React 19** — Component-based UI library
- **React Router** — Client-side routing between pages
- **Vite** — Fast development server and build tool
- **Plain CSS** — Styling without a component library
- **Vercel** — Hosting with automatic deployments from GitHub

---

## Features

- Recipe list view with responsive card grid layout
- Recipe detail view showing ingredients, steps and images
- Ordered step display with numbered step indicators
- Ingredient list with quantities, units and notes
- Loading and error states for all data fetching
- Hover animations on recipe cards
- Responsive layout that works on mobile and desktop

---

## Architecture Decisions

**Pages and components separation**
The project separates page-level components (`RecipeListPage`, `RecipeDetailsPage`) from reusable UI components (`RecipeCard`, `RecipeList`, `RecipeDetails`). Page components own the data fetching and state, passing data down to presentational components as props. This keeps components focused and reusable.

**Data fetching at the page level**
Rather than fetching data deep inside components, all API calls happen at the page level. This makes the data flow easy to follow — you can always find where data comes from by looking at the page component, and child components are simpler because they just render what they're given.

**Summary vs detail endpoints**
The recipe list uses a dedicated summary endpoint (`GET /recipes`) that returns lightweight data — just name, description and primary image. Full recipe detail including steps and ingredients is only fetched when a specific recipe is opened. This avoids loading unnecessary data when displaying a list of many recipes.

---

## Project Structure

```
recipe-frontend/
├── src/
│   ├── components/
│   │   ├── RecipeCard.jsx      # Individual recipe card for list view
│   │   ├── RecipeDetail.jsx    # Full recipe detail display
│   │   └── RecipeList.jsx      # Grid of recipe cards
│   ├── pages/
│   │   ├── RecipeListPage.jsx  # List page with data fetching
│   │   └── RecipeDetailsPage.jsx # Detail page with data fetching
│   ├── App.jsx                 # Route definitions
│   ├── App.css                 # Global styles
│   └── main.jsx                # App entry point
└── .env                        # Environment variables (not committed)
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