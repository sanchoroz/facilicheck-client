import React, { useEffect } from 'react';
import instance from '../../instance';
import axios from 'axios';
import './creategarden.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const CreateFacility = () => {
  const [data, setData] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [facility, setFacility] = React.useState({
    facilityName: '', //מק''ט המתקן
    sku: '', //מס''ד המתקן
    standard: '', //תקן המתקן
    manufacturer: '', //שם היצרן
    manufacturerType: '', //סוג היצרן
    basis: '', //ביסוס המתקן
    isFailed: false, //סטטוס המתקן
    imageUrl: '',
  });

  React.useEffect(() => {
    instance
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

  const navigate = useNavigate();

  const upload = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'facilicheck');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dqnmco7cg/image/upload', data);
      const { url } = res.data;
      return url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleFieldChange = (e) => {
    setFacility((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = await upload(file);

    await postData({ ...facility, imageUrl: url });
    console.log('facility', facility);
    navigate('/facilities');
  };

  const postData = async (formData) => {
    try {
      await instance.post(`/api/facility/create/${selectedOption}`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add" dir="rtl">
      <Sidebar />
      <div className="addContainer">
        <Navbar />
        <div className="register">
          <form onSubmit={handleSubmit}>
            <div className="left">
              <h1>צור מתקן חדש</h1>
              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value="">בחר גן</option>
                {data.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.siteName}
                  </option>
                ))}
              </select>
              <label htmlFor="">מק''ט המתקן</label>
              <input
                required
                type="text"
                placeholder="מק''ט המתקן"
                name="facilityName"
                onChange={handleFieldChange}
              />
              <label htmlFor="">מס''ד המתקן</label>
              <input
                type="text"
                required
                placeholder="מס''ד המתקן"
                name="sku"
                onChange={handleFieldChange}
              />
              <div className="toggle">
                <label htmlFor="">סטטוס המתקן</label>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <label htmlFor="">תמונת מתקן</label>
              <input type="file" name="imageUrl" onChange={(e) => setFile(e.target.files[0])} />
              <button type="submit">צור גן</button>
            </div>

            <div className="right">
              <label htmlFor="">תקן המתקן</label>
              <input
                required
                type="text"
                placeholder="תקן המתקן"
                onChange={handleFieldChange}
                name="standard"
              />
              <label htmlFor="">שם היצרן</label>
              <input
                required
                type="text"
                name="manufacturer"
                placeholder="שם היצרן"
                onChange={handleFieldChange}
              />
              <label htmlFor="">סוג היצרן</label>
              <input
                required
                name="manufacturerType"
                type="text"
                placeholder="סוג היצרן"
                onChange={handleFieldChange}
              />
              <label htmlFor="">ביסוס המתקן</label>
              <input
                required
                name="basis"
                type="text"
                placeholder="ביסוס המתקן"
                onChange={handleFieldChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFacility;
