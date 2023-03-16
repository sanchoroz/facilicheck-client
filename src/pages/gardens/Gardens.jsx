import React from 'react';
import './gardens.scss';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import GardenCard from '../../components/gardenCard/GardenCard';
import Datatable from '../../components/datatable/Datatable';
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
          console.log('Gardens request canceled');
        } else {
          console.log(err);
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  const handleClick = (event, gardenId) => {
    let result = window.confirm(
      'Do you want to delete Garden? All related facilities will be deleted as well',
    );
    if (result) {
      instance.put(`http://localhost:5000/api/garden/delete/${gardenId}`).then((response) => {
        if (response.status === 200) {
          setGardens((current) => current.filter((g) => g.id === gardenId));
        }
      });
    }
  };

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
        {/* <Datatable columns={columns} items={gardens} type="garden" /> */}
      </div>
    </div>
  );
};

export default Gardens;

// const columns = [
//   { field: '_id', headerName: 'ID', width: 250 },
//   { field: 'siteName', headerName: 'Site name', width: 200 },
//   { field: 'address', headerName: 'Addres', width: 150 },
//   { field: 'siteType', headerName: 'Site Type', width: 100 },
//   { field: 'groundCover', headerName: 'Ground Cover', width: 100 },
//   { field: 'serialNumber', headerName: 'Serial Number', width: 150 },
//   {
//     field: 'action',
//     headerName: 'Action',
//     width: 250,
//     renderCell: (cellValues) => {
//       return (
//         <div className="cellAction">
//           <Link to="/garden" gardenId={cellValues.row._id}>
//             <Button
//               size="small"
//               variant="outlined"
//               style={{
//                 fontSize: '12px',
//                 textDecoration: 'none',
//               }}>
//               View
//             </Button>
//           </Link>
//           <Button
//             size="small"
//             variant="outlined"
//             style={{
//               color: 'purple',
//               borderColor: 'purple',
//               fontSize: '12px',
//             }}>
//             Edit
//           </Button>
//           <Button
//             size="small"
//             variant="outlined"
//             style={{
//               color: 'red',
//               borderColor: 'red',
//               fontSize: '12px',
//             }}
//             onClick={(event) => {
//               handleClick(event, cellValues.row._id);
//             }}>
//             Delete
//           </Button>
//         </div>
//       );
//     },
//   },
// ];
