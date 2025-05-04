// src/pages/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Wishlist App</h1>
      <p className="text-gray-600">Create and share wishlists with your friends and family.</p>
      <div className="space-x-4">
        <Link to="/auth" className="px-4 py-2 bg-blue-500 text-white rounded">Login / Signup</Link>
        <Link to="/wishlist" className="px-4 py-2 bg-green-500 text-white rounded">Go to Wishlist</Link>
      </div>
    </div>
  );
}

export default Welcome;