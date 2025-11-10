import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../utils/auth'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      await signup({ name, email, password })
      nav('/dashboard')
    }catch(err){
      setError(err.message || 'Signup failed')
    }
  }

  return (
    <div className="auth-form">
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Create account</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
import React, { useState } from 'react'
import { signup, saveToken } from '../utils/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      const data = await signup({ name, email, password })
      saveToken(data.token)
      navigate('/dashboard')
    }catch(err){
      setError(err?.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-box" onSubmit={submit}>
        <h2>Sign up</h2>
        {error && <div className="error">{error}</div>}
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Create account</button>
        <div className="muted">Already have an account? <Link to="/login">Login</Link></div>
      </form>
    </div>
  )
}
