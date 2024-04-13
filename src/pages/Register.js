import React from 'react';
import Register from '../components/Auth/Register.js';

const RegisterPage = () => {
  return (
    <div className='bg-gray-100'>
    <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center ">Welcome to DNS Manager</h1>
   <Register/>
 </div>
  );
};

export default RegisterPage;
