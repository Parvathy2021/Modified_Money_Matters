import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'


function App() {
                            
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element= {<Register />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
