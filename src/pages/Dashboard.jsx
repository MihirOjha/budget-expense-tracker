import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import ConfirmModal from '../components/ConfirmModal';
import Table from '../components/Table';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null); // Track which expense to delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetsResponse, expensesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/budgets`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/expenses`),
        ]);
        setBudgets(budgetsResponse.data);
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExpenseCreated = (newExpense) => {
    const foundBudget = budgets.find(
      (budget) => budget._id === newExpense.budgetId,
    );

    const updatedExpense = {
      ...newExpense,
      budgetId: foundBudget
        ? { _id: foundBudget._id, name: foundBudget.name }
        : null,
    };

    setExpenses((prevExpenses) => [...prevExpenses, updatedExpense]);
  };

  const handleBudgetCreated = (newBudget) => {
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
  };

  const handleOpenModal = (expenseId) => {
    setExpenseToDelete(expenseId); // Set the ID of the expense to delete
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmDelete = async () => {
    if (expenseToDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/expenses/${expenseToDelete}`,
        );
        setExpenses((prevExpenses) =>
          prevExpenses.filter((exp) => exp._id !== expenseToDelete),
        );
        toast.success('Expense deleted successfully!');
      } catch (error) {
        console.error('Error deleting expense:', error);
        toast.error('Failed to delete expense.');
      } finally {
        setIsModalOpen(false); // Close the modal
        setExpenseToDelete(null); // Clear the ID
      }
    }
  };

  return (
    <div className="dashboard">
      <h1>
        Welcome back, <span className="accent">Peeks</span>
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
      {loading ? (
        <div className="grid-sm">
          <p>Loading...</p>
        </div>
      ) : budgets.length > 0 ? (
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
              {expenses.length > 8 && (
                <a href="/expenses" className="btn btn--dark">
                  View all expenses
                </a>
              )}
              <h2>All Expenses</h2>
              <Table
                expenses={expenses}
                showBudget={true}
                onDelete={handleOpenModal} // Change this to open the modal
              />
            </div>
          )}
        </>
      ) : (
        <div className="grid-sm">
          <p>Create a budget to get started!</p>
        </div>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)} // Close the modal without deleting
      />
    </div>
  );
};

export default Dashboard;
