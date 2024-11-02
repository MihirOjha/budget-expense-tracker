// src/components/Table.jsx
import ExpenseItem from './ExpenseItem';

const Table = ({ expenses, showBudget = true, onDelete }) => {
  return (
    <div className="table">
      <table>
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
            <tr key={expense._id}>
              <ExpenseItem
                expense={expense}
                showBudget={showBudget}
                onDelete={onDelete} // Ensure onDelete is passed here
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
