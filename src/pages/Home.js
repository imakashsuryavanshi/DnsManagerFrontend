import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="max-w-lg w-full p-8 rounded-lg shadow-lg bg-white text-center transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the DNS Manager</h2>
        <p className="text-lg text-gray-600 mb-8">Manage all your DNS settings, domains, and configurations with ease.</p>
        <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out inline-block">Get Started</a>
      </div>
    </div>
  );
};

export default Home;
