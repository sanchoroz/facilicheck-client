import React from "react";
import "./facilitycard.scss";
import instance from "../../instance";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

const FacilityCard = (props) => {
  const { facility, onDelete } = props;

  function handleDelete(event, facilityId) {
    let result = window.confirm("Do you want to delete Facility?");
    if (result) {
      instance.put(`/api/facility/delete/${facilityId}`).then((response) => {
        if (response.status === 200) {
          onDelete(facilityId);
        }
      });
    }
  }

  return (
    <>
      {facility && (
        <Card sx={{ width: 300 }} classes={{ root: "card" }}>
          <CardMedia
            component="img"
            alt="garden cover image"
            height="200"
            image={facility.imageUrl}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {facility.facilityName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              SKU: {facility.sku}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manufactorer: {facility.manufacturer}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Garden: {facility.garden.siteName}
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              to="/facility"
              state={{ stateParam: facility._id }}
              className="link"
            >
              <Button size="medium">View</Button>
            </Link>
            <Button size="medium">Reports</Button>
            <Button
              size="medium"
              onClick={(event) => {
                handleDelete(event, facility._id);
              }}
            >
              Delete
            </Button>
            {facility.isFailed && (
              <div className="failed">
                <Tooltip title="Facility is failed">
                  <NotificationImportantIcon className="icon" />
                </Tooltip>
              </div>
            )}
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default FacilityCard;
