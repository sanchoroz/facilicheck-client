import React from "react";
import instance from "../../instance";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import PageTitle from "../../components/pageTitle/PageTitle";
import "./home.scss";
import axios from "axios";

const Home = () => {
  const [users, setUser] = React.useState([]);
  const [gardens, setGardens] = React.useState([]);
  const [facilities, setIFacilities] = React.useState([]);

  const cancelToken = axios.CancelToken.source();

  React.useEffect(() => {
    instance
      .get(`/api/auth/users`, { cancelToken: cancelToken.token })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("users request canceled");
        } else {
          console.log(err);
        }
      });

    instance
      .get(`/api/garden/gardens`, { cancelToken: cancelToken.token })
      .then((response) => {
        setGardens(response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("gardens request canceled");
        } else {
          console.log(err);
        }
      });

    instance
      .get(`/api/facility/facilities`, { cancelToken: cancelToken.token })
      .then((response) => {
        setIFacilities(response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("facilities request canceled");
        } else {
          console.log(err);
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <PageTitle title={"Home"} />
        <div className="widgets">
          <Widget type="users" amount={users} />
          <Widget type="gardens" amount={gardens} />
          <Widget type="facilities" amount={facilities} />
        </div>
      </div>
    </div>
  );
};

export default Home;
