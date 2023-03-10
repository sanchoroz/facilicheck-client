import React from 'react';
import { Link } from 'react-router-dom';
import './widget.scss';
import Paper from '@mui/material/Paper';

const Widget = ({ type, amount }) => {
  let data = {};

  switch (type) {
    case 'users':
      data = {
        title: 'Users',
        amount: amount.length,
        linkText: 'See All Users',
        link: '/users',
      };
      break;
    case 'gardens':
      data = {
        title: 'Gardens',
        amount: amount.length,
        linkText: 'See All Gardens',
        link: '/gardens',
      };
      break;
    case 'facilities':
      data = {
        title: 'Facilities',
        amount: amount.length,
        linkText: 'See All Facilities',
        link: '/facilities',
      };
      break;
    default:
      break;
  }
  return (
    <Paper elevation={2} classes={{ root: 'widget' }}>
      <div className="center">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <span className="link">
          <Link to={data.link} style={{ textDecoration: 'none' }}>
            {data.linkText}
          </Link>
        </span>
      </div>
    </Paper>
  );
};

export default Widget;
