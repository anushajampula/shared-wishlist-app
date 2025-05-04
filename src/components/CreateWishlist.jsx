import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function CreateWishlist() {
  const [name, setName] = useState('');
  const auth = getAuth();

  const handleCreate = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please log in");

    try {
      await addDoc(collection(db, "wishlists"), {
        name,
        createdBy: user.uid,
        createdByEmail: user.email,
        createdAt: Timestamp.now(),
        members: [user.uid]
      });
      alert("Wishlist created!");
      setName('');
    } catch (err) {
      console.error(err);
      alert("Failed to create wishlist");
    }
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 mr-2"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Wishlist name"
      />
      <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Wishlist
      </button>
    </div>
  );
}

export default CreateWishlist;