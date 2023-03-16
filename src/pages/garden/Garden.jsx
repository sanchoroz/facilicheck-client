import React from 'react';
import './garden.scss';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';
import DatatableReports from '../../components/datatable reports/DatatableReports';
import { useParams, useLocation } from 'react-router-dom';

const Garden = () => {
  const { type } = useParams();
  const stateParamVal = useLocation().state.stateParam;
  console.log('stateParamVal', stateParamVal);

  const [facilities, setFacility] = React.useState([]);
  const [garden, setGardens] = React.useState([]);

  React.useEffect(() => {
    instance.get(`/api/garden/${stateParamVal}`).then((response) => {
      setGardens(response.data);
    });
  }, []);

  React.useEffect(() => {
    if (garden) {
      instance.get(`/api/facility/facilities`).then((response) => {
        setFacility(response.data);
      });
    }
  }, [garden]);

  const columnsFacilites = [
    { field: 'facilityName', headerName: 'שם המתקן', width: 150 },
    { field: 'manufacturer', headerName: 'יצרן', width: 150 },
    { field: 'manufacturerType', headerName: 'סוג היצרן', width: 150 },
    { field: 'standard', headerName: 'תקן המתקן', width: 150 },
    { field: 'basis', headerName: 'ביסוס המתקן', width: 150 },
    { field: 'isFailed', headerName: 'האם תקין', width: 150 },
  ];

  const columnsReports = [
    { field: 'reporter', headerName: 'שם המדווח', width: 150 },
    { field: 'gardenName', headerName: 'שם הגן', width: 150 },
    { field: 'date', headerName: 'תאריך בדיקה', width: 150 },
    { field: 'reportNumber', headerName: 'מס"ד הדוח', width: 150 },
  ];

  return (
    <>
      {garden && (
        <div className="garden" dir="rtl">
          <Sidebar />
          <div className="gardenContainer">
            <Navbar />
            <div className="top">
              <div className="left">
                <div className="editButton">ערוך</div>
                <div className="item">
                  <img src={garden.imageUrl} alt="" className="itemImage" />
                  <div className="details">
                    <h3 className="itemTitle">{garden.siteName}</h3>
                    <div className="detailItem">
                      <span className="itemKey">סטטוס:</span>
                      <span className="itemValue">
                        {garden.hasFailedFacilities ? 'תקין' : 'לא תקין'}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">בדיקה חודשית הבאה:</span>
                      <span className="itemValue">12.02.23</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">בדיקה שנתית הבאה:</span>
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
      )}
    </>
  );
};

export default Garden;
