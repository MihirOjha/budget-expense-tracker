// src/components/AddBudgetForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

const AddBudgetForm = ({ onBudgetCreated }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const formRef = useRef(null);
  const focusRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/budgets`;

    try {
      const response = await axios.post(apiUrl, { name, amount });

      // Budget created successfully
      toast.success('Budget created successfully!');
      setName('');
      setAmount('');

      // Call the callback function with the created budget
      if (onBudgetCreated) {
        onBudgetCreated(response.data.budget); // Assuming your response contains the budget data
      }
    } catch (error) {
      if (error.response) {
        toast.error('Failed to create budget: ' + error.response.data.message);
      } else {
        toast.error('Failed to create budget: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <form className="add-budget-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="budgetName">Budget Name</label>
          <input
            type="text"
            id="budgetName"
            placeholder="e.g., Groceries"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={focusRef}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="budgetAmount">Amount</label>
          <input
            type="number"
            id="budgetAmount"
            placeholder="e.g., $350"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Budget'}
          <CurrencyDollarIcon width={20} />
        </button>
      </form>
    </div>
  );
};

export default AddBudgetForm;
