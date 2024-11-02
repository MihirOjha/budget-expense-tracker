// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
//import './Sidebar.css'; // Add styles here

const Sidebar = () => (
  <div className="sidebar">
    <Link to="/">Dashboard</Link>
    <Link to="/budgets">Budgets</Link>
    <Link to="/expenses">Expenses</Link>
    <Link to="/income">Income</Link>
  </div>
);

export default Sidebar;
