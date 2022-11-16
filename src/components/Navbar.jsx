import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation();


  return (
    <nav className={`flex justify-between sm:justify-start  px-3  py-2 md:py-3 p-nice  text-2xl font-semibold  z-20 w-full ${location.pathname === '/' ? 'absolute top-0 left-0 bg-black/20 text-white' : 'text-sky-500'} `}>
      <Link to='/' className='sm:text-3xl '>
        Movie App</Link>

      <Link to='/favorites' className='text-xl sm:self-end sm:ml-10  '>
        Favorites</Link>
    </nav>
  )
}

export default Navbar