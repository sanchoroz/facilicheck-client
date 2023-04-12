import React from 'react';
import './reports.scss';
import { Link } from 'react-router-dom';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Button from '@mui/material/Button';
import Reportstable from '../../components/reportstable/Reportstable';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = React.useState([]);

  const cancelToken = axios.CancelToken.source();

  function handleViewClick() {}

  React.useEffect(() => {
    instance
      .get(`/api/report/monthly/all`, { cancelToken: cancelToken.token })
      .then((response) => {
        setReports(response.data);
        console.log('reposrts: ', response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('reports request canceled');
        } else {
          console.log(err);
        }
      });
  }, []);

  const columns = [
    { field: 'gardenName', headerName: 'שם הגן', width: 150 },
    { field: 'reporter', headerName: 'מדווח', width: 200 },
    { field: 'reportNumber', headerName: 'מספר דוח', width: 150 },
    { field: 'date', headerName: 'תאריך', width: 250 },
    {
      field: 'action',
      headerName: 'פעולות',
      width: 250,
      renderCell: (cellValues) => {
        return (
          <div className="cellAction">
            <Button
              onClick={handleViewClick}
              size="small"
              variant="outlined"
              style={{
                fontSize: '12px',
                textDecoration: 'none',
              }}>
              צפיה
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="reports" dir="rtl">
      <Sidebar />
      <div className="reportsContainer">
        <Navbar />
        <div className="reportstableTitle">
          <div className="left">דוחות שהונפקו</div>
          <div className="right">
            <Link to="/reports/create/monthly" style={{ textDecoration: 'none' }} className="link">
              <Button
                size="small"
                variant="contained"
                style={{
                  backgroundColor: '#1dbf73',
                  fontSize: '12px',
                  textDecoration: 'none',
                }}>
                צור דוח חודשי
              </Button>
            </Link>
            <Link to="/reports/create/yearly" style={{ textDecoration: 'none' }} className="link">
              <Button
                size="small"
                variant="contained"
                style={{
                  backgroundColor: '#1dbf73',
                  fontSize: '12px',
                  textDecoration: 'none',
                }}>
                צור דוח שנתי
              </Button>
            </Link>
          </div>
        </div>
        <Reportstable columns={columns} items={reports} />
      </div>
    </div>
  );
};

export default Reports;
