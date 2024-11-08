import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IncomeTable from '../components/IncomeTable';
import AddIncomeForm from '../components/AddIncomeForm';
import { toast } from 'react-toastify';
import ConfirmModal from '../components/ConfirmModal'; // Import ConfirmModal

const IncomePage = () => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState(null);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/income`,
        );
        setIncome(response.data);
      } catch (error) {
        console.error('Error fetching income:', error);
        toast.error('Error fetching income. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  const handleAddIncome = (newIncome) => {
    setIncome((prev) => [...prev, newIncome]);
  };

  const handleDelete = (id) => {
    setIncomeToDelete(id); // Set the income to delete
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/income/${incomeToDelete}`,
      );
      setIncome((prev) =>
        prev.filter((income) => income._id !== incomeToDelete),
      );
      toast.success('Income deleted successfully!');
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.error('Error deleting income. Please try again later.');
    } finally {
      setIsModalOpen(false); // Close the modal after confirmation
      setIncomeToDelete(null); // Reset the income to delete
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Just close the modal
    setIncomeToDelete(null); // Reset the income to delete
  };

  return (
    <div className="grid-lg">
      <h1>All Income</h1>
      <AddIncomeForm onIncomeCreated={handleAddIncome} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <IncomeTable income={income} onDelete={handleDelete} />
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default IncomePage;
