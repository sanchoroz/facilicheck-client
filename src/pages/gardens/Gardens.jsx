import React from 'react';
import './gardens.scss';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Gardens = () => {
  const [gardens, setGardens] = React.useState([]);

  React.useEffect(() => {
    instance.get(`/api/garden/gardens`).then((response) => {
      setGardens(response.data);
    });
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

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'siteName', headerName: 'Site name', width: 200 },
    { field: 'address', headerName: 'Addres', width: 150 },
    { field: 'siteType', headerName: 'Site Type', width: 100 },
    { field: 'groundCover', headerName: 'Ground Cover', width: 100 },
    { field: 'serialNumber', headerName: 'Serial Number', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (cellValues) => {
        return (
          <div className="cellAction">
            <Link to="/garden" gardenId={cellValues.row._id}>
              <Button
                size="small"
                variant="outlined"
                style={{
                  fontSize: '12px',
                  textDecoration: 'none',
                }}>
                View
              </Button>
            </Link>
            <Button
              size="small"
              variant="outlined"
              style={{
                color: 'purple',
                borderColor: 'purple',
                fontSize: '12px',
              }}>
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              style={{
                color: 'red',
                borderColor: 'red',
                fontSize: '12px',
              }}
              onClick={(event) => {
                handleClick(event, cellValues.row._id);
              }}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="gardens">
      <Sidebar />
      <div className="gardensContainer">
        <Navbar />

        <Datatable columns={columns} items={gardens} type="garden" />
      </div>
    </div>
  );
};

export default Gardens;
