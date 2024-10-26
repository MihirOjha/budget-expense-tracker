// React
import { useEffect, useRef } from 'react';

// Router imports
import { useFetcher } from 'react-router-dom';

// Helper imports
import { createBudget } from '../helpers'; // Ensure this is correctly linked to helpers.js

// Library imports
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      // Reset the form and focus the input after submission
      formRef.current.reset();
      focusRef.current.focus();

      // Display success or error message based on fetcher response
      if (fetcher.data && fetcher.data.error) {
        toast.error(fetcher.data.error);
      } else if (fetcher.data && fetcher.data.success) {
        toast.success('Budget created successfully!');
      }
    }
  }, [isSubmitting, fetcher.data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const budgetName = event.target.newBudget.value;
    const budgetAmount = parseFloat(event.target.newBudgetAmount.value);

    // Submitting the form data to the server
    fetcher.submit(
      { name: budgetName, amount: budgetAmount },
      { method: 'post', action: '/api/budgets' }, // Ensure this matches your API route
    );
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <form onSubmit={handleSubmit} className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBudgetForm;
