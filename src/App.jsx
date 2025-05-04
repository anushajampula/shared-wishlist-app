import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Auth from './pages/Auth.jsx';
import { auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import WishlistDetail from './pages/WishlistDetail.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => signOut(auth);

  return (
    <>
      <nav className="p-4 bg-white shadow flex justify-between items-center px-8">
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 font-semibold">Home</Link>
          <Link to="/wishlist" className="text-blue-600 font-semibold">Wishlist</Link>
          {!user && <Link to="/auth" className="text-blue-600 font-semibold">Login/Signup</Link>}
        </div>

        {user && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">{user.email}</span>
            <button onClick={handleLogout} className="text-red-500 font-semibold hover:underline">
              Logout
            </button>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/wishlist/:wishlistId" element={<WishlistDetail />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;