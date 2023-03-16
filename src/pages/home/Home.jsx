import React from 'react';
import instance from '../../instance';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import './home.scss';

const Home = () => {
  //const data = useSelector((state) => state.auth.data);
  const [users, setUser] = React.useState([]);
  const [gardens, setGardens] = React.useState([]);
  const [facilities, setIFacilities] = React.useState([]);

  //console.log('data: ', data);

  React.useEffect(() => {
    instance.get(`/api/auth/users`).then((response) => {
      setUser(response.data);
    });
  }, []);

  React.useEffect(() => {
    instance.get(`/api/garden/gardens`).then((response) => {
      setGardens(response.data);
    });
  }, []);

  React.useEffect(() => {
    instance.get(`/api/facility/facilities`).then((response) => {
      setIFacilities(response.data);
    });
  }, []);

  return (
    <div className="home" dir="rtl">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users" amount={users} />
          <Widget type="gardens" amount={gardens} />
          <Widget type="facilities" amount={facilities} />
        </div>
      </div>
    </div>
  );
};

export default Home;
