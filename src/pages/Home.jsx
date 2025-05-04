import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        Welcome to the Shared Wishlist App
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Create, share, and manage wishlists with your friends or family using a group code.
      </p>
      <div className="flex space-x-4">
        <Link to="/wishlist" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
          Go to Wishlist
        </Link>
        <Link to="/auth" className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
          Login/Signup
        </Link>
      </div>
    </div>
  );
}