import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Banner from './components/Banner'
import Favorites from './components/Favorites'
import Movies from './components/Movies'
import Navbar from './components/Navbar'

function App() {

  return (
    <BrowserRouter>
      <div className='relative w-full h-screen overflow-y-scroll bg-gray-50 max-w-[1700px] mx-auto'>
        <Navbar />
        <div>
        </div>
        <Routes>
          <Route path='/' element={<>
            <Banner />
            <Movies />
          </>} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App