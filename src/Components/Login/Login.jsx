import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      
    const handleLogin =() =>{
        
    };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-450' >
        <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleLogin}>
            <h1 className='text-2xl font-semibold text-center mb-6'>Login </h1>
            <p className='text-l font-semibold text-center mb-4'>Welcome back to Money Matters</p><br />
            <div className='block text-gray-700'>
                <label>Email:<input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} 
                 className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required/></label> 
            </div>
            <div className='block text-gray-700'>
            <label>Password:<input type="password" placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)} 
             className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required/></label> 
            </div>
            
            <div className='mt-4 text-center' >
                <label htmlFor=""><input type="checkbox" className='text-align: left'/>Remember me</label>
                <p> <Link to="/forgotpassword"className='text-blue-600 hover:text-blue-700 text-align:right'>Forgot Password?</Link></p>
            </div>
            <button type='submit' className='w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>Login </button>

            <div className='mt-4 text-center'>
                <p>Don't have an account?<Link to="/register"className='text-blue-600 hover:text-blue-700 text-align:right'>Register</Link></p>
            </div>

        </form>   
        </div>
    </div>

  );
}

export default Login
