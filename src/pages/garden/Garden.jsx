import React from 'react';
import './garden.scss';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import DatatableReports from '../../components/datatable reports/DatatableReports';

const Garden = ({ gardenId }) => {
  const [facilities, setFacility] = React.useState([]);
  const [garden, setGardens] = React.useState([]);

  React.useEffect(() => {
    console.log('gardenId', gardenId);
    instance.get(`/api/garden/${gardenId}`).then((response) => {
      setGardens(response.data);
    });
  }, []);

  React.useEffect(() => {
    instance.get(`/api/facility/facilities`).then((response) => {
      setFacility(response.data);
    });
  }, []);

  const columnsFacilites = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'facilityName', headerName: 'Facility name', width: 200 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
    { field: 'sku', headerName: 'SKU', width: 100 },
    { field: 'standard', headerName: 'Standart', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
  ];

  const columnsReports = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'facilityName', headerName: 'Facility name', width: 200 },
  ];

  return (
    <div className="garden">
      <Sidebar />
      <div className="gardenContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <div className="item">
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
                className="itemImage"
              />
              <div className="details">
                <h3 className="itemTitle">{garden.siteName}</h3>
                <div className="detailItem">
                  <span className="itemKey">Status: </span>
                  <span className="itemValue">pass</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Next monthly check:</span>
                  <span className="itemValue">12.02.23</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Next yearly check:</span>
                  <span className="itemValue">12.02.23</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <DatatableReports columns={columnsReports} items={facilities} />
          </div>
        </div>
        <div className="bottom">
          <Datatable columns={columnsFacilites} items={facilities} type="facility" />
        </div>
      </div>
    </div>
  );
};

export default Garden;
