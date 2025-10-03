'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
    setIsMenuOpen(false)
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg lg:text-xl">E</span>
            </div>
            <span className="font-display font-bold text-xl lg:text-2xl text-gradient">
              Éclat Salon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Services
            </Link>
            <Link href="/booking" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Booking
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors">
                  <FiUser className="w-4 h-4" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 rounded-b-2xl shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="/" 
                className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/booking" 
                className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Booking
              </Link>
              <Link 
                href="/contact" 
                className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <hr className="border-neutral-200" />
              
              {user ? (
                <div className="space-y-4">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="w-4 h-4" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link 
                    href="/login" 
                    className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="block btn-primary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
