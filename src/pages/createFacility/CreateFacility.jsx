import React, { useEffect } from "react";
import instance from "../../instance";
import axios from "axios";
import "./createfacility.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const CreateFacility = () => {
  const [data, setData] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [facility, setFacility] = React.useState({
    facilityName: "", //מק''ט המתקן
    garden: "",
    sku: "", //מס''ד המתקן
    standard: "", //תקן המתקן
    manufacturer: "", //שם היצרן
    manufacturerType: "", //סוג היצרן
    basis: "", //ביסוס המתקן
    isFailed: false, //סטטוס המתקן
    imageUrl: "",
  });

  React.useEffect(() => {
    instance
      .get("/api/garden/gardens")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
    setFacility((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = await upload(file);

    await postData({ ...facility, imageUrl: url, garden: selectedOption });
    navigate("/facilities");
  };

  const postData = async (formData) => {
    try {
      await instance.post(`/api/facility/create/${selectedOption}`, formData);
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
              <h1 data-cy="createFacilityTitle">Create new facility </h1>
              <select
                required
                value={selectedOption}
                onChange={handleDropdownChange}
              >
                <option value="">Select Garden</option>
                {data.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.siteName}
                  </option>
                ))}
              </select>
              <label htmlFor="">Facility number</label>
              <input
                required
                type="text"
                placeholder="facility number"
                name="facilityName"
                data-cy="facilityName"
                onChange={handleFieldChange}
              />
              <label htmlFor="">SKU</label>
              <input
                type="text"
                required
                placeholder="sku"
                name="sku"
                data-cy="sku"
                onChange={handleFieldChange}
              />
              <div className="toggle">
                <label htmlFor="">Status</label>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <label htmlFor="">Facility image</label>
              <input
                type="file"
                name="imageUrl"
                data-cy="facilityImage"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" data-cy="newFacilitySubmit">
                Create
              </button>
            </div>

            <div className="right">
              <label htmlFor="">Standard</label>
              <input
                required
                type="text"
                data-cy="standard"
                placeholder="standard"
                onChange={handleFieldChange}
                name="standard"
              />
              <label htmlFor="">Manufacturer</label>
              <input
                required
                type="text"
                name="manufacturer"
                data-cy="manufacturer"
                placeholder="manufacturer"
                onChange={handleFieldChange}
              />
              <label htmlFor="">Manufacturer Type</label>
              <input
                required
                name="manufacturerType"
                type="text"
                data-cy="manufacturerType"
                placeholder="Manufacturer Type"
                onChange={handleFieldChange}
              />
              <label htmlFor="">Base Type</label>
              <input
                required
                name="basis"
                type="text"
                data-cy="basis"
                placeholder="Base type"
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
