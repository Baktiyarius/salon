'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

interface BookingFormProps {
  service: {
    id: number
    title: string
    category: string
    price: number
    duration: number
    staff: Array<{
      id: number
      name: string
      specialization: string
    }>
  }
  user: any
  step: number
  onStepChange: (step: number) => void
  onClose: () => void
}

const BookingForm = ({ service, user, step, onStepChange, onClose }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    staff: '',
    comment: '',
    specialInstructions: ''
  })
  const [availableSlots, setAvailableSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [stepValid, setStepValid] = useState(false)

  // Mock available dates (next 30 days)
  const getAvailableDates = () => {
    const availableDates = []
    const today = new Date()
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip Sundays (assuming salon is closed on Sundays)
      if (date.getDay() !== 0) {
        availableDates.push(date)
      }
    }
    
    return availableDates
  }

  // Mock available time slots
  const getAvailableTimeSlots = (staffId: string) => {
    if (!staffId) return []
    
    const slots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ]
    
    // Filter out some random slots to simulate availability
    return slots.filter((_, index) => Math.random() > 0.3)
  }

  useEffect(() => {
    // Validate current step
    validateStep()
  }, [formData, step])

  useEffect(() => {
    if (formData.staff && formData.date) {
      setAvailableSlots(getAvailableTimeSlots(formData.staff))
    }
  }, [formData.staff, formData.date])

  const validateStep = () => {
    switch (step) {
      case 1:
        setStepValid(!!(formData.date && formData.time && formData.staff))
        break
      case 2:
        setStepValid(true) // Always valid for details step
        break
      case 3:
        setStepValid(!!(formData.date && formData.time && formData.staff))
        break
      default:
        setStepValid(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (stepValid && step < 3) {
      onStepChange(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      onStepChange(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Appointment booked successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedStaff = service.staff.find(s => s.id.toString() === formData.staff)

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step 1: Date & Time Selection */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Staff Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-4">
              Select Specialist
            </label>
            <div className="grid gap-3">
              {service.staff.map((staff) => (
                <div key={staff.id}>
                  <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary-200 hover:bg-primary-50">
                    <input
                      type="radio"
                      name="staff"
                      value={staff.id}
                      checked={formData.staff === staff.id.toString()}
                      onChange={(e) => handleInputChange('staff', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-full border-2 mr-4 flex items-center justify-center ${
                      formData.staff === staff.id.toString() 
                        ? 'border-primary-500 bg-primary-500 text-white' 
                        : 'border-neutral-200'
                    }`}>
                      <FiUser className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-800">{staff.name}</h3>
                      <p className="text-sm text-neutral-500">{staff.specialization}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-4">
              Select Date
            </label>
            <div className="grid grid-cols-5 gap-2">
              {getAvailableDates().map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleInputChange('date', date.toISOString().split('T')[0])}
                  className={`p-3 text-center rounded-xl border transition-all ${
                    formData.date === date.toISOString().split('T')[0]
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-neutral-200 hover:border-primary-200'
                  }`}
                >
                  <div className="text-sm font-medium">{date.getDate()}</div>
                  <div className="text-xs">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {availableSlots.length > 0 && (
            <>
              <label className="block text-sm font-medium text-neutral-700 mb-4">
                Select Time
              </label>
              <div className="grid grid-cols-4 gap-2">
                {availableSlots.map((timeSlot, index) => (
                  <button
                    key={index}
                    onClick={() => handleInputChange('time', timeSlot)}
                    className={`p-3 text-center rounded-xl border transition-all ${
                      formData.time === timeSlot
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-neutral-200 hover:border-primary-200'
                    }`}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Step 2: Additional Details */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-6">Appointment Details</h3>
            
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Comments (Optional)
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  placeholder="Any specific requests or notes for your appointment..."
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={e => handleInputChange('specialInstructions', e.target.value)}
                  placeholder="Any allergies, sensitivities, or special requirements..."
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-6">Confirm Your Appointment</h3>
            
            <div className="bg-gradient-to-br from-salon-cream to-salon-blush rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-neutral-500">Service</span>
                  <p className="font-medium text-neutral-800">{service.title}</p>
                </div>
                <div>
                  <span className="text-sm text-neutral-500">Price</span>
                  <p className="font-medium text-neutral-800">${service.price}</p>
                </div>
                <div>
                  <span className="text-sm text-neutral-500">Duration</span>
                  <p className="font-medium text-neutral-800">
                    {Math.floor(service.duration / 60)}h {service.duration % 60}m
                  </p>
                </div>
                <div>
                  <span className="text-sm text-neutral-500">Specialist</span>
                  <p className="font-medium text-neutral-800">{selectedStaff?.name}</p>
                </div>
                <div>
                  <span className="text-sm text-neutral-500">Date</span>
                  <p className="font-medium text-neutral-800">
                    {new Date(formData.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-neutral-500">Time</span>
                  <p className="font-medium text-neutral-800">{formData.time}</p>
                </div>
              </div>

              {(formData.comment || formData.specialInstructions) && (
                <div className="pt-4 border-t border-neutral-200">
                  <h4 className="font-medium text-neutral-800 mb-2">Your Notes</h4>
                  {formData.comment && (
                    <p className="text-sm text-neutral-600 mb-2">
                      <span className="font-medium">Comments:</span> {formData.comment}
                    </p>
                  )}
                  {formData.specialInstructions && (
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">Special Instructions:</span> {formData.specialInstructions}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-neutral-200">
        <button
          onClick={handlePrevious}
          disabled={step === 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
            step === 1
              ? 'text-neutral-400 cursor-not-allowed'
              : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
          }`}
        >
          <FiChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex space-x-2">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-2 h-2 rounded-full transition-all ${
                stepNumber === step
                  ? 'bg-primary-500'
                  : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>

        {step < 3 ? (
          <button
            onClick={handleNext}
            disabled={!stepValid}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
              stepValid
                ? 'btn-primary'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <FiChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
              loading
                ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Booking...</span>
              </>
            ) : (
              <>
                <FiCalendar className="w-4 h-4" />
                <span>Confirm Booking</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default BookingForm
