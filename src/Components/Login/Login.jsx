import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault(); 

   
    let valid = true;
    let emailError = '';
    let passwordError = '';

    // Email validation
    if (!email) {
      emailError = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = 'Please enter a valid email address';
      valid = false;
    }

    // Password validation
    if (!password) {
      passwordError = 'Password is required';
      valid = false;
    }

    
    if (!valid) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    
    setErrors({ email: '', password: '' }); // Reset errors if form is valid

    // Redirect to the expense page
    navigate('/expense');  // This should be executed after successful signup
 
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-450'>
      <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleLogin}>
          <h1 className='text-2xl font-semibold text-center mb-6'>Login</h1>
          <p className='text-l font-semibold text-center mb-4'>Welcome back to Money Matters</p><br />
          
          <div className='block text-gray-700'>
            <label>Email:
              <input 
                type="email" 
                placeholder='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                required 
              />
            </label>
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>} {/* Display email error */}
          </div>

          <div className='block text-gray-700'>
            <label>Password:
              <input 
                type="password" 
                placeholder='Password'  
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                required
              />
            </label>
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>} {/* Display password error */}
          </div>
          
          <div className='mt-4 text-center'>
            <label htmlFor="">
              <input type="checkbox" className='text-align: left' />Remember me
            </label>
            <p> 
              <Link to="/forgotpassword" className='text-blue-600 hover:text-blue-700 text-align:right'>
                Forgot Password?
              </Link>
            </p>
          </div>

          <button 
            type='submit' 
            className='w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            Login
          </button>

          <div className='mt-4 text-center'>
            <p>Don't have an account?
              <Link to="/register" className='text-blue-600 hover:text-blue-700 text-align:right'>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
