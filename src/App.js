import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.js';
import Application from './components/Application/Application.js'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/application/:id' element={<Application/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
