'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiScissors, FiHeart, FiSmile, FiActivity, FiEye, FiDroplet } from 'react-icons/fi'

const ServicesSection = () => {
  const services = [
    {
      icon: <FiScissors className="w-8 h-8" />,
      title: 'Hair Styling',
      description: 'From cuts to coloring, our expert stylists create the perfect look for you.',
      price: 'From $80',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: 'Nail Art',
      description: 'Manicures, pedicures, and creative nail art designs that express your style.',
      price: 'From $45',
      image: 'https://images.unsplash.com/photo-1604654894610-df2d9aaf4d2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: <FiSmile className="w-8 h-8" />,
      title: 'Facial Treatments',
      description: 'Rejuvenating facial treatments for healthy, glowing skin year-round.',
      price: 'From $120',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: <FiActivity className="w-8 h-8" />,
      title: 'Massage Therapy',
      description: 'Relaxing and therapeutic massage treatments for stress relief and wellness.',
      price: 'From $100',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: <FiEye className="w-8 h-8" />,
      title: 'Eyebrow & Eyelash',
      description: 'Professional shaping, tinting, and extension services for stunning eyes.',
      price: 'From $60',
      image: 'https://images.unsplash.com/photo-1522337360788-8b5de17ab0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: <FiDroplet className="w-8 h-8" />,
      title: 'Skincare',
      description: 'Advanced skincare treatments using premium products and techniques.',
      price: 'From $90',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ]

  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
            Our Premium Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of beauty treatments designed to enhance 
            your natural beauty and provide exceptional wellness experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img 
                  src�service.image} 
                  alt={service.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                  {service.icon}
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {service.price}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-neutral-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href="/services" 
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group-hover:space-x-3 transition-all"
                >
                  <span>Learn More</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/services" className="btn-primary text-lg px-8 py-4 group">
            View All Services
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
