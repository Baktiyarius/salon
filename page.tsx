'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SearchAndFilter from '@/components/services/SearchAndFilter'
import ServiceCard from '@/components/services/ServiceCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import BookingModal from '@/components/booking/BookingModal'

const ServicesPage = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'popularity',
    search: ''
  })
  const [selectedService, setSelectedService] = useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  // Mock data - in a real app, this would come from an API
  const mockServices = [
    {
      id: 1,
      title: 'Haircut & Styling',
      description: 'Professional haircut with styling for any hair type. Includes consultation, cut, wash, and style.',
      shortDescription: 'Expert haircut and styling services',
      category: 'Hair Styling',
      price: 85,
      duration: 60,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isPopular: true,
      tags: ['haircut', 'styling', 'wash', 'blow-dry'],
      staff: [
        { id: 1, name: 'Sarah Johnson', specialization: 'Hair Styling' },
        { id: 2, name: 'David Wilson', specialization: 'Men\'s Haircuts' }
      ]
    },
    {
      id: 2,
      title: 'Color Transformation',
      description: 'Complete hair color transformation including highlights, balayage, or full color change.',
      shortDescription: 'Professional hair coloring techniques',
      category: 'Hair Styling',
      price: 150,
      duration: 120,
      image: 'https://images.unsplash.com/photo-1604654894610-df2d9aaf4d2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isPopular: true,
      tags: ['coloring', 'highlights', 'balayage', 'transformation'],
      staff: [
        { id: 1, name: 'Sarah Johnson', specialization: 'Hair Coloring' }
      ]
    },
    {
      id: 3,
      title: 'French Manicure',
      description: 'Classic French manicure with nail shaping, cuticle care, polish application, and topcoat.',
      shortDescription: 'Classic French manicure treatment',
      category: 'Nail Art',
      price: 45,
      duration: 45,
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isPopular: false,
      tags: ['manicure', 'french', 'classic', 'polish'],
      staff: [
        { id: 3, name: 'Emily Rodriguez', specialization: 'Nail Art' }
      ]
    },
    {
      id: 4,
      title: 'Gel Nail Art',
      description: 'Creative gel nail designs with various colors, patterns, and embellishments.',
      shortDescription: 'Creative gel nail art designs',
      category: 'Nail Art',
      price: 65,
      duration: 90,
      image: 'https://images.unsplash.com/photo-1522337360788-8b5de17ab0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isPopular: true,
      tags: ['gel', 'nail art', 'designs', 'creative'],
      staff: [
        { id: 3, name: 'Emily Rodriguez', specialization: 'Nail Art' }
      ]
    },
    {
      id: 5,
      title: 'Deep Cleansing Facial',
      description: 'Deep cleansing facial treatment with exfoliation, extraction, and hydration for healthy skin.',
      shortDescription: 'Deep cleansing and hydrating facial',
      category: 'Facial Treatments',
      price: 120,
      duration: 75,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isPopular: true,
      tags: ['facial', 'cleansing', 'extraction', 'hydration'],
      staff: [
        { id: 4, name: 'Michelle Chen', specialization: 'Facial Treatments' }
      ]
    },
    {
      id: 6,
      title: 'Anti-Aging Treatment',
      description: 'Advanced anti-aging facial treatment with serums and techniques to reduce fine lines and wrinkles.',
      shortDescription: 'Advanced anti-aging facial treatment',
      category: 'Facial Treatments',
      price: 180,
      duration: 90,
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isPopular: false,
      tags: ['anti-aging', 'serums', 'fine-lines', 'treatment'],
      staff: [
        { id: 4, name: 'Michelle Chen', specialization: 'Skincare' }
      ]
    },
    {
      id: 7,
      title: 'Relaxation Massage',
      description: 'Full body relaxation massage using premium oils and techniques to relieve stress and tension.',
      shortDescription: 'Full body relaxation massage',
      category: 'Massage Therapy',
      price: 100,
      duration: 60,
      image: 'https://images.unsplash.com/photo-1604654894610-df2d9aaf4d2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isPopular: true,
      tags: ['massage', 'relaxation', 'stress-relief', 'full-body'],
      staff: [
        { id: 5, name: 'Lisa Thompson', specialization: 'Massage Therapy' }
      ]
    },
    {
      id: 8,
      title: 'Hot Stone Massage',
      description: 'Therapeutic hot stone massage combining traditional techniques with heated stones for deep relaxation.',
      shortDescription: 'Therapeutic hot stone massage',
      category: 'Massage Therapy',
      price: 130,
      duration: 75,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isPopular: false,
      tags: ['hot-stone', 'therapeutic', 'relaxation', 'stones'],
      staff: [
        { id: 5, name: 'Lisa Thompson', specialization: 'Therapeutic Massage' }
      ]
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServices(mockServices)
      setFilteredServices(mockServices)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = [...services]

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(service => service.category === filters.category)
    }

    // Filter by price range
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'under-50':
          filtered = filtered.filter(service => service.price < 50)
          break
        case '50-100':
          filtered = filtered.filter(service => service.price >= 50 && service.price <= 100)
          break
        case '100-150':
          filtered = filtered.filter(service => service.price >= 100 && service.price <= 150)
          break
        case 'over-150':
          filtered = filtered.filter(service => service.price > 150)
          break
      }
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Sort services
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'duration':
        filtered.sort((a, b) => a.duration - b.duration)
        break
      case 'popularity':
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
        break
      default:
        break
    }

    setFilteredServices(filtered)
  }, [services, filters])

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleBookService = (service) => {
    setSelectedService(service)
    setIsBookingModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false)
    setSelectedService(null)
  }

  const categories = [
    'All Categories',
    'Hair Styling',
    'Nail Art',
    'Facial Treatments',
    'Massage Therapy',
    'Eyebrow & Eyelash',
    'Skincare'
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-salon-cream via-white to-salon-blush flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-salon-cream via-white to-salon-blush flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Services</h2>
          <p className="text-neutral-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-salon-cream via-white to-salon-blush">
      <div className="container-custom py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-800 mb-6">
            Our Premium Services
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of beauty treatments designed to enhance 
            your natural beauty and provide exceptional wellness experiences.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <SearchAndFilter
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
            serviceCount={filteredServices.length}
          />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ServiceCard
                service={service}
                onBookService={handleBookService}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <motiondiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-neutral-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-display font-semibold text-neutral-700 mb-2">
              No services found
            </h3>
            <p className="text-neutral-500 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => setFilters({ category: '', priceRange: '', sortBy: 'popularity', search: '' })}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Booking Modal */}
        {isBookingModalOpen && selectedService && (
          <BookingModal
            service={selectedService}
            isOpen={isBookingModalOpen}
            onClose={handleCloseBookingModal}
          />
        )}
      </div>
    </div>
  )
}

export default ServicesPage
