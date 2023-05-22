import React, { useEffect } from "react";
import instance from "../../instance";
import "./createuser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [roles, setRoles] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [user, setUser] = React.useState({
    email: "",
    name: "",
    password: "",
    role: "",
  });

  React.useEffect(() => {
    instance
      .get("/api/auth/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await postData({ ...user, role: selectedOption });
    navigate("/users");
  };

  const postData = async (formData) => {
    try {
      await instance.post(`/api/auth/registration`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add">
      <Sidebar />
      <div className="createUserContainer">
        <Navbar />
        <div className="register">
          <form onSubmit={handleSubmit}>
            <div className="create">
              <h1>Create new user </h1>
              <select
                required
                value={selectedOption}
                onChange={handleDropdownChange}
              >
                <option value="">Select Role</option>
                {roles.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </select>
              <label htmlFor="">Email</label>
              <input
                required
                type="text"
                placeholder="email"
                name="email"
                onChange={handleFieldChange}
              />
              <label htmlFor="">Name</label>
              <input
                type="text"
                required
                placeholder="name"
                name="name"
                onChange={handleFieldChange}
              />
              <label htmlFor="">Password</label>
              <input
                type="text"
                required
                placeholder="password"
                name="password"
                onChange={handleFieldChange}
              />

              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
