// rrd imports
import { useLoaderData } from 'react-router-dom';

// library import
import { toast } from 'react-toastify';

// component imports
import Table from '../components/Table';

// helpers
import { deleteItem, fetchExpenses } from '../helpers';

// loader
export async function expensesLoader() {
  const expenses = await fetchExpenses(); // Await the fetchExpenses function
  return { expenses };
}

// action
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'deleteExpense') {
    try {
      await deleteItem({
        // Await the deleteItem function
        key: 'expenses',
        id: values.expenseId,
      });
      toast.success('Expense deleted!'); // Move toast success outside of the return statement
    } catch (e) {
      toast.error('There was a problem deleting your expense.'); // Show error toast
      throw new Error('There was a problem deleting your expense.');
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
