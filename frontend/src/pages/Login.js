import React from 'react';
import FacebookAuthen from '../components/FacebookAuthen';

import GoogleAuthen from '../components/GoogleAuthen';

function Login({ setToken }) {
  return (
    <div className="flex justify-center h-screen items-center">
      <FacebookAuthen setToken={setToken} />
      <GoogleAuthen />
    </div>
  );
}

export default Login;
