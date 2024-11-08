import React from 'react';
import ExpenseItem from './ExpenseItem';

const Table = ({ expenses, showBudget = true, onDelete }) => {
  return (
    <div className="table">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            {showBudget && <th>Budget</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              showBudget={showBudget}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
