import GoogleLogin from 'react-google-login';
import React from 'react';
import axios from 'axios';

function GoogleAuthen({ setToken}) {
  const responseGoogle = async (response) => {
    console.log(response);
    if (response.accessToken) {
      console.log(`log in with access_token = ${response.accessToken}`);
      let result = await axios.post('http://localhost:8080/api/login', {
        type: 'google',
        token: response.tokenId,
      });
      
     localStorage.setItem('access_token', result.data.access_token);
      setToken(result.data.access_token);
    }
  };

  const responseGoogleFail = (response) => {
    console.log(response)
  }

  return (
    <div className='mx-5'>
      <GoogleLogin
        className=' h-16'
        clientId="910826813887-n6ef67ejo1udav8a177v8vbnhi6c6rbp.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogleFail}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default GoogleAuthen;
