import React from 'react';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const CreateYearlyReport = ({ inputs }) => {
  const timestamp = Date.now();
  const data = useSelector((state) => state.auth.data);

  const [fields, setFields] = React.useState(inputs);
  const [gardens, setGardens] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState('');

  const [garden, setGarden] = React.useState();
  const [facilities, setFacilities] = React.useState([]);
  const [checked, setChecked] = React.useState(false);

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

  React.useEffect(() => {
    if (selectedOption) {
      getGarden();
    }
  }, [selectedOption]);

  React.useEffect(() => {
    if (selectedOption) {
      setFacilities(garden.facilities);
    }
  }, [garden]);

  //react query

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
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  const handleCheckboxChange = (event, index) => {
    const newItems = [...garden.facilities];
    console.log(event.target.checked, index, newItems);
    newItems[index].isFailed = event.target.checked;
    setFacilities(newItems);
  };

  const handleInputChange = (event, index) => {
    const newItems = [...garden.facilities];
    newItems[index].inputValue = event.target.value;
    //setItems(newItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {};

    fields.forEach((field) => {
      formData[field.name] = field.value;
    });
    await postData(formData);
  };

  const postData = async (formData) => {
    try {
      const response = await instance.post(`/api/facility/create/${selectedOption}`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="report">
      <Sidebar />
      <div className="reportContainer">
        <Navbar />
        {!selectedOption ? (
          <Paper elevation={1} classes={{ root: 'title' }}>
            <div className="formInput">
              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value="">Select an option</option>
                {gardens.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.siteName}
                  </option>
                ))}
              </select>
            </div>
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
                          value={field.value}
                          onChange={(event) => handleFieldChange(index, event)}
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
                            label="Failed check"
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
                              value=""
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
                      <input type="text" value={garden.siteName} disabled />
                    </div>
                    <div className="formInput">
                      <label>Reporter</label>
                      <input type="text" value={data.email} disabled />
                    </div>
                    <div className="formInput">
                      <label>Date</label>
                      <input
                        type="text"
                        value={new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        }).format(timestamp)}
                        disabled
                      />
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

export default CreateYearlyReport;
