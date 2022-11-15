import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class Navbar extends Component {
  render() {
    return (
      <nav className='flex justify-between  px-3  py-2 md:py-3 p-nice  text-2xl font-semibold text-white absolute top-0 left-0  z-20 w-full  bg-black/10  '>
        <Link to='/'>
          Movie App</Link>

        <Link to='/favorites' className='text-xl'>
          Favorites</Link>
      </nav>
    )
  }
}

export default Navbar