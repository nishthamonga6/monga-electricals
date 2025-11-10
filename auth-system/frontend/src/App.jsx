import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

export default function App(){
  return (
    <div className="app">
      <nav>
        <Link to="/">Login</Link>
        {' | '}
        <Link to="/signup">Signup</Link>
        {' | '}
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </main>
    </div>
  )
}
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './utils/PrivateRoute'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
    </Routes>
  )
}
