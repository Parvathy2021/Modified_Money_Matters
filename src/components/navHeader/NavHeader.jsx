import React from 'react'
import { Link } from 'react-router-dom'

import './NavHeader.css'

const NavHeader = () => {
    return (
        <div className='nav-link'>
            <nav>
                <Link className='link-pad' to='/'>Home</Link>
                <Link className='link-pad' to='/about'>About</Link>
                <Link className='link-pad' to='/login'>Login</Link>
                <Link className='link-pad' to='/register'>Register</Link>
            </nav>
        </div>
    )
}

export default NavHeader