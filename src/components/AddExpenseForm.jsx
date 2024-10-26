// React imports
import { useEffect, useRef } from 'react';

// RRD imports
import { useFetcher } from 'react-router-dom';
import { toast } from 'react-toastify'; // Ensure toast is imported

// Library imports
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();

      if (fetcher.data && fetcher.data.error) {
        toast.error(fetcher.data.error); // Show error if any
      } else if (fetcher.data && fetcher.data.success) {
        toast.success('Expense added successfully!'); // Show success message
      }
    }
  }, [isSubmitting, fetcher.data]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{' '}
        <span className="accent">
          {budgets.length === 1 ? budgets[0].name : 'Expense'}{' '}
          {/* Corrected to display the single budget name */}
        </span>
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Use new Date for proper sorting
              .map((budget) => (
                <option key={budget._id} value={budget._id}>
                  {' '}
                  {/* Use _id for MongoDB */}
                  {budget.name}
                </option>
              ))}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
