import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8080/api/auth/forgot-password", {email});
      setMessage("✅ Reset link sent to your email.");
    } catch (error){
      setMessage("❌  Error: Unable to send reset email.");
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-xl'>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forgot Password</h2>
      <p>Enter your emailID below and password reset instructions will be email to you.</p><br /> 

      <form onSubmit={handleForgotPassword} className='space-y-5'>
        <div>
          <label htmlFor="email" className='block text-xl font-semibold text-gray-600 mb-5'>Email address</label>
          <input 
          type="email" 
          id='email' className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500' 
          placeholder='Enter your email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required />
        </div>
        
      <button type='submit' className='w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200'>
        Send Request link
      </button>
      <button onClick={(e) => navigate('/login')} className='w-1/2 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition duration-200'>Cancel</button>
      </form>
      {message && (<p className='mt-4 text-center text-green-600 font-medium'>{message}</p>
    )}
    </div>
    </div>
  );
};

export default ForgotPassword;
