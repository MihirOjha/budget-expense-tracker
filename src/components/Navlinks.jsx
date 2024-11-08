// src/components/NavLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => (
  <>
    <Link to="/">Dashboard</Link>
    <Link to="/budgets">Budgets</Link>
    <Link to="/expenses">Expenses</Link>
    <Link to="/income">Income</Link>
  </>
);

export default NavLinks;
