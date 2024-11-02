// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Import Sidebar
import DashboardOverview from './pages/DashboardOverview'; // New Overview page
import Budgets from './pages/BudgetPage';
import Expenses from './pages/ExpensesPage';
import Income from './pages/IncomePage';
//import Settings from './pages/Settings';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/expenses" element={<Expenses />} />\
            <Route path="/income" element={<Income />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
