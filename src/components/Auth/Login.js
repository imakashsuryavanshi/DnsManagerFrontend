import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../helper.js';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Import useNavigate hook

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);
      // Handle successful login, e.g., store token in local storage
      localStorage.setItem('token', response.data.jwtToken);
      localStorage.setItem('userId', response.data.tokenOject.id);
      console.log('Logged in successfully', response.data);
      
      navigate('/dashboard'); // Navigate to dashboard
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid username or password'); // Set error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message if login fails */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">Don't have an account? <Link to="/register" className="font-semibold text-blue-500 hover:text-blue-600">Sign up here</Link></p> {/* Link to registration page */}
      </div>
    </div>
  );
};

export default Login;
