import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import config from '../config';

function AboutMe() {
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('access_token');
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
  const [info, setInfo] = useState({
    name: '',
    email: '',
    picture: '',
  });
  useEffect(() => {
    const fecthData = async () => {
      let result = await axios.get(`${config.apiUrlPrefix}/info`);
      console.log(result.data);
      setInfo({
        name: result.data.name,
        email: result.data.email,
        picture: result.data.picture,
      });
    };
    fecthData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center flex-col">
        <img src={info.picture} alt="" className="my-5" />
        <h1 className="my-5">{info.name}</h1>
        <h1 className="my-5">{info.email}</h1>
      </div>
    </>
  );
}

export default AboutMe;
