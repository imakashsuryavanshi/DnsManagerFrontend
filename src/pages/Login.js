import React from 'react';
import Login from '../components/Auth/Login.js';

const LoginPage = () => {
  return (
    <div className='bg-gray-100'>
       <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center ">Welcome to DNS Manager</h1>
      <Login/>
    </div>
  );
};

export default LoginPage;
