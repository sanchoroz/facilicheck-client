import React from 'react';
import './gardens.scss';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import GardenCard from '../../components/gardenCard/GardenCard';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
          console.log('gardens request canceled');
        } else {
          console.log(err);
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  function handleDelete(componentId) {
    setGardens((prevState) => prevState.filter((component) => component._id !== componentId));
  }

  return (
    <div className="gardens" dir="rtl">
      <Sidebar />
      <div className="gardensContainer">
        <Navbar />

        <div className="gardensTitle">
          גנים
          <Link to="/gardens/create" style={{ textDecoration: 'none' }} className="link">
            <Button
              className="createButton"
              size="small"
              variant="contained"
              style={{
                backgroundColor: '#1dbf73',
                fontSize: '12px',
                textDecoration: 'none',
              }}>
              צור גן חדש
            </Button>
          </Link>
        </div>

        <div className="cardsContainer">
          {gardens &&
            gardens.map((item, index) => (
              <GardenCard dir="rtl" key={index} garden={item} onDelete={handleDelete}>
                {item.siteName}
              </GardenCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Gardens;
