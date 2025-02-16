import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar-container'>
       <ul>
        <NavLink to='/' className='navlink'>
        <p>BWT</p>
        <hr className='navlink-hr'/>
        </NavLink>
        <NavLink to='/bwt-decoding' className='navlink'>
        <p>BWT Decoding</p>
        <hr className='navlink-hr'/>
        </NavLink>
        <NavLink to='/run-length-encoding' className='navlink'>
        <p>Run-Length Encoding</p>
        <hr className='navlink-hr'/>
        </NavLink>
        <NavLink to='/huffman-coding' className='navlink'>
        <p>Huffman Coding</p>
        <hr className='navlink-hr'/>
        </NavLink>
       </ul>
    </div>
  )
}

export default Navbar
