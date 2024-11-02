// src/components/Chart.jsx
import React from 'react';

const Chart = ({ type, data }) => {
  // Render the chart based on the type and data
  return (
    <div className={`chart ${type}`}>
      {/* Implement chart rendering logic here */}
      <p>{`Rendering a ${type} chart`}</p>
    </div>
  );
};

export default Chart; // Make sure this line is included
