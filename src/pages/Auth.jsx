import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login successful!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Signup successful!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded w-64"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded w-64"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 cursor-pointer hover:underline"
      >
        {isLogin ? 'Create an account' : 'Already have an account? Log in'}
      </p>
    </div>
  );
};

export default Auth;