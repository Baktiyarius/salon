'use client'

import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiCalendar } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Booking', href: '/booking' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Team', href: '/team' },
    { name: 'Login', href: '/login' }
  ]

  const services = [
    { name: 'Hair Styling', href: '/services' },
    { name: 'Nail Art', href: '/services' },
    { name: 'Facial Treatments', href: '/services' },
    { name: 'Massage Therapy', href: '/services' },
    { name: 'Eyebrow & Eyelash', href: '/services' },
    { name: 'Skincare', href: '/services' }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Public Offer', href: '/offer' },
    { name: 'Cookie Policy', href: '/cookies' }
  ]

  return (
    <footer className="bg-neutral-800 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-display font-bold text-xl">Éclat Salon</span>
            </div>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Experience premium beauty treatments in an atmosphere of luxury and sophistication. 
              Where every detail is crafted to perfection.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <FiMail className="w-4 h-4 text-primary-400" />
                <span className="text-neutral-300">info@eclatsalon.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <FiPhone className="w-4 h-4 text-green-400" />
                <span className="text-neutral-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <FiMapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                <span className="text-neutral-300">123 Beauty Street,<br />City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Stay Connected</h3>
            <p className="text-neutral-300 mb-6 text-sm leading-relaxed">
              Subscribe to our newsletter for beauty tips, special offers, and exclusive updates.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-##-1 px-4 py-2 bg-neutral-700 text-white border border-neutral-600 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-r-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-neutral-700 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-neutral-700 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-neutral-700 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-neutral-400 text-sm">
                © {currentYear} Éclat Salon. All rights reserved.
              </p>
              <div className="flex space-x-6">
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-center space-x-2 text-sm text-neutral-400">
              <FiClock className="w-4 h-4" />
              <span>Mon-Sat: 9AM-8PM | Sun: 11AM-6PM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
