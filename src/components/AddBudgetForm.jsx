// src/components/AddBudgetForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddBudgetForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://budget-expense-tracker-backend.onrender.com/api/budgets', {
        name,
        amount,
      });
      toast.success('Budget created successfully!');
      setName('');
      setAmount('');
    } catch (error) {
      toast.error('Failed to create budget: ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Budget Name"
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
      <button type="submit">Add Budget</button>
    </form>
  );
};

export default AddBudgetForm;
