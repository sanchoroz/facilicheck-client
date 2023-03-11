import React from 'react';
import './createmonthlyreport.scss';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CreateMonthlyReport = ({ inputs }) => {
  const timestamp = Date.now();
  const data = useSelector((state) => state.auth.data);

  const [fields, setFields] = React.useState(inputs);
  const [gardens, setGardens] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState('');

  const [garden, setGarden] = React.useState();
  const [facilities, setFacilities] = React.useState([]);
  const [report, setReport] = React.useState({
    gardenName: '',
    reporter: '',
    reportNumber: '',
    date: '',
    previousIssue: '',
    areaStatus: '',
    facilities: {},
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    instance
      .get('/api/garden/gardens')
      .then((response) => {
        setGardens(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // http://localhost:5000/api/monthlyReport/create

  React.useEffect(() => {
    if (selectedOption) {
      getGarden();
    }
  }, [selectedOption]);

  React.useEffect(() => {
    if (selectedOption) {
      setFacilities(garden.facilities);
      setReport((prevState) => ({
        ...prevState,
        ['gardenName']: garden.siteName,
        ['date']: new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(timestamp),
        ['reporter']: data.email,
        ['reportNumber']: getRandomInt(234234234, 33242342546),
      }));
    }
  }, [garden]);

  React.useEffect(() => {
    if (garden) {
      console.log('report: ', report);
    }
  }, [report]);

  const getGarden = () => {
    instance
      .get(`/api/garden/${selectedOption}`)
      .then((response) => {
        setGarden(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFieldChange = (index, event) => {
    const newItems = [...garden.facilities];
    console.log('Field change: ', newItems);
    newItems[index].issueDescription = event.target.value;
    setFacilities(newItems);
    setReport((prevState) => ({
      ...prevState,
      ['facilities']: newItems,
    }));
  };

  const handleCheckboxChange = (event, index) => {
    const newItems = [...garden.facilities];
    console.log('Checkbox change:', event.target.checked, index, newItems);
    if (event.target.checked) {
      newItems[index].isFailed = event.target.checked;
      setFacilities(newItems);
      setReport((prevState) => ({
        ...prevState,
        ['facilities']: newItems,
      }));
    } else {
      newItems[index].isFailed = event.target.checked;
      newItems[index].issueDescription = '';
      setFacilities(newItems);
      setReport((prevState) => ({
        ...prevState,
        ['facilities']: newItems,
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReport((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postData();
    navigate('/reports');
  };

  const postData = async () => {
    try {
      const response = await instance.post(`/api/report/monthly/create`, report);
    } catch (error) {
      console.error(error);
    }
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="report">
      <Sidebar />
      <div className="reportContainer">
        <Navbar />
        {!selectedOption ? (
          <Paper elevation={1} className="title">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="garden-select-label">Select Garden</InputLabel>
              <Select
                labelId="garden-select-label"
                id="garden-select"
                label="Select Garden"
                value={selectedOption}
                onChange={handleDropdownChange}>
                {gardens.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.siteName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        ) : (
          <>
            <Paper elevation={1} className="title">
              <h1>Create new report</h1>
            </Paper>
            <Paper elevation={2} className="addBlock">
              <div className="left">
                <form onSubmit={handleSubmit}>
                  {fields.map((field, index) => {
                    return (
                      <div className="formInput" key={field.id}>
                        <label>{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={report[field.name]}
                          name={field.name}
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                    );
                  })}
                  {facilities &&
                    facilities.map((facility, index) => {
                      return (
                        <div className="formInput" key={facility._id}>
                          <label>{facility.facilityName}</label>
                          <FormControlLabel
                            label="Check is failed"
                            control={
                              <Checkbox
                                checked={facility.isFailed}
                                onChange={(event) => handleCheckboxChange(event, index)}
                              />
                            }
                          />
                          {facility.isFailed && (
                            <input
                              type="text"
                              value={facility.issueDescription}
                              placeholder="Please add failure reason"
                              name={facility.facilityName}
                              onChange={(event) => handleFieldChange(index, event)}
                            />
                          )}
                        </div>
                      );
                    })}
                  <button type="submit">Send</button>
                </form>
              </div>
              {garden && (
                <div className="right">
                  <div className="gardenInfo">
                    <div className="formInput">
                      <label>Garden name</label>
                      <input type="text" value={report.gardenName} disabled />
                    </div>
                    <div className="formInput">
                      <label>Reporter</label>
                      <input type="text" value={report.reporter} disabled />
                    </div>
                    <div className="formInput">
                      <label>Check number</label>
                      <input type="text" value={report.reportNumber} disabled />
                    </div>
                    <div className="formInput">
                      <label>Date</label>
                      <input type="text" value={report.date} disabled />
                    </div>
                  </div>
                </div>
              )}
            </Paper>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateMonthlyReport;
