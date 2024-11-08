import React from 'react';
import NavLinks from './Navlinks'; // Make sure to use the correct import

const Sidebar = ({ isCollapsed, sidebarRef }) => {
  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
    >
      <nav>
        <NavLinks />
      </nav>
    </div>
  );
};

export default Sidebar;
