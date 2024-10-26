// rrd import
import { redirect } from 'react-router-dom';

// library
import { toast } from 'react-toastify';

// helpers
import { deleteItem, fetchExpenses } from '../helpers';

export async function deleteBudget({ params }) {
  try {
    // Delete the budget
    await deleteItem({
      key: 'budgets',
      id: params.id,
    });

    // Fetch associated expenses
    const associatedExpenses = await fetchExpenses(); // Fetching all expenses

    // Filter expenses that are associated with the budget being deleted
    const expensesToDelete = associatedExpenses.filter(
      (expense) => expense.budgetId === params.id,
    );

    // Delete associated expenses
    await Promise.all(
      expensesToDelete.map((expense) =>
        deleteItem({
          key: 'expenses',
          id: expense.id,
        }),
      ),
    );

    toast.success('Budget deleted successfully!');
  } catch (e) {
    toast.error('There was a problem deleting your budget.'); // Change to toast on error
    console.error(e); // Log error for debugging
  }
  return redirect('/');
}
