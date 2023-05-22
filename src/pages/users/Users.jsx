import React from "react";
import "./users.scss";
import { Link } from "react-router-dom";
import instance from "../../instance";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Button from "@mui/material/Button";
import Datatable from "../../components/datatable/Datatable";
import axios from "axios";
import PageTitle from "../../components/pageTitle/PageTitle";

const Users = () => {
  const [users, setUsers] = React.useState([]);

  const cancelToken = axios.CancelToken.source();

  React.useEffect(() => {
    instance
      .get(`/api/auth/users`, { cancelToken: cancelToken.token })
      .then((response) => {
        setUsers(response.data);
        console.log("users: ", response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("users request cancelled");
        } else {
          console.log(err);
        }
      });
  }, []);

  const columns = [
    { field: "email", headerName: "email", width: 250 },
    { field: "name", headerName: "name", width: 250 },
    { field: "roles", headerName: "role", width: 200 },
    { field: "registrationDate", headerName: "registration date", width: 250 },
  ];

  return (
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <PageTitle title={"Users"} />
        <div className="createUser">
          <Link
            to="/users/create/"
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
              Create user
            </Button>
          </Link>
        </div>
        <Datatable columns={columns} items={users} />
      </div>
    </div>
  );
};

export default Users;
