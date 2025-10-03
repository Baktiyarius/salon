'use client'

import { useState } from 'react'
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi'

interface SearchAndFilterProps {
  categories: string[]
  filters: {
    category: string
    priceRange: string
    sortBy: string
    search: string
  }
  onFilterChange: (filters: Partial<SearchAndFilterProps['filters']>) => void
  serviceCount: number
}

const SearchAndFilter = ({ categories, filters, onFilterChange, serviceCount }: SearchAndFilterProps) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const priceRanges = [
    { value: '', label: 'All Prices' },
    { value: 'under-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-150', label: '$100 - $150' },
    { value: 'over-150', label: 'Over $150' }
  ]

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'duration', label: 'Shortest Duration' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search services..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-neutral-50"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-neutral-600 font-medium">
          {serviceCount} {serviceCount === 1 ? 'service' : 'services'} found
        </p>
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="md:hidden flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
        >
          <FiFilter className="w-4 h-4 h-4" />
          <span>Filters</span>
          <FiChevronDown className={`w-4 h-4 transition-transform ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isMobileFiltersOpen ? 'block' : 'hidden md:grid'}`}>
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category === 'All Categories' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => onFilterChange({ priceRange: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.category || filters.priceRange || filters.search) && (
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <p className="text-sm font-medium text-neutral-700 mb-3">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                Search: "{filters.search}"
                <button
                  onClick={() => onFilterChange({ search: '' })}
                  className="ml-2 text-primary-500 hover:text-primary-700"
                >
                  ×
                </button>
              </span>
>
            )}
            {filters.category && (
              <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                Category: {filters.category}
                <button
                  onClick={() => onFilterChange({ category: '' })}
                  className="ml-2 text-primary-500 hover:text-primary-**: 'Primary-700"
                >
                  ×
                </button>
              </span>
            )}
            {filters.priceRange && (
              <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                {priceRanges.find(r => r.value === filters.priceRange)?.label}
                <button
                  onClick={() => onFilterChange({ priceRange: '' })}
                  className="ml-2 text-primary-500 hover:text-primary-700"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={() => onFilterChange({ category: '', priceRange: '', search: '' })}
              className="text-sm text-neutral-500 hover:text-neutral-700 underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchAndFilter
