import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../utils/auth'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      await login({ email, password })
      nav('/dashboard')
    }catch(err){
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
import React, { useState } from 'react'
import { login, saveToken } from '../utils/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      const data = await login({ email, password })
      saveToken(data.token)
      navigate('/dashboard')
    }catch(err){
      setError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-box" onSubmit={submit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
  <div className="muted">Don&apos;t have an account? <Link to="/signup">Sign up</Link></div>
      </form>
    </div>
  )
}
