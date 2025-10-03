'use client'

import { motion } from 'framer-motion'
import { FiCalendar, FiCheckCircle } from 'react-icons/fi'

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialization: 'Lead Hair Stylist',
      experience: '8+ Years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Specializes in cuts, color, and styling. Expert in balayage and bridal styling.',
      specialties: ['Hair Cutting', 'Hair Coloring', 'Bridal Styling', 'Balayage']
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      specialization: 'Master Nail Artist',
      experience: '6+ Years',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Creative nail artist with expertise in intricate designs and nail health.',
      specialties: ['Nail Art', 'Manicures', 'Pedicures', 'Nail Art Design']
    },
    {
      id: 3,
      name: 'Michelle Chen',
      specialization: 'Facial Specialist',
      experience: '5+ Years',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Licensed esthetician specializing in advanced skincare treatments.',
      specialties: ['Facial Treatments', 'Skincare', 'Anti-aging', 'Deep Cleansing']
    },
    {
      id: 4,
      name: 'Lisa Thompson',
      specialization: 'Massage Therapist',
      experience: '7+ Years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Certified massage therapist with expertise in relaxation and therapeutic massages.',
      specialties: ['Relaxation Massage', 'Therapeutic Massage', 'Aromatherapy', 'Hot Stone']
    },
    {
      id: 5,
      name: 'Jennifer Brown',
      specialization: 'Brow & Lash Expert',
      experience: '4+ Years',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Specialist in eyebrow shaping, tinting, and eyelash extensions.',
      specialties: ['Eyebrow Shaping', 'Eyelash Extensions', 'Eyebrow Tinting', 'Lash Lift']
    },
    {
      id: 6,
      name: 'David Wilson',
      specialization: 'Men\'s Grooming',
      experience: '5+ Years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Expert in men\'s haircuts, styling, and grooming services.',
      specialties: ['Men\'s Haircuts', 'Beard Styling', 'Men\'s Facials', 'Grooming']
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
            Meet Our Expert Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Our team of licensed professionals brings years of experience and passion 
            to every service. Each specialist is dedicated to delivering exceptional results 
            and an unforgettable experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Experience Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {member.experience}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-neutral-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.specialization}
                </p>
                <p className="text-neutral-600 mb-4 leading-relaxed text-sm">
                  {member.description}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    {member.specialties.map((specialty, specIndex) => (
                      <div key={specIndex} className="flex items-center space-x-2 text-xs text-neutral-600">
                        <FiCheckCircle className="w-3 h-3 text-primary-500 flex-shrink-0" />
                        <span>{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full btn-primary bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg transform hover:-translate-y-1 group-hover:shadow-primary-500/25">
                  <FiCalendar className="inline-block w-4 h-4 mr-2" />
                  Book with Specialist
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-xl"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-800 mb-4">
            Ready to Experience Our Expertise?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Book an appointment with any of our skilled specialists today and discover 
            the difference that experience, passion, and attention to detail can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4">
              Book Appointment
            </button>
            <button className="btn-secondary px-8 py-4">
              View All Services
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection
