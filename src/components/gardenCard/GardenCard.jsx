import React from "react";
import "./gardencard.scss";
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

const GardenCard = (props) => {
  const { garden, onDelete } = props;

  function handleDelete(event, gardenId) {
    let result = window.confirm(
      "Do you want to delete Garden? All related facilities will be deleted as well"
    );
    if (result) {
      instance.put(`/api/garden/delete/${gardenId}`).then((response) => {
        if (response.status === 200) {
          onDelete(gardenId);
        }
      });
    }
  }

  return (
    <>
      {garden && (
        <Card
          sx={{ width: 300 }}
          classes={{ root: "card" }}
          data-cy="gardenCard"
        >
          <CardMedia
            component="img"
            alt="garden cover image"
            height="200"
            image={garden.imageUrl}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              data-cy="gardenName"
            >
              {garden.siteName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              data-cy="gardenAddress"
            >
              Address: {garden.address}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              data-cy="gardenSerialNumber"
            >
              Serial number: {garden.serialNumber}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              data-cy="gardensQty"
            >
              Qty : {garden.facilities.length}
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              to="/garden"
              state={{ stateParam: garden._id }}
              className="link"
            >
              <Button size="medium" data-cy="gardenView">
                View
              </Button>
            </Link>
            <Button size="medium" data-cy="gardenReports">
              Reports
            </Button>
            <Button
              size="medium"
              onClick={(event) => {
                handleDelete(event, garden._id);
              }}
            >
              Delete
            </Button>
            {garden.hasFailedFacilities && (
              <div className="failed">
                <Tooltip title="Garden has a failed facilities">
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

export default GardenCard;
