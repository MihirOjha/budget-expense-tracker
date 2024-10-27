// Wait helper function
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// General API fetch function with error handling
export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/${endpoint}`,
      options,
    );
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
    console.warn('Invalid or missing userId, cannot fetch username.');
    return null; // Return null if userId is invalid
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
  const response = await fetch('/api/budgets');

  if (!response.ok) {
      const errorText = await response.text(); // Get the response text for debugging
      console.error('Error fetching budgets:', errorText);
      throw new Error(`Failed to fetch budgets: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Fetched budgets:', data); // Log fetched budgets
  return data;
};

// Fetch expenses
export const fetchExpenses = async () => {
  try {
    const response = await apiFetch('expenses');
    if (!Array.isArray(response))
      throw new Error('Invalid data format for expenses');
    return response;
  } catch (error) {
    console.error('Failed to fetch expenses:', error);
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
    return response;
  } catch (error) {
    console.error(`Error deleting item with id ${id} from ${key}:`, error);
    throw error;
  }
};

// Calculate total spent by budget
export const calculateSpentByBudget = async (budgetId) => {
  try {
    const expenses = await fetchExpenses();
    return expenses.reduce((acc, expense) => {
      return expense.budgetId === budgetId ? acc + expense.amount : acc;
    }, 0);
  } catch (error) {
    console.error('Error calculating spent by budget:', error);
    throw error;
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
