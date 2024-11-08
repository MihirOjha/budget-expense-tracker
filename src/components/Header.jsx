import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/budgets':
        return 'Budgets';
      case '/expenses':
        return 'Expenses';
      case '/income':
        return 'Income';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="header">
      <h1>{getPageTitle()}</h1>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Header;
