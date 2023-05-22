import React from "react";
import "./reports.scss";
import { Link } from "react-router-dom";
import instance from "../../instance";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Button from "@mui/material/Button";
import Reportstable from "../../components/reportstable/Reportstable";
import PageTitle from "../../components/pageTitle/PageTitle";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = React.useState([]);

  const cancelToken = axios.CancelToken.source();

  function handleViewClick() {}

  React.useEffect(() => {
    instance
      .get(`/api/report/monthly/all`, { cancelToken: cancelToken.token })
      .then((response) => {
        setReports(response.data);
        console.log("reposrts: ", response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("reports request canceled");
        } else {
          console.log(err);
        }
      });
  }, []);

  const columns = [
    { field: "gardenName", headerName: "Garden name", width: 150 },
    { field: "reporter", headerName: "Reporter", width: 200 },
    { field: "reportNumber", headerName: "Report number", width: 150 },
    { field: "date", headerName: "Date", width: 250 },
    {
      field: "Action",
      headerName: "actions",
      width: 250,
      renderCell: (cellValues) => {
        return (
          <div className="cellAction">
            <Button
              onClick={handleViewClick}
              size="small"
              variant="outlined"
              style={{
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              View
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
        <PageTitle title={"Issued Reports"} />
        <div className="createButtons">
          <Link
            to="/reports/create/monthly"
            style={{ textDecoration: "none" }}
            className="link"
          >
            <Button
              size="small"
              variant="contained"
              style={{
                backgroundColor: "#1dbf73",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              Create monthly report
            </Button>
          </Link>
        </div>
        <Reportstable columns={columns} items={reports} />
      </div>
    </div>
  );
};

export default Reports;
