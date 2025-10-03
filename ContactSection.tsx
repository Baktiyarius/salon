'use client'

import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiClock, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'
import { useState } from 'react'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Reset form or show success message
  }

  const contactInfo = [
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Email',
      details: 'info@eclatsalon.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Call us for booking'
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: 'Location',
      details: '123 Beauty Street, City, State 12345',
      description: 'Visit our salon'
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: 'Hours',
      details: 'Mon-Sat: 9AM-8PM, Sun: 11AM-6PM',
      description: 'We are open 7 days'
    }
  ]

  const socialLinks = [
    { icon: <FiFacebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <FiInstagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <FiTwitter className="w-5 h-5" />, href: '#', label: 'Twitter' }
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
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have questions about our services, 
            want to schedule an appointment, or just want to say hello, we're here for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-salon-cream to-salon-blush rounded-3xl p-8">
              <h3 className="text-2xl font-display font-bold text-neutral-800 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-neutral-800 mb-1">
                        {info.title}
                      </h4>
                      <p className="font-medium text-neutral-700 mb-1">
                        {info.details}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h4 className="font-display font-semibold text-neutral-800 mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-neutral-100 rounded-3xl p-8 text-center">
              <h3 className="text-xl font-display font-semibold text-neutral-800 mb-4">
                Find Us
              </h3>
              <div className="bg-neutral-200 rounded-2xl h-64 flex items-center justify-center">
                <p className="text-neutral-500">Google Maps Integration</p>
                {/* Replace with actual Google Maps embed */}
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                Located in the heart of the city with easy parking
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-salon-cream to-salon-blush rounded-3xl p-8">
              <h3 className="text-2xl font-display font-bold text-neutral-800 mb-6">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Book Appointment</option>
                    <option value="services">Questions about Services</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
