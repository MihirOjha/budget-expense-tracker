import axios from 'axios';

// Wait helper function
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// General API fetch function with error handling
export const apiFetch = async (endpoint, options = {}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(`Response for ${endpoint}:`, responseData);

    return responseData;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

// Fetch user by userId, with fallback if userId is invalid
export const fetchUserName = async (userId) => {
  if (!userId || userId === 'defaultUserId') {
    throw new Error('Invalid or missing userId'); // Throw error for better handling
  }
  try {
    const response = await apiFetch(`user/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching username:', error);
    return null; // Return null if there's an error in fetching username
  }
};

// Fetch budgets
export const fetchBudgets = async () => {
  return await apiFetch('budgets'); // Use apiFetch for consistency
};

// Fetch expenses
export const fetchExpenses = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/expenses`,
    );
    console.log('Fetched expenses:', response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

// Create budget with API call
export const createBudget = async ({ name, amount }) => {
  try {
    const response = await apiFetch('budgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, amount }),
    });
    return response;
  } catch (error) {
    console.error('Error creating budget:', error);
    throw error;
  }
};

// Create expense with API call
export const createExpense = async ({ name, amount, budgetId }) => {
  try {
    const response = await apiFetch('expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, amount, budgetId }),
    });
    return response;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

// Delete item from MongoDB
export const deleteItem = async ({ key, id }) => {
  try {
    const response = await apiFetch(`${key}/${id}`, {
      method: 'DELETE',
    });
    if (!response) {
      throw new Error(`Failed to delete item with id ${id}`);
    }
    return response;
  } catch (error) {
    console.error(`Error deleting item with id ${id} from ${key}:`, error);
    throw error;
  }
};

// Calculate total spent by budget
export const calculateSpentByBudget = async (budgetId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/expenses`,
    );
    const expenses = response.data.filter(
      (expense) => expense.budgetId.toString() === budgetId.toString(),
    );
    console.log(`Expenses for budget ${budgetId}:`, expenses);
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  } catch (error) {
    console.error('Error calculating spent amount:', error);
    return 0;
  }
};

// FORMATTING FUNCTIONS

// Format date to locale string
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

// Format percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: 'currency',
    currency: 'CAD',
  });
};
