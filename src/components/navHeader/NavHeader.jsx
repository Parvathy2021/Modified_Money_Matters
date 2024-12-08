import React from 'react'
import { Link } from 'react-router-dom'

import './NavHeader.css'

const NavHeader = () => {
    return (
        <div>
            <nav>
                <Link className='nav-link' to='/'>Home</Link>
                <Link className='nav-link' to='/about'>About</Link>
                <Link className='nav-link' to='/login'>Login</Link>
                <Link className='nav-link' to='/register'>Register</Link>
            </nav>
        </div>
    )
}

export default NavHeader