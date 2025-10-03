'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

interface User {
  _id: string
  name: string
  email: string
  phone: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Configure axios defaults
if (typeof window !== 'undefined') {
  axios.defaults.baseURL = API_BASE_URL
  axios.defaults.timeout = 10000
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => */
      try {
        const token = Cookies.get('token')
        if (!token) {
          setLoading(false)
          return
        }

        // Set authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const response = await axios.get('/auth/me')
        setUser(response.data.user)
      } catch (error) {
        console.error('Auth check failed:', error)
        Cookies.remove('token')
        delete axios.defaults.headers.common['Authorization']
      } finally {
        setLoading(false)
      }
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await axios.post('/auth/login', { email, password })
      
      const { token, user: userData } = response.data
      
      // Store token in cookie
      Cookies.set('token', token, { 
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      
      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setUser(userData)
      return true
    } catch (error: any) {
      console.error('Login failed:', error)
      throw new Error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await axios.post('/auth/register', { 
        name, 
        email, 
        phone, 
        password 
      })
      
      const { token, user: userData } = response.data
      
      // Store token in cookie
      Cookies.set('token', token, { 
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      
      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setUser(userData)
      return true
    } catch (error: any) {
      console.error('Registration failed:', error)
      throw new Error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
