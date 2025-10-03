const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: [
      'Hair Styling',
      'Nail Art',
      'Facial Treatments',
      'Massage Therapy',
      'Eyebrow & Eyelash',
      'Skincare',
      'Body Treatments',
      'Men\'s Grooming',
      'Wedding Services',
      'Special Occasions'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  priceRange: {
    min: {
      type: Number,
      min: [0, 'Minimum price cannot be negative']
    },
    max: {
      type: Number,
      min: [0, 'Maximum price cannot be negative']
    }
  },
  duration: {
    type: Number,
    required: [true, 'Service duration is required'],
    min: [5, 'Duration must be at least 5 minutes']
  },
  image: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  staff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  }],
  availableDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  bookingNotes: {
    type: String,
    maxlength: [500, 'Booking notes cannot be more than 500 characters']
  },
  cancellationPolicy: {
    type: String,
    maxlength: [300, 'Cancellation policy cannot be more than 300 characters'],
    default: '24-hour advance notice required for cancellations'
  },
  specialInstructions: {
    type: String,
    maxlength: [300, 'Special instructions cannot be more than 300 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for efficient queries
serviceSchema.index({ category: 1 })
serviceSchema.index({ isActive: 1 })
serviceSchema.index({ isPopular: 1 })
serviceSchema.index({ price: 1 })
serviceSchema.index({ title: 'text', description: 'text', tags: 'text' }) // Text search

// Virtual for formatted price
serviceSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`
})

// Virtual for duration in hours and minutes
serviceSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.duration / 60)
  const minutes = this.duration % 60
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${minutes}m`
  }
})

// Populate staff when getting services
serviceSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'staff',
    select: 'name specialization avatar experience'
  })
  next()
})

// Static method to get popular services
serviceSchema.statics.getPopularServices = function(limit = 6) {
  return this.find({ isActive: true, isPopular: true })
    .populate('staff', 'name specialization avatar')
    .limit(limit)
    .sort({ createdAt: -1 })
}

// Static method to get services by category
serviceSchema.statics.getServicesByCategory = function(category) {
  return this.find({ category, isActive: true })
    .populate('staff', 'name specialization avatar')
    .sort({ price: 1 })
}

// Static method to search services
serviceSchema.statics.searchServices = function(query, filters = {}) {
  const searchQuery = { 
    isActive: true,
    ...filters
  }
  
  if (query) {
    searchQuery.$text = { $search: query }
  }
  
  return this.find(searchQuery)
    .populate('staff', 'name specialization avatar')
    .sort(query ? { score: { $meta: 'textScore' } } : { price: 1 })
}

module.exports = mongoose.model('Service', serviceSchema)
