import React from "react";
import "./facilities.scss";
import instance from "../../instance";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FacilityCard from "../../components/facilityCard/FacilityCard";
import Button from "@mui/material/Button";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";

const Facilities = () => {
  const [facilities, setFacilities] = React.useState([]);

  const cancelToken = axios.CancelToken.source();

  React.useEffect(() => {
    instance
      .get(`/api/facility/facilities`, { cancelToken: cancelToken.token })
      .then((response) => {
        setFacilities(response.data);
        console.log("facilities", response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Facilities request canceled");
        } else {
          console.log(err);
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  function handleDelete(componentId) {
    setFacilities((prevState) =>
      prevState.filter((component) => component._id !== componentId)
    );
  }

  return (
    <div className="facilities">
      <Sidebar />
      <div className="facilitiesContainer">
        <Navbar />
        <PageTitle title={"Facilities"} />
        <div className="facilityTitle">
          <Link
            to="/facilities/create"
            style={{ textDecoration: "none" }}
            className="link"
          >
            <Button
              className="createButton"
              size="small"
              variant="contained"
              style={{
                backgroundColor: "#1dbf73",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              Create new facility
            </Button>
          </Link>
        </div>

        <div className="cardsContainer">
          {facilities &&
            facilities.map((item, index) => (
              <FacilityCard key={index} facility={item} onDelete={handleDelete}>
                {item.siteName}
              </FacilityCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
