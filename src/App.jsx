import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'

function App() {
                            
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Login />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element= {<Signup />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
