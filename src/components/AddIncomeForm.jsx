import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

const AddIncomeForm = ({ onIncomeCreated }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const formRef = useRef(null);
  //const focusRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      //focusRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/income`;

    try {
      const response = await axios.post(apiUrl, { source, amount });

      // Income created successfully
      toast.success('Income added successfully!');
      setSource('');
      setAmount('');

      // Call the callback function with the created income
      if (onIncomeCreated) {
        onIncomeCreated(response.data.income); // Assuming your response contains the income data
      }
    } catch (error) {
      if (error.response) {
        toast.error('Failed to add income: ' + error.response.data.message);
      } else {
        toast.error('Failed to add income: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add Income</h2>
      <form className="add-income-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="incomeSource">Income Source</label>
          <input
            type="text"
            id="incomeSource"
            placeholder="e.g., Salary"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            //ref={focusRef}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="incomeAmount">Amount</label>
          <input
            type="number"
            id="incomeAmount"
            placeholder="e.g., $2000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add Income'}
            <CurrencyDollarIcon width={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncomeForm;
