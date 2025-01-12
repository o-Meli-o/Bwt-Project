import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import BwtPage from './pages/BwtPage'
import BwtDecodingPage from './pages/BwtDecodingPage'
import RunLengthEncodingPage from './pages/RunLengthEncodingPage'
import HuffmanCodingPage from './pages/HuffmanCodingPage'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<BwtPage/>} />
        <Route path='/bwt-decoding' element={<BwtDecodingPage/>} />
        <Route path='/run-length-encoding' element={<RunLengthEncodingPage/>} />
        <Route path='/huffman-coding' element={<HuffmanCodingPage/>} />
      </Routes>
    </div>
  )
}

export default App
