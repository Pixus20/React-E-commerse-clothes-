import React from 'react'

import './Navbar.css'

import navlogo from '../../Assets/nav-logo.svg'
import navprofile from '../../Assets/nav-profile.svg'

const Navbar = () => {
   return (
      <div className='navbar'>
         <img src={navlogo} alt="" className="nav_logo" />
         <img src={navprofile} alt="" className="nav_profile" />
      </div>
   )
}

export default Navbar