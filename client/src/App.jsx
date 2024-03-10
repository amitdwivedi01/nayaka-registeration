import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register'
import Upload from './components/Upload';
import Details from './components/Details';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';

function App() { 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/details' element={<Details />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
