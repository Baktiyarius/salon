'use client'

import { FiHome, FiCalendar, FiStar, FiUser, FiLogOut } from 'react-icons/fi'

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  user: {
    name: string
    email: string
    avatar?: string
  }
  stats: {
    pendingAppointments: number
    completedAppointments: number
    reviewsCount: number
  }
  onLogout: () => void
}

const DashboardSidebar = ({ 
  activeTab, 
  onTabChange, 
  user, 
  stats, 
  onLogout 
}: DashboardSidebarProps) => {
  const menuItems = [
    {
      id: 'appointments',
      label: 'Appointments',
      icon: FiCalendar,
      count: stats.pendingAppointments + stats.completedAppointments
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: FiStar,
      count: stats.reviewsCount
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: FiUser,
      count: null
    }
  ]

  return (
    <div className="h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="font-display font-bold text-lg text-gradient">Éclat Salon</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-neutral-800 truncate">{user.name}</h3>
            <p className="text-sm text-neutral-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-4">
        <nav className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 border border-primary-200'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-neutral-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4 border-t border-neutral-200">
        <h4 className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wide">
          Quick Stats
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">This Month</span>
            <span className="text-sm font-medium text-neutral-800">
              {stats.completedAppointments} services
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">Active Reviews</span>
            <span className="text-sm font-medium text-neutral-800">
              {stats.reviewsCount}
            </span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-neutral-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default DashboardSidebar
