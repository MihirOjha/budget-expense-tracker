// src/components/BudgetList.jsx
import React from 'react';

const BudgetList = ({ budgets }) => {
  return (
    <div>
      <h2>Budgets</h2>
      {budgets.map((budget) => (
        <div key={budget._id}>
          <h3>{budget.name}</h3>
          <p>Amount: ${budget.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default BudgetList;
