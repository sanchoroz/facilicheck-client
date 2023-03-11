import React from 'react';
import axios from '../../instance';
import './add.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const AddFacility = ({ inputs }) => {
  const [fields, setFields] = React.useState(inputs);

  const [data, setData] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get('/api/garden/gardens')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('selected option', selectedOption);
  };

  const handleFieldChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {};

    fields.forEach((field) => {
      formData[field.name] = field.value;
    });
    await postData(formData);

    navigate('/facilities');
  };

  const postData = async (formData) => {
    try {
      await axios.post(`/api/facility/create/${selectedOption}`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add">
      <Sidebar />
      <div className="addContainer">
        <Navbar />
        <Paper elevation={1} classes={{ root: 'title' }}>
          <h1>Add new Facility</h1>
        </Paper>
        <Paper elevation={2} classes={{ root: 'addBlock' }}>
          <div className="left">
            <img
              src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              alt="upload"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <select value={selectedOption} onChange={handleDropdownChange}>
                  <option value="">Select an option</option>
                  {data.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.siteName}
                    </option>
                  ))}
                </select>
              </div>
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
              <button type="submit">Send</button>
            </form>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default AddFacility;
