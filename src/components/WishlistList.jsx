import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

function WishlistList() {
  const [wishlists, setWishlists] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const createdQuery = query(collection(db, 'wishlists'), where('createdBy', '==', user.uid));
    const sharedQuery = query(collection(db, 'wishlists'), where('collaborators', 'array-contains', user.email));

    const unsubscribe1 = onSnapshot(createdQuery, (querySnapshot) => {
      const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWishlists((prev) => [...prev.filter(w => w.source !== 'shared'), ...list.map(w => ({ ...w, source: 'created' }))]);
    });

    const unsubscribe2 = onSnapshot(sharedQuery, (querySnapshot) => {
      const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWishlists((prev) => [...prev.filter(w => w.source !== 'created'), ...list.map(w => ({ ...w, source: 'shared' }))]);
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this wishlist?");
    if (confirmDelete) {
      await deleteDoc(doc(db, 'wishlists', id));
    }
  };

  const handleEdit = async (id, currentName) => {
    const newName = prompt("Enter new wishlist name:", currentName);
    if (newName && newName.trim() !== '') {
      await updateDoc(doc(db, 'wishlists', id), { name: newName.trim() });
    }
  };

  const handleInvite = async (id) => {
    const email = prompt("Enter email of collaborator:");
    if (!email || !email.trim()) return;

    await updateDoc(doc(db, 'wishlists', id), {
      collaborators: arrayUnion(email.trim()),
    });
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Your Wishlists</h3>
      {wishlists.length === 0 ? (
        <p>No wishlists yet.</p>
      ) : (
        <ul className="space-y-2">
          {wishlists.map((wishlist) => (
            <li key={wishlist.id} className="border p-3 rounded flex justify-between items-start">
              <div>
                <Link to={`/wishlist/${wishlist.id}`} className="font-medium text-blue-600 hover:underline">
                  {wishlist.name}
                </Link>
                <br />
                <small>Created: {wishlist.createdAt?.toDate().toLocaleString()}</small>
                <br />
                {wishlist.source === 'shared' && <span className="text-sm text-gray-500">(Shared with you)</span>}
              </div>
              <div className="space-x-2">
                {wishlist.source === 'created' && (
                  <>
                    <button onClick={() => handleEdit(wishlist.id, wishlist.name)} className="text-yellow-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(wishlist.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                    <button onClick={() => handleInvite(wishlist.id)} className="text-green-600 hover:underline">
                      Invite
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WishlistList;