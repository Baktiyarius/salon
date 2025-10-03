'use client'

import { motion } from 'framer-motion'
import { FiClock, FiDollarSign, FiUsers, FiCalendar } from 'react-icons/fi'

interface ServiceCardProps {
  service: {
    id: number
    title: string
    description: string
    shortDescription: string
    category: string
    price: number
    duration: number
    image: string
    isPopular: boolean
    tags: string[]
    staff: Array<{
      id: number
      name: string
      specialization: string
    }>
  }
  onBookService: (service: ServiceCardProps['service']) => void
}

const ServiceCard = ({ service, onBookService }: ServiceCardProps) => {
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

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Popular Badge */}
        {service.isPopular && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-medium rounded-full">
            Popular
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {service.category}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-display font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-neutral-600 mb-4 leading-relaxed text-sm">
          {service.shortDescription}
        </p>

        {/* Service Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-neutral-600">
            <FiDollarSign className="w-4 h-4 text-green-500" />
            <span className="font-medium">{formatPrice(service.price)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-neutral-600">
            <FiClock className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{formatDuration(service.duration)}</span>
          </div>
        </div>

        {/* Staff Info */}
        {service.staff && service.staff.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-2">
              <FiUsers className="w-4 h-4 text-purple-500" />
              <span className="font-medium">
                {service.staff.length} Specialist{service.staff.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {service.staff.slice(0, 2).map((staff) => (
                <span
                  key={staff.id}
                  className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs"
                >
                  {staff.name}
                </span>
              ))}
              {service.staff.length > 2 && (
                <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs">
                  +{service.staff.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {service.tags && service.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {service.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-50 text-primary-600 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
              {service.tags.length > 3 && (
                <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded-full text-xs">
                  +{service.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => onBookService(service)}
            className="flex-1 btn-primary py-3 text-center group"
          >
            <FiCalendar className="inline-block w-4 h-4 mr-2" />
            Book Now
          </button>
          
          <button className="px-4 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 text-neutral-600 hover:text-neutral-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
