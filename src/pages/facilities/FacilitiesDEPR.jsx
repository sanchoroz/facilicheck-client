import React from 'react';
import './facilities.scss';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';
import Button from '@mui/material/Button';

const FacilitiesDEpr = () => {
  const [facilities, setFacilities] = React.useState([]);

  React.useEffect(() => {
    instance.get(`/api/facility/facilities`).then((response) => {
      setFacilities(response.data);
    });
  }, []);

  const handleClick = (event, facilityId) => {
    let result = window.confirm('Do you want to delete Facility?');
    if (result) {
      instance.put(`http://localhost:5000/api/facility/delete/${facilityId}`);
      setFacilities((current) => current.filter((f) => f.id === facilityId));
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'facilityName', headerName: 'Facility name', width: 200 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
    { field: 'sku', headerName: 'SKU', width: 100 },
    { field: 'standard', headerName: 'Standart', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (cellValues) => {
        return (
          <div className="cellAction">
            <Button
              size="small"
              variant="outlined"
              style={{
                fontSize: '12px',
              }}>
              View
            </Button>
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
    <div className="facilities">
      <Sidebar />
      <div className="facilitiesContainer">
        <Navbar />
        <Datatable columns={columns} items={facilities} type="facility" />
      </div>
    </div>
  );
};

export default FacilitiesDEpr;
