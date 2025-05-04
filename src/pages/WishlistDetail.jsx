import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function WishlistDetail() {
  const { wishlistId } = useParams();
  const [wishlist, setWishlist] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchWishlist = async () => {
      const docRef = doc(db, 'wishlists', wishlistId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWishlist(data);
        const editable =
          data.createdBy === user?.uid || data.collaborators?.includes(user?.email);
        setIsEditable(editable);
      }
    };
    fetchWishlist();
  }, [wishlistId, user]);

  useEffect(() => {
    const q = query(collection(db, 'products'), where('wishlistId', '==', wishlistId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setProducts(list);
    });

    return () => unsubscribe();
  }, [wishlistId]);

  const addProduct = async () => {
    if (!newProduct.trim()) return;

    await addDoc(collection(db, 'products'), {
      name: newProduct.trim(),
      wishlistId,
      createdBy: user.uid,
      createdAt: new Date(),
    });

    setNewProduct('');
  };

  const deleteProduct = async (id) => {
    const confirm = window.confirm("Delete this product?");
    if (confirm) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  const editProduct = async (id, currentName) => {
    const newName = prompt("New product name:", currentName);
    if (newName && newName.trim() !== '') {
      await updateDoc(doc(db, 'products', id), { name: newName.trim() });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{wishlist?.name || 'Wishlist'}</h2>

      {isEditable && (
        <div className="mb-4">
          <input
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            placeholder="Add product name"
            className="border p-2 mr-2"
          />
          <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </div>
      )}

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul className="space-y-3">
          {products.map((prod) => (
            <li key={prod.id} className="border p-3 rounded flex justify-between items-center">
              <span>{prod.name}</span>
              {isEditable && (
                <div className="space-x-2">
                  <button onClick={() => editProduct(prod.id, prod.name)} className="text-yellow-600 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(prod.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WishlistDetail;