import React, { useEffect, useState } from 'react'
import { getUser, logout } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [user, setUser] = useState(null)
  const nav = useNavigate()

  useEffect(()=>{
    getUser().then(r=>{
      setUser(r.user)
    }).catch(()=>{
      nav('/')
    })
  },[])

  function doLogout(){
    logout()
    nav('/')
  }

  if(!user) return <p>Loading...</p>
  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>{user.email}</p>
      <button onClick={doLogout}>Logout</button>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken, clearToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    async function load(){
      try{
        const token = getToken()
        const res = await axios.get('http://localhost:4000/auth/user', { headers: { Authorization: `Bearer ${token}` } })
        setUser(res.data.user)
      }catch(err){
        setError('Failed to load user')
      }
    }
    load()
  },[])

  function logout(){
    clearToken()
    navigate('/login')
  }

  if (error) return <div className="container">{error}</div>
  if (!user) return <div className="container">Loading...</div>

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Member since: {new Date(user.createdAt).toLocaleString()}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
