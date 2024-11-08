import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './pages/DashboardOverview';
import Budgets from './pages/BudgetPage';
import Expenses from './pages/ExpensesPage';
import Income from './pages/IncomePage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsCollapsed(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <Router>
      <ToastContainer />
      <div className="app">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isCollapsed={isCollapsed} sidebarRef={sidebarRef} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/income" element={<Income />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
