import React from 'react';
import './facilitycard.scss';
import instance from '../../instance';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const FacilityCard = (props) => {
  const { facility, onDelete } = props;
  const [item, setItem] = React.useState(facility);

  function handleDelete(event, facilityId) {
    let result = window.confirm('Do you want to delete Facility?');
    if (result) {
      instance.put(`http://localhost:5000/api/facility/delete/${facilityId}`).then((response) => {
        if (response.status === 200) {
          //setGardens((current) => current.filter((g) => g.id === gardenId));
          onDelete(facilityId);
        }
      });
    }
  }

  return (
    <>
      {item && (
        <Card sx={{ width: 300 }} classes={{ root: 'card' }} dir="rtl">
          <CardMedia component="img" alt="garden cover image" height="200" image={item.imageUrl} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.facilityName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              מס''ד המתקן: {item.sku}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              שם היצרן: {item.manufacturer}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              שייך לגן:
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/facility" state={{ stateParam: item._id }} className="link">
              <Button size="medium">צפיה</Button>
            </Link>
            <Button size="medium">דוחות</Button>
            <Button
              size="medium"
              onClick={(event) => {
                handleDelete(event, item._id);
              }}>
              הסר
            </Button>
            {item.isFailed && (
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
