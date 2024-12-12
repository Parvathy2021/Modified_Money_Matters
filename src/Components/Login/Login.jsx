import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      
    const handleLogin =() =>{
        
    };

  return (
    <div className='wrapper'>
        <form action="">
            <h1>Login </h1>
            <div className='input-box'>
                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div  className='input-box'>
                <input type="password" placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            
            <div className='remember-forgot'>
                <label htmlFor=""><input type="checkbox" />Remember me</label>
                <a href="#">Forgot password?</a>
            </div>
            <button type='submit'>Login </button>

            <div className='signup-link'>
                <p>Don't have an account?<Link to="/signup">Signup</Link></p>
            </div>

       </form>   
    </div>

  );
}

export default Login
