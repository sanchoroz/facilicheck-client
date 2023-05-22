import React from "react";
import "./garden.scss";
import instance from "../../instance";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import PageTitle from "../../components/pageTitle/PageTitle";
import { useParams, useLocation } from "react-router-dom";

const Garden = () => {
  const { type } = useParams();
  const stateParamVal = useLocation().state.stateParam;
  const [garden, setGarden] = React.useState([]);

  React.useEffect(() => {
    instance.get(`/api/garden/${stateParamVal}`).then((response) => {
      setGarden(response.data);
      console.log(response.data);
    });
  }, []);

  const columnsFacilites = [
    { field: "facilityName", headerName: "Facility name", width: 150 },
    { field: "manufacturer", headerName: "Manufacturer", width: 150 },
    { field: "manufacturerType", headerName: "Manufacturer Type", width: 150 },
    { field: "standard", headerName: "Standard", width: 150 },
    { field: "basis", headerName: "Вasis", width: 150 },
    { field: "isFailed", headerName: "Is Failed", width: 150 },
  ];

  const columnsReports = [
    { field: "reporter", headerName: "Reporter", width: 150 },
    { field: "gardenName", headerName: "Garden name", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "reportNumber", headerName: "Report number", width: 150 },
  ];

  return (
    <>
      {garden && (
        <div className="garden">
          <Sidebar />
          <div className="gardenContainer">
            <Navbar />
            <PageTitle title={"Garden"} />
            <div className="top">
              <div className="left">
                <div className="editButton">Edit</div>
                <div className="item">
                  <img src={garden.imageUrl} alt="" className="itemImage" />
                  <div className="details">
                    <h3 className="itemTitle">{garden.siteName}</h3>
                    <div className="detailItem">
                      <span className="itemKey">Status:</span>
                      <span className="itemValue">
                        {garden.hasFailedFacilities ? "pass" : "failed"}
                      </span>
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
                {/* <Reportstable columns={columnsReports} items={garden.facilities} /> */}
              </div>
            </div>
            <div className="bottom">
              <Datatable
                columns={columnsFacilites}
                items={garden.facilities}
                type="facility"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Garden;
