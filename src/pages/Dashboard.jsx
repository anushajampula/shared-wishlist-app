import React from 'react';
import CreateWishlist from './components/CreateWishlist';
import WishlistList from './components/WishlistList';

function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold p-4">Dashboard</h2>
      <CreateWishlist />
      <WishlistList />
    </div>
  );
}

export default Dashboard;