import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Banner from './components/Banner'
import Movies from './components/Movies'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className=''>
        <Navbar />
        <Banner />
        <Routes>
          <Route path='/' element={<Movies />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App