
'use client'

import { useState } from 'react'
import { FiCalendar, FiClock, FiUser, FiDollarSign, FiEdit, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface AppointmentListProps {
  appointments: Array<{
    id: number
    service: string
    staff: string
    date: string
    time: string
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    price: number
  }>
  onRefresh: () => void
}

const AppointmentList = ({ appointments, onRefresh }: AppointmentListProps) => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming')

  const upcomingAppointments = appointments.filter(
    apt => apt.status === 'pending' || apt.status === 'confirmed'
  )
  const pastAppointments = appointments.filter(apt => apt.status === 'completed')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-neutral-100 text-neutral-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FiClock className="w-4 h-4" />
      case 'confirmed':
        return <FiCalendar className="w-4 h-4" />
      case 'completed':
        return <FiCalendar className="w-4 h-4" />
      case 'cancelled':
        return <FiX className="w-4 h-4" />
      default:
        return <FiCalendar className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-xl p-4 border border-neutral-200 hover:border-primary-200 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-neutral-800 mb-1">
            {appointment.service}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-neutral-500">
            <FiUser className="w-4 h-4" />
            <span>{appointment.staff}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(appointment.status)}
              <span className="capitalize">{appointment.status}</span>
            </div>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-neutral-600">
          <div className="flex items-center space-x-1">
            <FiCalendar className="w-4 h-4" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiClock className="w-4 h-4" />
            <span>{appointment.time}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-sm font-medium text-neutral-700">
          <FiDollarSign className="w-4 h-4" />
          <span>{appointment.price}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <div className="flex space-x-2">
          {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
            <>
              <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors text-sm font-medium">
                <FiEdit className="w-4 h-4" />
                <span>Reschedule</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
                   <FiX className="w-4 h-4" />
                   <span>Cancel</span>
               </button>
             </>
           )}
           

           {appointment.status === 'completed' && (
             <button className="w-full py-2 px-4 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors text-sm font-medium">
               Leave Review
             </button>
           )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-neutral-800 mb-6">
          My Appointments
        </h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-neutral-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedTab === 'upcoming'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-neutral-600 hover:text-primary-600'
            }`}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedTab === 'past'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-neutral-600 hover:text-primary-600'
            }`}
          >
            Past ({pastAppointments.length})
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {selectedTab === 'upcoming' ? (
          <>
            {upcomingAppointments.length > 0 ? (
              <>
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                  <FiCalendar className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">
                  No upcoming appointments
                </h3>
                <p className="text-neutral-500 mb-6">
                  Ready to book your next beauty treatment?
                </p>
                <button className="btn-primary">
                  Book Appointment
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {pastAppointments.length > 0 ? (
              <>
                {pastAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                  <FiClock className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">
                  No past appointments
                </h3>
                <p className="text-neutral-500">
                  Your completed appointments will appear here
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AppointmentList
