import GoogleLogin from 'react-google-login';
import React from 'react';

function GoogleAuthen() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId="910826813887-n6ef67ejo1udav8a177v8vbnhi6c6rbp.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default GoogleAuthen;
