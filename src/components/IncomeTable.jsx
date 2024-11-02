// src/components/IncomeTable.jsx
import React from 'react';
import IncomeItem from './IncomeItem';

const IncomeTable = ({ income, onDelete }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {income.map((income) => (
            <tr key={income._id}>
              <IncomeItem
                income={income}
                onDelete={onDelete} // Pass the onDelete prop here
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeTable;
