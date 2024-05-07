"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {useState } from 'react';

export default function Forget() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async () => {
    try {
      setLoading(true); 

      const response = await axios.post('/api/users/forget', {email});
        console.log(response.data);
      setLoading(false);

      router.push('/login');

    } catch (err) {
      setLoading(false);
      console.error(err); 
    }
  };

  return (
    <div>
      <h1>Forget Password</h1>
      <h1 >{loading ? 'loading' : ''}</h1>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="p-2 border border-gray-300 rounded-md" onClick={handleForgetPassword}>
        Send Reset Email
      </button>
      <Link href="/login">Go to Login Page</Link>
      <Link href="/signup">Go to Signup Page</Link>
    </div>
  );
}