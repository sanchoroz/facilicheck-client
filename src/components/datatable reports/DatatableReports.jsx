import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './datatable-reports.scss';

const DatatableReports = ({ columns, items }) => {
  return (
    <div className="datatableReports">
      <div style={{ height: 300, width: '100%' }}>
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

export default DatatableReports;
