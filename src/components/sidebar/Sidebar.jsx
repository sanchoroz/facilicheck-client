import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeckIcon from '@mui/icons-material/Deck';
import AttractionsIcon from '@mui/icons-material/Attractions';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupIcon from '@mui/icons-material/Group';

const Sidebar = () => {
  return (
    <div className="sidebar" dir="rtl">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src="https://static.wixstatic.com/media/2358ad_d486ae5670a5445495c0a1cf3865d3b0~mv2.png"
            alt="logo facilicheck"
            width={110}
          />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">ראשי</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className="icon" />
              <span>לוח מחוונים</span>
            </li>
          </Link>
          <p className="title">כללי</p>
          <Link to="/gardens" style={{ textDecoration: 'none' }}>
            <li>
              <AttractionsIcon className="icon" />
              <span>גנים</span>
            </li>
          </Link>
          <Link to="/facilities" style={{ textDecoration: 'none' }}>
            <li>
              <DeckIcon className="icon" />
              <span>מתקנים</span>
            </li>
          </Link>
          <Link to="/reports" style={{ textDecoration: 'none' }}>
            <li>
              <QueryStatsIcon className="icon" />
              <span>דוחות</span>
            </li>
          </Link>
          <p className="title">שרות</p>
          <li>
            <QueryStatsIcon className="icon" />
            <span>לוגים</span>
          </li>
          <Link to="/users" style={{ textDecoration: 'none' }}>
            <li>
              <GroupIcon className="icon" />
              <span>משתמשים</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
