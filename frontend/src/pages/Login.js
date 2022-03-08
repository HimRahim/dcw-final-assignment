import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

function Login() {
  const responseFacebook = async (response) => {
    console.log(response);
    if (response.accessToken) {
      console.log(`log in with access_token = ${response.accessToken}`);
      let result = await axios.post('http://localhost:8080/api/login', {
        token: response.accessToken,
      });
      //console.log(jwt_decode(result.data.access_token).exp);
      sessionStorage.setItem('access_token', result.data.access_token);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <FacebookLogin
        appId="3215602562097559"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
}

export default Login;
