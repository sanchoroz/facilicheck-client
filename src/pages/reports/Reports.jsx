import React from 'react';
import './reports.scss';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import CreateGarden from '../add/CreateGarden';
import Navbar from '../../components/navbar/Navbar';
import Button from '@mui/material/Button';
import Reportstable from '../../components/reportstable/Reportstable';

const Reports = () => {
  const [reports, setReports] = React.useState([]);

  function handleButtonClick() {}

  React.useEffect(() => {
    instance.get(`/api/report/monthly/all`).then((response) => {
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
              onClick={handleButtonClick}
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
        <Reportstable columns={columns} items={reports} />
      </div>
    </div>
  );
};

export default Reports;
