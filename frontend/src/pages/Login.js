import React from 'react';
import FacebookAuthen from '../components/FacebookAuthen';

import GoogleAuthen from '../components/GoogleAuthen';

function Login({ setToken }) {
  return (
    <div className="flex justify-center h-screen items-center">
      <div className='h-1/2 w-1/2 flex justify-center'>
      <FacebookAuthen setToken={setToken} />
      <GoogleAuthen setToken={setToken} />
      </div>
    </div>
  );
}

export default Login;
