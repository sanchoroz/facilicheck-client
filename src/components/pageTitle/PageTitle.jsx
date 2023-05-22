import React from "react";
import Paper from "@mui/material/Paper";
import "./pageTitle.scss";

const PageTitle = ({ title }) => {
  return (
    <Paper elevation={1} className="pageTitle">
      <h1>{title}</h1>
    </Paper>
  );
};

export default PageTitle;
