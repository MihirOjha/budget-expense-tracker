import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

// Helpers
import {
  fetchBudgets,
  fetchExpenses,
  createExpense,
  deleteItem,
} from '../helpers'; // Import the specific helper functions

// Loader for budget data
export async function budgetLoader({ params }) {
  const budget = await fetchBudgets().then((budgets) =>
    budgets.find((b) => b._id === params.id),
  );
  const expenses = await fetchExpenses().then((expenses) =>
    expenses.filter((expense) => expense.budgetId === params.id),
  );

  if (!budget) {
    throw new Error('The budget you’re trying to find doesn’t exist');
  }

  return { budget, expenses };
}

// Action for creating or deleting an expense
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'createExpense') {
    try {
      await createExpense(values); // Use specific createExpense function
      toast.success(`Expense ${values.name} created!`); // Use values.name instead of values.newExpense
    } catch (error) {
      toast.error('There was a problem creating your expense.');
      throw new Error('There was a problem creating your expense.'); // You can log this as needed
    }
  }

  if (_action === 'deleteExpense') {
    try {
      await deleteItem({ key: 'expenses', id: values.expenseId }); // Use specific delete function
      toast.success('Expense deleted!');
    } catch (error) {
      toast.error('There was a problem deleting your expense.');
      throw new Error('There was a problem deleting your expense.'); // You can log this as needed
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{ '--accent': budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>{budget.name} Expenses</h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      ) : (
        <p>No expenses recorded for this budget.</p> // User-friendly message when there are no expenses
      )}
    </div>
  );
};

export default BudgetPage;
