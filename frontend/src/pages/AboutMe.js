import React, { useEffect } from 'react'
import axios from 'axios';


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

  useEffect(async () => {
    let result = await axios.get('http://localhost:8080/api/info');
    console.log(result.data);
  }, []);
  

  return (
    <div>
      <img src="" alt="" />
    </div>
  )
}

export default AboutMe