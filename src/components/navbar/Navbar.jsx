import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { selectIsAuth, logout } from '../../redux/slices/auth';
import Button from '@mui/material/Button';
import './navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {isAuth ? (
            <>
              <Button onClick={onClickLogout} size="small" variant="contained">
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="small" variant="contained">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
