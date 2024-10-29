import { useEffect, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { BanknotesIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '../helpers'; // Removed calculateSpentByBudget import since it's no longer needed

const BudgetItem = ({ budget, expenses, showDelete = false }) => {
  const { _id, name = 'Unnamed Budget', amount = 0, color = '#000' } = budget;
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    const totalSpent = expenses
      .filter((expense) => expense.budgetId === _id)
      .reduce((total, expense) => total + expense.amount, 0);

    setSpent(totalSpent);
  }, [expenses, _id]); // Recalculate spent whenever expenses or budgetId change

  return (
    <div className="budget" style={{ '--accent': color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent} />
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  'Are you sure you want to permanently delete this budget?',
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${_id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
