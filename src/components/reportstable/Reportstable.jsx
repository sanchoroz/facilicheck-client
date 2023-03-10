import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import './reportstable.scss';

const Reportstable = ({ columns, items }) => {
  return (
    <div className="reportstable">
      <div className="reportstableTitle">
        <div className="left">Listed Reports</div>
        <div className="right">
          <Link to="/reports/create/monthly" style={{ textDecoration: 'none' }} className="link">
            <Button
              size="small"
              variant="contained"
              style={{
                backgroundColor: 'green',
                fontSize: '12px',
                textDecoration: 'none',
              }}>
              Add New Monthly Report
            </Button>
          </Link>
          <Link to="/reports/create/yearly" style={{ textDecoration: 'none' }} className="link">
            <Button
              size="small"
              variant="contained"
              style={{
                backgroundColor: 'green',
                fontSize: '12px',
                textDecoration: 'none',
              }}>
              Add New Yearly Report
            </Button>
          </Link>
        </div>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={items}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(items) => items._id}
        />
      </div>
    </div>
  );
};

export default Reportstable;
