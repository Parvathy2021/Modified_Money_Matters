import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername]= useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  // State for error messages
  const [errors, setErrors] = useState({});

  // Password Regex pattern
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]).{8,16}$/;
  const validatePassword = (password) =>{
    return password.length >=8;
  }
  //email format validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      // Validate all form fields
    const validateForm = () =>{
      const newErrors = {};

      if (!username || username.length < 3 || username.length > 30) {
        newErrors.username = 'Username must be between 3 and 30 characters.';
      }
      if (!password.match(passwordRegex) || !validatePassword(password)) {
        newErrors.password = 'Password must be between 8-16 characters, include at least one letter, one number, and one special character.';
      }
      if (confirmPassword !== password) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
      if (!email.match(emailPattern)) {
        newErrors.email = 'Please enter a valid email address.';
      }

      setErrors(newErrors);
      if(Object.keys(newErrors).length > 0){
        setValidationMessage('Some fields are not following the needs. Please check the form')
      }else {
        setValidationMessage('');
      }
      return Object.keys(newErrors).length === 0;
    
  };


    // Handle form submission
  const handleSignup = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with signup logic
      console.log('Signup successful!');
      // Clear form after successful signup
    }
  };
  return (
    <div className='wrapper'>
        <form onSubmit={handleSignup}>
            <h1>Register </h1>
            {validationMessage && <div className="validation-message">{validationMessage}</div>}
            <div className='input-box'>
                <label> Username: <input type="text" placeholder='Username'value={username} onChange={(e) => setUsername(e.target.value)} required/></label>
                {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div  className='input-box'>
            <label> Password: <input type="password" placeholder='Password'value={password} onChange={(e) => setPassword(e.target.value)} required/></label>
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div  className='input-box'>
            <label> Confirm password: <input type="password" placeholder='Confirm Password'value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/></label>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            <div  className='input-box'>
            <label> email: <input type="email" placeholder='email'value={email} onChange={(e) => setEmail(e.target.value)} required/></label>
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            
            <button type='submit'>Register </button>

            <div className='Signup-link'>
                <p>Already have an account?<Link to= "/login">Login</Link></p>
            </div>

       </form>   
      
    </div>
  )
}

export default Register
