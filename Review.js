const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: [true, 'Appointment is required'],
    unique: true // One review per appointment
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required']
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: [true, 'Staff member is required']
  },
  rating: {
    overall: {
      type: Number,
      required: [true, 'Overall rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5']
    },
    service: {
      type: Number,
      min: [1, 'Service rating must be at least 1'],
      max: [5, 'Service rating must be at most 5']
    },
    staff: {
      type: Number,
      min: [1, 'Staff rating must be at least 1'],
      max: [5, 'Staff rating must be at most 5']
    },
    atmosphere: {
      type: Number,
      min: [1, 'Atmosphere rating must be at least 1'],
      max: [5, 'Atmosphere rating must be at most 5']
    },
    value: {
      type: Number,
      min: [1, 'Value rating must be at least 1'],
      max: [5, 'Value rating must be at most 5']
    }
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    minlength: [10, 'Comment must be at least 10 characters'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    trim: true
  },
  photos: [{
    type: String,
    validate: {
      validator: function(photos) {
        return photos.length <= 5
      },
      message: 'Cannot upload more than 5 photos'
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  helpful: {
    count: {
      type: Number,
      default: 0
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  response: {
    text: {
      type: String,
      maxlength: [500, 'Response cannot exceed 500 characters']
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [{
    type: String,
    enum: [
      'great-service',
      'friendly-staff',
      'clean-environment',
      'good-value',
      'professional',
      'recommended',
      'quick-service',
      'relaxing',
      'results-exceeded-expectations',
      'will-return'
    ]
  }],
  moderation: {
    flags: [{
      type: String,
      enum: ['spam', 'inappropriate', 'fake', 'off-topic']
    }],
    flaggedBy: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      reason: String,
      reviewedAt: Date
    }],
    moderatorNotes: String,
    actionTaken: {
      type: String,
      enum: ['none', 'hidden', 'removed', 'warning-sent']
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for efficient queries
reviewSchema.index({ service: 1, createdAt: -1 })
reviewSchema.index({ staff: 1, createdAt: -1 })
reviewSchema.index({ user: 1, createdAt: -1 })
reviewSchema.index({ 'rating.overall': -1 })
reviewSchema.index({ isApproved:< 1, isPublic: 1 })
reviewSchema.index({ service: 'text', comment: 'text' }) // Text search

// Virtual for formatted rating
reviewSchema.virtual('ratingText').get(function() {
  const rating = this.rating.overall
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
  return `${stars} (${rating}/5)`
})

// Virtual for time ago
reviewSchema.virtual('timeAgo').get(function() {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - this.createdAt.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
})

// Virtual for helpful count
reviewSchema.virtual('helpfulCount').get(function() {
  return this.helpful.count
})

// Virtual for like percentage
reviewSchema.virtual('likePercentage').get(function() {
  const total = this.likes.length + this.dislikes.length
  if (total === 0) return 0
  return Math.round((this.likes.length / total) * 100)
})

// Pre-save middleware to update staff rating
reviewSchema.pre('save', async function(next) {
  try {
    if (this.isModified('rating.overall') && !this.isNew) {
      const Staff = mongoose.model('Staff')
      const staff = await Staff.findById(this.staff)
      
      if (staff) {
        // Calculate new average rating
        const existingReview = await mongoose.model('Review').findOne({
          staff: this.staff,
          _id: { $ne: this._id }
        })
        
        if (existingReview) {
          // Update existing average
          const totalReviews = await mongoose.model('Review').countDocuments({ staff: this.staff })
          const currentTotal = staff.rating.average * (totalReviews - 1)
          staff.rating.average = (currentTotal + this.rating.overall) / totalReviews
        } else {
          // First review for this staff member
          staff.rating.average = this.rating.overall
          staff.rating.count = 1
        }
        
        await staff.save()
      }
    }
    next()
  } catch (error) {
    next(error)
  }
})

// Post-save middleware to update staff rating when new review
reviewSchema.post('save', async function(doc) {
  try {
    if (doc.isNew) {
      const Staff = mongoose.model('Staff')
      const staff = await Staff.findById(doc.staff)
      
      if (staff) {
        const totalReviews = await mongoose.model('Review').countDocuments({ staff: doc.staff })
        const newAverage = ((staff.rating.average * staff.rating.count) + doc.rating.overall) / totalReviews
        
        staff.rating.average = newAverage
        staff.rating.count = totalReviews
        
        await staff.save()
      }
    }
  } catch (error) {
    console.error('Error updating staff rating:', error)
  }
})

// Pre-remove middleware to update staff rating when review is deleted
reviewSchema.pre('remove', async function(next) {
  try {
    const Staff = mongoose.model('Staff')
    const staff = await Staff.findById(this.staff)
    
    if (staff && staff.rating.count > 0) {
      const totalReviews = staff.rating.count - 1
      
      if (totalReviews === 0) {
        staff.rating.average = 0
        staff.rating.count = 0
      } else {
        // Recalculate average without this review
        const currentTotal = staff.rating.average * staff.rating.count
        staff.rating.average = (currentTotal - this.rating.overall) / totalReviews
        staff.rating.count = totalReviews
      }
      
      await staff.save()
    }
    next()
  } catch (error) {
    next(error)
  }
})

// Populate related fields
reviewSchema.pre(/^find/, function(next) {
  this.populate([
    {
      path: 'user',
      select: 'name avatar'
    },
    {
      path: 'service',
      select: 'title category'
    },
    {
      path: 'staff',
      select: 'name specialization avatar'
    }
  ])
  next()
})

// Static methods
reviewSchema.statics.getAverageRating = function(serviceId) {
  return this.aggregate([
    { $match: { service: mongoose.Types.ObjectId(serviceId), isApproved: true } },
    { $group: { _id: null, average: { $avg: '$rating.overall' }, count: { $sum: 1 } } }
  ])
}

reviewSchema.statics.getReviewsByService = function(serviceId, limit = 10, skip = 0) {
  return this.find({ 
    service: serviceId, 
    isApproved: true, 
    isPublic: true 
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .skip(skip)
}

reviewSchema.statics.getReviewsByStaff = function(staffId, limit = 10, skip = 0) {
  return this.find({ 
    staff: staffId, 
    isApproved: true, 
    isPublic: true 
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .skip(skip)
}

reviewSchema.statics.getRecentReviews = function(limit = 5) {
  return this.find({ 
    isApproved: true, 
    isPublic: true 
  })
  .sort({ createdAt: -1 })
  .limit(limit)
}

reviewSchema.statics.getTopRatedReviews = function(serviceId = null, limit = 5) {
  const filter = { 
    isApproved: true, 
    isPublic: true,
    'rating.overall': 5
  }
  
  if (serviceId) {
    filter.service = serviceId
  }
  
  return this.find(filter)
  .sort({ createdAt: -1 })
  .limit(limit)
}

// Instance methods
reviewSchema.methods.markAsHelpful = async function(userId) {
  if (!this.helpful.users.includes(userId)) {
    this.helpful.users.push(userId)
    this.helpful.count += 1
    await this.save()
  }
  return this.helpful.count
}

reviewSchema.methods.addResponse = async function(responseText, respondentId) {
  this.response = {
    text: responseText,
    respondedBy: respondentId,
    respondedAt: new Date()
  }
  await this.save()
}

module.exports = mongoose.model('Review', reviewSchema)
