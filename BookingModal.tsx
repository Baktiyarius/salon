'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import BookingForm from './BookingForm'

interface BookingModalProps {
  service: {
    id: number
    title: string
    description: string
    category: string
    price: number
    duration: number
    image: string
    staff: Array<{
      id: number
      name: string
      specialization: string
    }>
  }
  isOpen: boolean
  onClose: () => void
}

const BookingModal = ({ service, isOpen, onClose }: BookingModalProps) => {
  const { user } = useAuth()
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return `${mins}m`
    }
  }

  const formatPrice = (price: number) => {
    return `$${price}`
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/20 flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h2 className="text-2xl font-display font-bold mb-2">
                    Book {service.title}
                  </h2>
                  <div className="flex items-center space-x-6 text-sm opacity-90">
                    <div className="flex items-center space-x-2">
                      <FiDollarSign className="w-4 h-4" />
                      <span>{formatPrice(service.price)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-4 h-4" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>{service.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Steps Indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-8">
                  <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-600' : 'text-neutral-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 1 ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      1
                    </div>
                    <span className="text-sm font-medium">Date & Time</span>
                  </div>
                  
                  <div className="w-8 h-px bg-neutral-200"></div>
                  
                  <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-600' : 'text-neutral-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 2 ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      2
                    </div>
                    <span className="text-sm font-medium">Details</span>
                  </div>
                  
                  <div className="w-8 h-px bg-neutral-200"></div>
                  
                  <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-primary-600' : 'text-neutral-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 3 ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      3
                    </div>
                    <span className="text-sm font-medium">Confirm</span>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <BookingForm
                service={service}
                user={user}
                step={step}
                onStepChange={setStep}
                onClose={onClose}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BookingModal