import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetItem from '../components/BudgetItem';
import AddBudgetForm from '../components/AddBudgetForm';
import { toast } from 'react-toastify';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgetsAndExpenses = async () => {
      try {
        const budgetsResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/budgets`,
        );
        const expensesResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/expenses`,
        );
        setBudgets(budgetsResponse.data);
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.error('Error fetching budgets and expenses:', error);
        toast.error(
          'Error fetching budgets and expenses. Please try again later.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetsAndExpenses();
  }, []);

  const handleBudgetCreated = (newBudget) => {
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
  };

  return (
    <div className="budget-page">
      <h1>Budgets</h1>
      <AddBudgetForm onBudgetCreated={handleBudgetCreated} />
      {loading ? (
        <div className="spinner"></div>
      ) : budgets.length > 0 ? (
        <div className="budget-list">
          {budgets.map((budget) => (
            <BudgetItem key={budget._id} budget={budget} expenses={expenses} />
          ))}
        </div>
      ) : (
        <p>No budgets found. Create a budget to get started!</p>
      )}
    </div>
  );
};

export default Budgets;
