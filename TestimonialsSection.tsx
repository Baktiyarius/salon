'use client'

import { motion } from 'framer-motion'
import { FiStar, FiQuote } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Client',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Éclat Salon has completely transformed my beauty routine. The staff is incredibly professional, the atmosphere is relaxing, and the results are always amazing. I\'ve been coming here for 2 years and wouldn\'t trust my hair with anyone else.',
      date: 'November 2024'
    },
    {
      id: 2,
      name: 'Emily Chen',
      role: 'New Client',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'The facial treatment I received was absolutely incredible. My skin has never looked so radiant and healthy. The therapist was knowledgeable and made me feel completely comfortable throughout the session.',
      date: 'October 2024'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      role: 'Loyal Client',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'The nail art designs are absolutely stunning! The nail technician is incredibly talented and creative. Every time I leave Éclat, I feel like a walking masterpiece. Highly recommend to anyone looking for quality service.',
      date: 'November 2024'
    },
    {
      id: 4,
      name: 'Jessica Wilson',
      role: 'VIP Client',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'The massage therapy at Éclat is unlike anything I\'ve experienced before. The therapist was professional, the oils smelled divine, and I left feeling completely rejuvenated. It\'s my monthly treat to myself.',
      date: 'November 2024'
    },
    {
      id: 5,
      name: 'Amanda Davis',
      role: 'Regular Client',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'I\'ve tried many salons in the city, but Éclat is truly exceptional. The attention to detail, quality of products used, and overall experience is unmatched. Booking appointments is easy, and the staff always remembers my preferences.',
      date: 'October 2024'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it – read what our satisfied clients have to say 
            about their experiences at Éclat Salon.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-salon-cream to-salon-blush rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-primary-200 opacity-30">
              <FiQuote className="w-16 h-16" />
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                {renderStars(testimonials[currentSlide].rating)}
              </div>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-xl md:text-2xl text-neutral-700 text-center leading-relaxed mb-8 font-medium">
              "{testimonials[currentSlide].text}"
            </blockquote>

            {/* Client Info */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={testimonials[currentSlide].image} 
                  alt={testimonials[currentSlide].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-neutral-800">
                  {testimonials[currentSlide].name}
                </h3>
                <p className="text-primary-600 font-medium">
                  {testimonials[currentSlide].role}
                </p>
                <p className="text-sm text-neutral-500">
                  {testimonials[currentSlide].date}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary-500 scale-125' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide(currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all duration-300"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentSlide(currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all duration-300"
          >
            →
          </button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-neutral-200"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-2">4.9</div>
            <div className="text-sm text-neutral-500">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-2">500+</div>
            <div className="text-sm text-neutral-500">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-2">98%</div>
            <div className="text-sm text-neutral-500">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-2">95%</div>
            <div className="text-sm text-neutral-500">Repeat Clients</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
