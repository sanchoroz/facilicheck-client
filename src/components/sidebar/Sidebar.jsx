import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeckIcon from '@mui/icons-material/Deck';
import AttractionsIcon from '@mui/icons-material/Attractions';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupIcon from '@mui/icons-material/Group';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Logo</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">MAINTENANCE</p>
          <Link to="/gardens" style={{ textDecoration: 'none' }}>
            <li>
              <AttractionsIcon className="icon" />
              <span>Gardens</span>
            </li>
          </Link>
          <Link to="/facilities" style={{ textDecoration: 'none' }}>
            <li>
              <DeckIcon className="icon" />
              <span>Facilities</span>
            </li>
          </Link>
          <Link to="/reports" style={{ textDecoration: 'none' }}>
            <li>
              <QueryStatsIcon className="icon" />
              <span>Reports</span>
            </li>
          </Link>
          <p className="title">SERVICE</p>
          <li>
            <QueryStatsIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <GroupIcon className="icon" />
            <span>Users</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
