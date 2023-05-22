import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./reportstable.scss";

const Reportstable = ({ columns, items }) => {
  return (
    <div className="reportstable">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={items}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          getRowId={(items) => items._id}
          autoHeight={true}
        />
      </div>
    </div>
  );
};

export default Reportstable;
