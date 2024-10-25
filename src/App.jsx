import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Main, { mainLoader } from './layouts/Main';

// Actions
import { logoutAction } from './actions/logout';
import { deleteBudget } from './actions/deleteBudget';

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from './pages/ExpensesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: 'budget/:id',
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
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
        action: expensesAction,
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

  // Fetch budgets from backend
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/budgets");
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    
    fetchBudgets();
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
      <div>
        <h1>Budgets</h1>
        <ul>
          {budgets.map((budget) => (
            <li key={budget._id}>{budget.name} - ${budget.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
