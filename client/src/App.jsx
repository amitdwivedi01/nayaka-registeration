import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register'
import Upload from './components/Upload';
import Details from './components/Details';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';

const host = 'https://attractive-rose-ray.cyclic.app';

function App() { 
  // const host = 'http://localhost:5000'
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register host={host} />} />
        <Route path='/upload' element={<Upload host={host}/>} />
        <Route path='/details' element={<Details host={host}/>} />
        <Route path='/nayakadmin' element={<AdminDashboard host={host}/>} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
