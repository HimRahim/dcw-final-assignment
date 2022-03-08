import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

function FacebookAuthen({ setToken }) {
  const responseFacebook = async (response) => {
    console.log(response);
    if (response.accessToken) {
      console.log(`log in with access_token = ${response.accessToken}`);
      let result = await axios.post('http://localhost:8080/api/login', {
        token: response.accessToken,
      });
      
      sessionStorage.setItem('access_token', result.data.access_token);
      setToken(result.data.access_token);
    }
  };

  return (
    <div>
      <FacebookLogin
        appId="3215602562097559"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
}

export default FacebookAuthen;
