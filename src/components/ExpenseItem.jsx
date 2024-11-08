import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { formatCurrency, formatDateToLocaleString } from '../helpers';

const ExpenseItem = ({ expense, showBudget, onDelete }) => {
  return (
    <tr>
      <td>{expense.name || 'Unnamed Expense'}</td>
      <td>{formatCurrency(expense.amount || 0)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>{expense.budgetId ? expense.budgetId.name : 'No Budget'}</td>
      )}
      <td>
        <button
          type="button"
          className="btn btn--warning"
          aria-label={`Delete ${expense.name || 'Unnamed Expense'}`}
          onClick={() => onDelete(expense._id)}
        >
          <TrashIcon width={20} />
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
