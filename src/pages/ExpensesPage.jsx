import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import { toast } from 'react-toastify';
import ConfirmModal from '../components/ConfirmModal';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/expenses`,
        );
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        toast.error('Error fetching expenses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = (id) => {
    setExpenseToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/expenses/${expenseToDelete}`,
      );
      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== expenseToDelete),
      );
      toast.success('Expense deleted successfully!');
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Error deleting expense. Please try again later.');
    } finally {
      setIsModalOpen(false);
      setExpenseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setExpenseToDelete(null);
  };

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table expenses={expenses} onDelete={handleDelete} />
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default ExpensePage;
