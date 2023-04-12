import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './datatable.scss';
import Button from '@mui/material/Button';

const Datatable = ({ columns, items, type }) => {
  console.log('items: ', items);
  return (
    <>
      {items && (
        <div className="datatable" dir="rtl">
          <div className="datatableTitle"></div>
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
      )}
    </>
  );
};

export default Datatable;
