import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername]= useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Perform signup logic here
  };
  return (
    <div className='wrapper'>
        <form action="">
            <h1>Sign Up </h1>
            <div className='input-box'>
                <input type="text" placeholder='Username'value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div  className='input-box'>
                <input type="password" placeholder='Password'value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div  className='input-box'>
                <input type="verify password" placeholder='Confirm Password'value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
            </div>
            <div  className='input-box'>
                <input type="email" placeholder='email'value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            
            <button type='submit'>Sign Up </button>

            <div className='Signup-link'>
                <p>Already have an account?<Link to= "/login">Login</Link></p>
            </div>

       </form>   
      
    </div>
  )
}

export default Signup
