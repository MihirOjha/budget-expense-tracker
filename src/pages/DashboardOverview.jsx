import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCard from '../components/SummaryCard';
import Chart from '../components/Chart';
import AddExpenseForm from '../components/AddExpenseForm';
import { toast } from 'react-toastify';

const DashboardOverview = () => {
  const [summary, setSummary] = useState({
    totalBudgets: 0,
    totalExpenses: 0,
    totalIncome: 0,
    remainingBalance: 0,
    expensesDistribution: [],
    incomeDistribution: [],
  });

  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryAndBudgets = async () => {
      try {
        const summaryResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/summary`,
        );
        const budgetsResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/budgets`,
        );

        setSummary(summaryResponse.data);
        setBudgets(budgetsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching summary or budgets data.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryAndBudgets();
  }, []);

  const handleExpenseCreated = (newExpense) => {
    setSummary((prevSummary) => ({
      ...prevSummary,
      totalExpenses: prevSummary.totalExpenses + newExpense.amount,
      remainingBalance: prevSummary.remainingBalance - newExpense.amount,
    }));
  };

  return (
    <div className="dashboard-overview">
      <h1>Dashboard</h1>
      <div className="summary-cards">
        <SummaryCard title="Total Budgets" value={summary.totalBudgets} />
        <SummaryCard title="Total Expenses" value={summary.totalExpenses} />
        <SummaryCard title="Total Income" value={summary.totalIncome} />
        <SummaryCard
          title="Remaining Balance"
          value={summary.remainingBalance}
        />
      </div>
      <div className="charts">
        <Chart type="pie" data={summary.expensesDistribution} />
        <Chart type="bar" data={summary.incomeDistribution} />
      </div>
      <div className="expense-form">
        <h2>Add New Expense</h2>
        <AddExpenseForm
          budgets={budgets}
          onExpenseCreated={handleExpenseCreated}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
