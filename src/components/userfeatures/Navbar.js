import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className='nav-bar'>
            
            <div className='logo'><h1>Dynamic Form Generator</h1></div>
        <div className='nav-links'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>Dashboard</Link></li>
                <li><Link to='/'>Links</Link></li>
            </ul>
            
        </div>
        <div className='nav-btn'>
                <Link to='/'>Login</Link>
                <Link to='/signup'>Signup</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar