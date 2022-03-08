import GoogleLogin from 'react-google-login';
import React from 'react';

function GoogleAuthen() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId="229990142796-eve4su8svntatkl23b206v10m293hsiv.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default GoogleAuthen;
