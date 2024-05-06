import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ButtonAppBar from './components/AppBar'
import { Homepage } from './pages/Homepage'
import { Query } from './pages/Query'
import { Comparison } from './pages/Comparison'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function App() {
  const [serverConnected, setServerConnected] = useState("info")
  const [serverStatus, setServerStatus] = useState("Connecting to server")
  const [displayServerStatus, setDisplayServerStatus] = useState(true)

  useEffect(()=>{
    fetch("https://dssm-project.onrender.com/")
    .then(res=> res.json())
    .then(data => {
      console.log(data)
      setServerConnected("success")
      setServerStatus("Connected to server")
      setTimeout(()=>{
        setDisplayServerStatus(false)
      }, 2000)
    })
    .catch(err => {
      console.log(err)
      setServerConnected("error")
      setServerStatus("Could not connect to server. Try again!")
    })
  }, [])
  
  return (
    <BrowserRouter>
      <ButtonAppBar />
      <div style={{ marginTop: '140px', flexGrow: 1, overflowY: 'auto' }}>
        {(displayServerStatus) ? <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity={serverConnected}>
            {serverStatus}
          </Alert>
        </Stack> : <></>}
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
