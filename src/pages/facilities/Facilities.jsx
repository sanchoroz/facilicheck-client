import React from 'react';
import './facilities.scss';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import FacilityCard from '../../components/facilityCard/FacilityCard';
import Datatable from '../../components/datatable/Datatable';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Facilities = () => {
  const [facilities, setFacilities] = React.useState([]);

  const cancelToken = axios.CancelToken.source();

  React.useEffect(() => {
    instance
      .get(`/api/facility/facilities`, { cancelToken: cancelToken.token })
      .then((response) => {
        setFacilities(response.data);
        console.log('faclities', facilities);
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

  function handleDelete(componentId) {
    setFacilities((prevState) => prevState.filter((component) => component._id !== componentId));
  }

  return (
    <div className="facilities" dir="rtl">
      <Sidebar />
      <div className="facilitiesContainer">
        <Navbar />

        <div className="facilityTitle">
          מתקנים
          <Link to="/facilities/create" style={{ textDecoration: 'none' }} className="link">
            <Button
              className="createButton"
              size="small"
              variant="contained"
              style={{
                backgroundColor: '#1dbf73',
                fontSize: '12px',
                textDecoration: 'none',
              }}>
              צור מתקן חדש
            </Button>
          </Link>
        </div>

        <div className="cardsContainer">
          {facilities &&
            facilities.map((item, index) => (
              <FacilityCard dir="rtl" key={index} facility={item} onDelete={handleDelete}>
                {item.siteName}
              </FacilityCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;

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
