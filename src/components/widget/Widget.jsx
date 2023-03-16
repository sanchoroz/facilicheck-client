import React from 'react';
import { Link } from 'react-router-dom';
import './widget.scss';
import Paper from '@mui/material/Paper';

const Widget = ({ type, amount }) => {
  let data = {};

  switch (type) {
    case 'users':
      data = {
        title: 'משתמשים',
        amount: amount.length,
        linkText: 'צפה כל המשתמשים',
        link: '/users',
      };
      break;
    case 'gardens':
      data = {
        title: 'גנים',
        amount: amount.length,
        linkText: 'צפה בכל הגנים',
        link: '/gardens',
      };
      break;
    case 'facilities':
      data = {
        title: 'מתקנים',
        amount: amount.length,
        linkText: 'צפה בכל המתקנים',
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
