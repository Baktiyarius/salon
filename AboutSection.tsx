'use client'

import { motion } from 'framer-motion'
import { FiAward, FiHeart, FiStar, FiUsers } from 'react-icons/fi'

const AboutSection = () => {
  const features = [
    {
      icon: <FiAward className="w-8 h-8" />,
      title: 'Certified Professionals',
      description: 'Our team consists of licensed and certified beauty professionals with extensive training and experience.'
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: 'Premium Cosmetics',
      description: 'We use only the finest international brands and premium quality products for all our treatments.'
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: 'Cozy Atmosphere',
      description: 'Relax in our beautifully designed salon space that combines luxury with comfort and tranquility.'
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: '1000+ Happy Clients',
      description: 'Thousands of satisfied clients trust us with their beauty needs, making us the premier choice in the city.'
    }
  ]

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
            About Éclat Salon
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Established in 2019, Éclat Salon has been redefining beauty standards in our city. 
            Our mission is to provide exceptional beauty services that not only enhance your outer 
            beauty but also boost your confidence and well-being.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522337360788-8b5de17ab0aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
              alt="Salon Interior"
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-800">
              Our Story
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Founded with a vision to create a sanctuary of beauty and wellness, Éclat Salon 
              combines contemporary elegance with timeless artistry. Our journey began when 
              our founder, Sarah Johnson, recognized the need for a premium beauty destination 
              that prioritizes both exceptional service and client comfort.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Over the years, we have grown into a trusted name in beauty and wellness, 
              serving thousands of clients with personalized care and innovative treatments. 
              Every visit to Éclat is designed to be a transformative experience.
            </p>
            
            <div className="flex items-center space-x-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">5+</div>
                <div className="text-sm text-neutral-500">Years Excellence</div>
              </div>
              <div className="w-px h-12 bg-neutral-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">15+</div>
                <div className="text-sm text-neutral-500">Expert Staff</div>
              </div>
              <div className="w-px h-12 bg-neutral-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">50+</div>
                <div className="text-sm text-neutral-500">Services</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:from-primary-500 group-hover:to-secondary-500 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">
                {feature.icon}
              </div>
              <h3 className="text-lg font-display font-semibold text-neutral-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
