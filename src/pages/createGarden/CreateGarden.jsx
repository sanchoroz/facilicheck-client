import React, { useEffect } from 'react';
import instance from '../../instance';
import axios from 'axios';
import './creategarden.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateGarden = () => {
  const [file, setFile] = React.useState(null);
  const [garden, setGarden] = React.useState({
    siteName: '',
    address: '',
    serialNumber: '',
    siteType: '',
    groundCover: '',
    status: false,
    imageUrl: '',
    desc: '',
  });

  useEffect(() => {
    if (garden) {
      //console.log('garden', garden);
    }
  }, [garden]);

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
    setGarden((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = await upload(file);

    await postData({ ...garden, imageUrl: url });
    console.log('garden', garden);
    navigate('/gardens');
  };

  const postData = async (formData) => {
    try {
      await instance.post('/api/garden/create/', formData);
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
              <h1>צור גן חדש</h1>
              <label htmlFor="">שם האתר</label>
              <input
                required
                type="text"
                placeholder="שם האתר"
                name="siteName"
                onChange={handleFieldChange}
              />
              <label htmlFor="">כתובת</label>
              <input
                type="text"
                required
                placeholder="כתובת"
                name="address"
                onChange={handleFieldChange}
              />
              <label htmlFor="">מס''ד האתר</label>
              <input
                required
                type="text"
                placeholder="מס''ד האתר"
                onChange={handleFieldChange}
                name="serialNumber"
              />
              <label htmlFor="">סוג האתר</label>
              <input
                required
                type="text"
                name="siteType"
                placeholder="סוג האתר"
                onChange={handleFieldChange}
              />
              <div className="toggle">
                <label htmlFor="">סטטוס האתר</label>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <button type="submit">צור גן</button>
            </div>

            <div className="right">
              <label htmlFor="">כיסוי שטח באתר</label>
              <input
                required
                name="groundCover"
                type="text"
                placeholder="כיסוי שטח באתר"
                onChange={handleFieldChange}
              />

              <label htmlFor="">תמונת מתקן</label>
              <input type="file" name="gardenImage" onChange={(e) => setFile(e.target.files[0])} />

              <label htmlFor="">תאריך בדיקה חודשית</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
              <label htmlFor="">תאור הגן</label>
              <textarea
                placeholder="תכתוב כמה מילים על הגן"
                name="desc"
                id=""
                cols="30"
                rows="10"
                onChange={handleFieldChange}></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGarden;
