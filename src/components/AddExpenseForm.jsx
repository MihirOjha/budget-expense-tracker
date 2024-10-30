import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

const AddExpenseForm = ({ budgets, onExpenseCreated }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetId, setBudgetId] = useState('');
  const formRef = useRef(null);
  const focusRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSubmitting) {
      focusRef.current.focus(); // Keep focus on the input after submission
    }
  }, [isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/expenses`;

    try {
      const response = await axios.post(apiUrl, { name, amount, budgetId });

      console.log('Response from API:', response.data); // Check the response

      if (response.data && response.data.expense) {
        // Call the handler with the new expense
        onExpenseCreated(response.data.expense);
        toast.success('Expense created successfully!');

        // Reset the form fields
        setName('');
        setAmount('');
        setBudgetId('');
      } else {
        throw new Error('No data returned from the server');
      }
    } catch (error) {
      toast.error(
        'Failed to create expense: ' +
          (error.response?.data?.message || error.message),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add Expense</h2>
      <form className="add-expense-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="expenseName">Expense Name</label>
          <input
            type="text"
            id="expenseName"
            placeholder="e.g., Rent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={focusRef}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="expenseAmount">Amount</label>
          <input
            type="number"
            id="expenseAmount"
            placeholder="e.g., $1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="budgetSelect">Budget</label>
          <select
            id="budgetSelect"
            value={budgetId}
            onChange={(e) => setBudgetId(e.target.value)}
            required
          >
            <option value="">Select Budget</option>
            {budgets.map((budget) => (
              <option key={budget._id} value={budget._id}>
                {budget.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Expense'}
          <CurrencyDollarIcon width={20} />
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
