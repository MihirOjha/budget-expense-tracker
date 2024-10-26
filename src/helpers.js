// Wait helper function
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// General API fetch function with error handling
export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/${endpoint}`,
      options,
    ); // Add full URL
    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }

    const responseData = await response.json(); // Directly get response as JSON
    console.log(`Response for ${endpoint}:`, responseData); // Log the raw response

    return responseData; // Return parsed JSON
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error; // Rethrow to handle it later
  }
};

// Fetch user by username
export const fetchUserName = async (username) => {
  try {
    const response = await apiFetch(`userName/${username}`);
    return response;
  } catch (error) {
    console.error('Error fetching username:', error);
    throw error;
  }
};
// Fetch budgets
export const fetchBudgets = async () => {
  try {
    const response = await apiFetch('budgets');
    console.log('Fetched budgets:', response); // Log the fetched budgets
    if (!Array.isArray(response))
      throw new Error('Invalid data format for budgets');
    return response;
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
    throw error;
  }
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
  return await apiFetch('budgets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, amount }),
  });
};

// Create expense with API call
export const createExpense = async ({ name, amount, budgetId }) => {
  return await apiFetch('expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, amount, budgetId }),
  });
};

// Delete item from MongoDB
export const deleteItem = async ({ key, id }) => {
  return await apiFetch(`${key}/${id}`, {
    method: 'DELETE',
  });
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
    throw error; // Handle errors in calculation
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
