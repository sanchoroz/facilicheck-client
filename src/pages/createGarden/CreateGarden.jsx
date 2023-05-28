import React, { useEffect } from "react";
import instance from "../../instance";
import axios from "axios";
import "./creategarden.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateGarden = () => {
  const [file, setFile] = React.useState(null);
  const [garden, setGarden] = React.useState({
    siteName: "",
    address: "",
    serialNumber: "",
    siteType: "",
    groundCover: "",
    status: false,
    imageUrl: "",
    desc: "",
  });

  useEffect(() => {
    if (garden) {
      //console.log('garden', garden);
    }
  }, [garden]);

  const navigate = useNavigate();

  const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "facilicheck");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqnmco7cg/image/upload",
        data
      );
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
    navigate("/gardens");
  };

  const postData = async (formData) => {
    try {
      await instance.post("/api/garden/create/", formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add">
      <Sidebar />
      <div className="addContainer">
        <Navbar />
        <div className="register">
          <form onSubmit={handleSubmit}>
            <div className="left">
              <h1 data-cy="createGardenTitle">Create new Garden</h1>
              <label htmlFor="">Name</label>
              <input
                required
                type="text"
                placeholder="name"
                data-cy="siteName"
                name="siteName"
                onChange={handleFieldChange}
              />
              <label htmlFor="">Address</label>
              <input
                type="text"
                required
                placeholder="address"
                data-cy="address"
                name="address"
                onChange={handleFieldChange}
              />
              <label htmlFor="">Garden number</label>
              <input
                required
                type="text"
                placeholder="garden number"
                onChange={handleFieldChange}
                data-cy="serialNumber"
                name="serialNumber"
              />
              <label htmlFor="">Garden type</label>
              <input
                required
                type="text"
                name="siteType"
                data-cy="siteType"
                placeholder="garden type"
                onChange={handleFieldChange}
              />
              <div className="toggle">
                <label htmlFor=""></label>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <button data-cy="newGardenSubmit" type="submit">
                Create
              </button>
            </div>

            <div className="right">
              <label htmlFor="">Ground Cover</label>
              <input
                required
                data-cy="groundCover"
                name="groundCover"
                type="text"
                placeholder="ground cover"
                onChange={handleFieldChange}
              />

              <label htmlFor="">Facility image</label>
              <input
                type="file"
                data-cy="gardenImage"
                name="gardenImage"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <label htmlFor="">Facility check date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
              <label htmlFor="">Description</label>
              <textarea
                placeholder="some description"
                data-cy="desc"
                name="desc"
                id=""
                cols="30"
                rows="10"
                onChange={handleFieldChange}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGarden;
