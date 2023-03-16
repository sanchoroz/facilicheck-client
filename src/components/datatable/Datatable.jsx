import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './datatable.scss';
import Button from '@mui/material/Button';

const Datatable = ({ columns, items, type }) => {
  const url = type === 'facility' ? `/facilities/addFacility` : `/gardens/addGarden`;
  return (
    <div className="datatable" dir="rtl">
      <div className="datatableTitle">
        מתקני הגן
        <Link to={url} style={{ textDecoration: 'none' }} className="link">
          <Button
            className="datatableTitle"
            size="small"
            variant="contained"
            style={{
              backgroundColor: '#1dbf73',
              fontSize: '12px',
              textDecoration: 'none',
            }}>
            צור מתקן חדש
          </Button>
        </Link>
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

export default Datatable;
