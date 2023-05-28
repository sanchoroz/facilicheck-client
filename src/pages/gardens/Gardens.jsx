import React from "react";
import "./gardens.scss";
import instance from "../../instance";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import GardenCard from "../../components/gardenCard/GardenCard";
import PageTitle from "../../components/pageTitle/PageTitle";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const Gardens = () => {
  const [gardens, setGardens] = React.useState([]);

  const cancelToken = axios.CancelToken.source();

  React.useEffect(() => {
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

    return () => {
      cancelToken.cancel();
    };
  }, []);

  function handleDelete(componentId) {
    setGardens((prevState) =>
      prevState.filter((component) => component._id !== componentId)
    );
  }

  return (
    <div className="gardens">
      <Sidebar />
      <div className="gardensContainer">
        <Navbar />
        <PageTitle title={"Gardens"} />
        <div className="gardensTitle">
          <Link
            to="/gardens/create"
            style={{ textDecoration: "none" }}
            className="link"
          >
            <Button
              className="createButton"
              size="small"
              data-cy="createGarden"
              variant="contained"
              style={{
                backgroundColor: "#1dbf73",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              Create new Garden
            </Button>
          </Link>
        </div>

        <div className="cardsContainer">
          {gardens &&
            gardens.map((item, index) => (
              <GardenCard key={index} garden={item} onDelete={handleDelete}>
                {item.siteName}
              </GardenCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Gardens;
