import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

// Helpers
import {
  fetchUserName,
  fetchBudgets,
  fetchExpenses,
  createBudget,
  createExpense,
  deleteItem,
  waait,
} from '../helpers';

// Fetch initial dashboard data
export async function dashboardLoader() {
  try {
    const userId = localStorage.getItem('userId');
    const userName = userId ? await fetchUserName(userId) : null;
    const budgets = await fetchBudgets();
    const expenses = await fetchExpenses();

    console.log('Fetched data:', { userName, budgets, expenses });
    return { userName, budgets, expenses };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Response('Error loading dashboard data', { status: 500 });
  }
}

// Action to handle budget and expense form submissions
export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  try {
    // New user submission
    if (_action === 'newUser') {
      await apiFetch('user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.userName }),
      });
      toast.success(`Welcome, ${values.userName}`);
    }

    // Create budget
    if (_action === 'createBudget') {
      await createBudget({ name: values.name, amount: values.amount });
      toast.success('Budget created!');
    }

    // Create expense
    if (_action === 'createExpense') {
      await createExpense({
        name: values.newExpense,
        amount: values.amount,
        budgetId: values.budgetId,
      });
      toast.success(`Expense ${values.newExpense} created!`);
    }

    // Delete expense
    if (_action === 'deleteExpense') {
      await deleteItem({ key: 'expenses', id: values.expenseId });
      toast.success('Expense deleted!');
    }
  } catch (error) {
    console.error('Action error:', error);
    throw new Error('There was a problem processing your request.');
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  if (!userName) {
    return <Intro />;
  }

  return (
    <div className="dashboard">
      <h1>
        Welcome back, <span className="accent">{userName}</span>
      </h1>
      <div className="grid-sm">
        {budgets && budgets.length > 0 ? (
          <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>
            <h2>Existing Budgets</h2>
            <div className="budgets">
              {budgets.map((budget) => (
                <BudgetItem key={budget._id} budget={budget} />
              ))}
            </div>
            {expenses && expenses.length > 0 && (
              <div className="grid-md">
                <h2>Recent Expenses</h2>
                <Table
                  expenses={expenses
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                    )
                    .slice(0, 8)}
                />
                {expenses.length > 8 && (
                  <Link to="expenses" className="btn btn--dark">
                    View all expenses
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid-sm">
            <p>Create a budget to get started!</p>
            <AddBudgetForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
