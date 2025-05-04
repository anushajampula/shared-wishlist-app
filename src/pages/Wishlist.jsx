import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/auth');
      } else {
        setUser(currentUser);
        const q = query(collection(db, 'wishlists'), where('uid', '==', currentUser.uid));
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const fetchedItems = snapshot.docs.map(doc => ({
            id: doc.id,
            text: doc.data().text
          }));
          setItems(fetchedItems);
        });
        return unsubscribeSnapshot;
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const addItem = async () => {
    if (!input.trim() || !user) return;
    await addDoc(collection(db, "wishlists"), {
      text: input.trim(),
      uid: user.uid,
    });
    setInput('');
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "wishlists", id));
  };

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">My Wishlist</h2>
      <div className="mb-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="New item"
          className="border p-2 mr-2 rounded"
        />
        <button onClick={addItem} className="bg-green-500 text-white p-2 rounded">
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {items.map((it) => (
          <li key={it.id} className="mb-2 flex justify-between items-center">
            <span>{it.text}</span>
            <button
              onClick={() => deleteItem(it.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}