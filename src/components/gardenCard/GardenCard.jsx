import React from 'react';
import './gardencard.scss';
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

const GardenCard = (props) => {
  const { garden, onDelete } = props;
  const [item, setItem] = React.useState(garden);

  React.useEffect(() => {
    console.log('item', item);
  }, [item]);

  function handleDelete(event, gardenId) {
    let result = window.confirm(
      'Do you want to delete Garden? All related facilities will be deleted as well',
    );
    if (result) {
      instance.put(`http://localhost:5000/api/garden/delete/${gardenId}`).then((response) => {
        if (response.status === 200) {
          //setGardens((current) => current.filter((g) => g.id === gardenId));
          onDelete(gardenId);
        }
      });
    }
  }

  return (
    <>
      {item && (
        <Card sx={{ width: 300 }} classes={{ root: 'card' }}>
          <CardMedia component="img" alt="garden cover image" height="200" image={item.imageUrl} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.siteName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span>Address:</span> {item.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Serial number: {item.serialNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Facilities qty: {item.facilities.length}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/garden" state={{ stateParam: item._id }} className="link">
              <Button size="small">View</Button>
            </Link>
            <Button size="small">Reports</Button>
            <Button
              size="small"
              onClick={(event) => {
                handleDelete(event, item._id);
              }}>
              Delete
            </Button>
            {item.hasFailedFacilities && (
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
