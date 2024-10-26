// rrd imports
import { Link, useFetcher } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';
import {
  formatCurrency,
  formatDateToLocaleString,
  fetchBudgets,
} from '../helpers';
import { useEffect, useState } from 'react';

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgetData = async () => {
      setLoading(true); // Start loading
      try {
        const budgets = await fetchBudgets(); // Fetch budgets
        const foundBudget = budgets.find((b) => b._id === expense.budgetId); // Find budget by ID
        setBudget(foundBudget);
      } catch (error) {
        console.error('Error fetching budget:', error);
        setBudget(null); // Error handling
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchBudgetData();
  }, [expense.budgetId]); // Depend on budgetId

  if (loading) {
    return <td colSpan={showBudget ? 4 : 3}>Loading...</td>; // Loading state
  }

  return (
    <>
      <td>{expense.name || 'Unnamed Expense'}</td>
      <td>{formatCurrency(expense.amount || 0)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && budget && (
        <td>
          <Link
            to={`/budget/${budget._id}`} // Link to budget detail
            style={{
              '--accent': budget.color || '#000', // Default color for budget
            }}
          >
            {budget.name || 'Unnamed Budget'}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense._id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name || 'Unnamed Expense'} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
