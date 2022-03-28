import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import config from '../config'

function FacebookAuthen({ setToken }) {
  const responseFacebook = async (response) => {
    console.log(response);
    if (response.accessToken) {
      console.log(`log in with access_token = ${response.accessToken}`);
      let result = await axios.post(`${config.apiUrlPrefix}/login`, {
        type: 'facebook',
        token: response.accessToken,
      });

      localStorage.setItem('access_token', result.data.access_token);
      setToken(result.data.access_token);
    }
  };

  return (
    <div className="mx-5">
      <FacebookLogin
        appId="656705078992423"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
}

export default FacebookAuthen;
