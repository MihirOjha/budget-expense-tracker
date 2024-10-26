import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Main from './layouts/Main';

// Actions
import { logoutAction } from './actions/logout';
import { deleteBudget } from './actions/deleteBudget';

// Routes and Loaders
import Dashboard, { dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import BudgetPage, { budgetLoader } from './pages/BudgetPage';
import ExpensesPage, { expensesLoader } from './pages/ExpensesPage';

// Import fetch function
import { fetchBudgets } from './helpers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: async () => {
      try {
        const budgets = await fetchBudgets(); // Using fetchBudgets helper
        return { budgets };
      } catch (error) {
        console.error("Error loading budgets:", error);
        throw error; // This will trigger the errorElement
      }
    },
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <Error />,
      },
      {
        path: 'budget/:id',
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error />,
        children: [
          {
            path: 'delete',
            action: deleteBudget,
          },
        ],
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
        loader: expensesLoader,
        errorElement: <Error />,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  // Fetch budgets from backend
  useEffect(() => {
    const controller = new AbortController(); // Abort controller for cleanup
    const fetchBudgetsData = async () => {
      try {
        const data = await fetchBudgets(); // Using fetchBudgets helper
        if (Array.isArray(data)) {
          setBudgets(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setError("Failed to fetch budgets.");
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching budgets:", error);
          setError("Error fetching budgets.");
        }
      }
    };

    fetchBudgetsData();

    return () => {
      controller.abort(); // Clean up the fetch on component unmount
    };
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
      <div>
        <h1>Budgets</h1>
        {error ? (
          <div className="error">{error}</div> // Display error message
        ) : (
          <ul>
            {budgets.length > 0 ? (
              budgets.map((budget) => (
                <li key={budget._id}>{budget.name} - ${budget.amount}</li>
              ))
            ) : (
              <li>No budgets available.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
