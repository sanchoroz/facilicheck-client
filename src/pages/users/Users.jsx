import React from 'react';
import './users.scss';
import { Link } from 'react-router-dom';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Button from '@mui/material/Button';
import Datatable from '../../components/datatable/Datatable';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = React.useState([]);

  const cancelToken = axios.CancelToken.source();

  React.useEffect(() => {
    instance
      .get(`/api/auth/users`, { cancelToken: cancelToken.token })
      .then((response) => {
        setUsers(response.data);
        console.log('users: ', response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('users request cancelled');
        } else {
          console.log(err);
        }
      });
  }, []);

  const columns = [
    { field: 'email', headerName: 'שם משתמש', width: 150 },
    { field: 'name', headerName: 'שם', width: 150 },
    { field: 'roles', headerName: 'תפקיד', width: 200 },
    { field: 'registrationDate', headerName: 'נרשם', width: 150 },
  ];

  return (
    <div className="reports" dir="rtl">
      <Sidebar />
      <div className="reportsContainer">
        <Navbar />
        <div className="reportstableTitle">
          <div className="right">
            <Link to="/users/create/" style={{ textDecoration: 'none' }} className="link">
              <Button
                size="small"
                variant="contained"
                style={{
                  backgroundColor: '#1dbf73',
                  fontSize: '12px',
                  textDecoration: 'none',
                }}>
                ליצור משתמש
              </Button>
            </Link>
          </div>
        </div>
        <Datatable columns={columns} items={users} />
      </div>
    </div>
  );
};

export default Users;
