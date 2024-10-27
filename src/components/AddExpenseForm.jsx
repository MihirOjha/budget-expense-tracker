// src/components/AddExpenseForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddExpenseForm = ({ budgets }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetId, setBudgetId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/expenses', {
        name,
        amount,
        budgetId,
      });
      toast.success('Expense added successfully!');
      setName('');
      setAmount('');
      setBudgetId('');
    } catch (error) {
      toast.error('Failed to add expense: ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={budgetId} onChange={(e) => setBudgetId(e.target.value)} required>
        <option value="">Select Budget</option>
        {budgets.map((budget) => (
          <option key={budget._id} value={budget._id}>
            {budget.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
