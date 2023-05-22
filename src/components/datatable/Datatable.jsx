import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss";

const Datatable = ({ columns, items, type }) => {
  console.log("items: ", items);
  return (
    <>
      {items && (
        <div className="datatable">
          <div className="datatableTitle"></div>
          <div style={{ height: 400, width: "100%" }}>
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
