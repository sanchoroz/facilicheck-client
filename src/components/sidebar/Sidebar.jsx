import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeckIcon from "@mui/icons-material/Deck";
import AttractionsIcon from "@mui/icons-material/Attractions";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import GroupIcon from "@mui/icons-material/Group";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
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
          <p className="title">Main</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">General</p>
          <Link to="/gardens" style={{ textDecoration: "none" }}>
            <li>
              <AttractionsIcon className="icon" />
              <span>Gardens</span>
            </li>
          </Link>
          <Link to="/facilities" style={{ textDecoration: "none" }}>
            <li>
              <DeckIcon className="icon" />
              <span>Facilities</span>
            </li>
          </Link>
          <Link to="/reports" style={{ textDecoration: "none" }}>
            <li>
              <QueryStatsIcon className="icon" />
              <span>Reports</span>
            </li>
          </Link>
          <p className="title">Service</p>
          <li>
            <QueryStatsIcon className="icon" />
            <span>Logs</span>
          </li>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
