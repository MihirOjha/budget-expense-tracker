// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/budgets`,
      );
      setBudgets(response.data);
    } catch (error) {
      console.error(
        'Error fetching budgets:',
        error.response ? error.response.data : error.message,
      );
      toast.error('Error fetching budgets');
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/expenses`,
      );
      setExpenses(response.data);
    } catch (error) {
      console.error(
        'Error fetching expenses:',
        error.response ? error.response.data : error.message,
      );
      toast.error('Error fetching expenses');
    }
  };

  const handleExpenseCreated = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleBudgetCreated = (newBudget) => {
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
  };

  return (
    <div className="dashboard">
      <h1>
        Welcome back, <span className="accent">User</span>
      </h1>
      <div className="grid-lg">
        <div className="flex-lg">
          <AddBudgetForm onBudgetCreated={handleBudgetCreated} />
          <AddExpenseForm
            budgets={budgets}
            onExpenseCreated={handleExpenseCreated}
          />
        </div>
      </div>
      {budgets.length > 0 ? (
        <>
          <h2>Existing Budgets</h2>
          <div className="budgets">
            {budgets.map((budget) => (
              <BudgetItem
                key={budget._id}
                budget={budget}
                expenses={expenses}
              />
            ))}
          </div>
          {expenses.length > 0 && (
            <div className="grid-md">
              <h2>Recent Expenses</h2>
              <ul>
                {expenses.slice(0, 8).map((expense) => (
                  <li key={expense._id}>
                    {expense.name}: ${expense.amount}
                  </li>
                ))}
              </ul>
              {expenses.length > 8 && (
                <a href="/expenses" className="btn btn--dark">
                  View all expenses
                </a>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="grid-sm">
          <p>Create a budget to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
