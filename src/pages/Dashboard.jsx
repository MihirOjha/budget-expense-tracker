// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetList from '../components/BudgetList';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('https://budget-expense-tracker-backend.onrender.com/api/budgets');
      setBudgets(response.data);
    } catch (error) {
      toast.error('Error fetching budgets');
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('https://budget-expense-tracker-backend.onrender.com/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      toast.error('Error fetching expenses');
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>Budget Tracker</h1>
      <AddBudgetForm />
      <AddExpenseForm budgets={budgets} />
      <BudgetList budgets={budgets} />
    </div>
  );
};

export default Dashboard;
