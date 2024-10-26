// testFetch.js
import { apiFetch } from './src/helpers.js';

const testApiFetch = async () => {
  try {
    const budgets = await apiFetch('budgets');
    console.log('Fetched budgets:', budgets);
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

testApiFetch();
