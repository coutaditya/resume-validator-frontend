import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import ButtonAppBar from './components/AppBar'
import { Homepage } from './pages/Homepage'
import { Query } from './pages/Query'
import { Comparison } from './pages/Comparison'


function App() {
  return (
    <BrowserRouter>
      <ButtonAppBar />
      <div style={{ marginTop: '140px', flexGrow: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/resume-query" element={<Query />} />
          <Route path="/resume-jd-comparison" element={<Comparison />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
