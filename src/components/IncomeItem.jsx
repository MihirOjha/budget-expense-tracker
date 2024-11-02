// src/components/IncomeItem.jsx
import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { formatCurrency, formatDateToLocaleString } from '../helpers';

const IncomeItem = ({ income, onDelete }) => {
  return (
    <>
      <td>{income.source || 'Unnamed Income'}</td>
      <td>{formatCurrency(income.amount || 0)}</td>
      <td>{formatDateToLocaleString(income.createdAt)}</td>
      <td>
        <button
          type="button"
          className="btn btn--warning"
          aria-label={`Delete ${income.source || 'Unnamed Income'}`}
          onClick={() => onDelete(income._id)} // This calls the delete function
        >
          <TrashIcon width={20} />
        </button>
      </td>
    </>
  );
};

export default IncomeItem;
