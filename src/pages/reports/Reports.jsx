import React from 'react';
import './reports.scss';
import axios from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Button from '@mui/material/Button';
import Reportstable from '../../components/reportstable/Reportstable';

const Reports = () => {
  const [reports, setReports] = React.useState([]);

  function handleButtonClick() {}

  React.useEffect(() => {
    axios.get(`/api/report/monthly/all`).then((response) => {
      setReports(response.data);
      console.log('reports: ', reports);
    });
  }, []);

  React.useEffect(() => {
    if (reports) {
      console.log('reports: ', reports);
    }
  }, [reports]);

  const columns = [
    { field: 'gardenName', headerName: 'gardenName', width: 250 },
    { field: 'reporter', headerName: 'reporter', width: 200 },
    { field: 'reportNumber', headerName: 'reportNumber', width: 150 },
    { field: 'date', headerName: 'date', width: 250 },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (cellValues) => {
        return (
          <div className="cellAction">
            <Button
              onClick={handleButtonClick}
              size="small"
              variant="outlined"
              style={{
                fontSize: '12px',
                textDecoration: 'none',
              }}>
              PDF
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="reports">
      <Sidebar />
      <div className="reportsContainer">
        <Navbar />
        <Reportstable columns={columns} items={reports} />
      </div>
    </div>
  );
};

export default Reports;
