import axios from 'axios'

const API = process.env.VITE_API_URL || 'http://localhost:5000'

export async function signup({ name, email, password }){
  const res = await axios.post(`${API}/auth/signup`, { name, email, password })
  if(res.data?.token) localStorage.setItem('auth_token', res.data.token)
  return res.data
}

export async function login({ email, password }){
  const res = await axios.post(`${API}/auth/login`, { email, password })
  if(res.data?.token) localStorage.setItem('auth_token', res.data.token)
  return res.data
}

export async function getUser(){
  const token = localStorage.getItem('auth_token')
  if(!token) throw new Error('Not authenticated')
  const res = await axios.get(`${API}/auth/user`, { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

export function logout(){
  localStorage.removeItem('auth_token')
}
import axios from 'axios'

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export async function signup(data){
  const res = await axios.post(`${API}/auth/signup`, data)
  return res.data
}

export async function login(data){
  const res = await axios.post(`${API}/auth/login`, data)
  return res.data
}

export function saveToken(token){
  localStorage.setItem('monga_token', token)
}

export function getToken(){
  return localStorage.getItem('monga_token')
}

export function clearToken(){
  localStorage.removeItem('monga_token')
}
