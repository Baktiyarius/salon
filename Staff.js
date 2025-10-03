const mongoose = require('mongoose')

const timeSlotSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  },
  end: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  }
}, { _id: false })

const dayScheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  startTime: {
    type: String,
    default: '09:00',
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  },
  endTime: {
    type: String,
    default: '18:00',
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  },
  breakStart: String,
  breakEnd: String,
  slots: [timeSlotSchema]
}, { _id: false })

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Staff name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  specialization: [{
    type: String,
    required: [true, 'At least one specialization is required'],
    enum: [
      'Hair Styling',
      'Hair Cutting',
      'Hair Coloring',
      'Nail Art',
      'Manicures',
      'Pedicures',
      'Facial Treatments',
      'Skincare',
      'Massage Therapy',
      'Relaxation Massage',
      'Therapeutic Massage',
      'Eyebrow Shaping',
      'Eyelash Extensions',
      'Eyebrow Tinting',
      'Bridal Styling',
      'Men\'s Grooming',
      'Body Treatments'
    ]
  }],
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  experience: {
    type: Number,
    required: [true, 'Experience in years is required'],
    min: [0, 'Experience cannot be negative']
  },
  education: [{
    institution: String,
    degree: String,
    year: Number
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    expiryDate: Date
  }],
  avatar: {
    type: String,
    default: ''
  },
  portfolio: [{
    type: String
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5']
    },
    count: {
      type: Number,
      default: 0,
      min: [0, 'Rating count cannot be negative']
    }
  },
  schedule: [dayScheduleSchema],
  workingHours: {
    start: {
      type: String,
      default: '09:00',
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
    },
    end: {
      type: String,
      default: '18:00',
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
    }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  languages: [{
    type: String,
    default: ['English']
  }],
  socialMedia: {
    instagram: String,
    facebook: String,
    twitter: String,
    website: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for efficient queries
staffSchema.index({ specialization: 1 })
staffSchema.index({ isAvailable: 1 })
staffSchema.index({ 'rating.average': -1 })
staffSchema.index({ name: 'text', bio: 'text', specialization: 'text' }) // Text search

// Virtual for experience description
staffSchema.virtual('experienceText').get(function() {
  if (this.experience === 0) {
    return 'New Professional'
  } else if (this.experience === 1) {
    return '1 Year Experience'
  } else {
    return `${this.experience}+ Years Experience`
  }
})

// Virtual for formatted rating
staffSchema.virtual('formattedRating').get(function() {
  return this.rating.count > 0 ? this.rating.average.toFixed(1) : 'New'
})

// Method to check availability for specific day and time
staffSchema.methods.isAvailableAt = function(day, time) {
  try {
    const daySchedule = this.schedule.find(s => s.day === day)
    if (!daySchedule || !daySchedule.isAvailable) {
      return false
    }

    const requestedTime = parseFloat(time.replace(':', '.'))
    const startTime = parseFloat(daySchedule.startTime.replace(':', '.'))
    const endTime = parseFloat(daySchedule.endTime.replace(':', '.'))

    // Check if time falls within working hours (before break or after break)
    if (daySchedule.breakStart && daySchedule.breakEnd) {
      const breakStart = parseFloat(daySchedule.breakStart.replace(':', '.'))
      const breakEnd = parseFloat(daySchedule.breakEnd.replace(':', '.'))
      
      return (requestedTime >= startTime && requestedTime < breakStart) ||
             (requestedTime >= breakEnd && requestedTime <= endTime)
    }

    return requestedTime >= startTime && requestedTime <= endTime
  } catch (error) {
    console.error('Error checking availability:', error)
    return false
  }
}

// Method to get available time slots for a day
staffSchema.methods.getAvailableSlots = function(day, serviceDuration = 60) {
  const daySchedule = this.schedule.find(s => s.day === day)
  if (!daySchedule || !daySchedule.isAvailable) {
    return []
  }

  const slots = []
  const startTime = parseFloat(daySchedule.startTime.replace(':', '.'))
  const endTime = parseFloat(daySchedule.endTime.replace(':', '.'))
  
  // Calculate service duration in decimal format
  const durationHours = serviceDuration / 60
  
  // Generate time slots
  for (let time = startTime; time < endTime; time += durationHours) {
    // Skip break time if exists
    if (daySchedule.breakStart && daySchedule.breakEnd) {
      const breakStart = parseFloat(daySchedule.breakStart.replace(':', '.'))
      const breakEnd = parseFloat(daySchedule.breakEnd.replace(':', '.'))
      
      if (time >= breakStart && time < breakEnd) {
        time = breakEnd
        continue
      }
    }
    
    const endSlot = time + durationHours
    if (endSlot <= endTime) {
      const timeStr = `${Math.floor(time)}:${String(Math.round((time - Math.floor(time)) * 60)).padStart(2, '0')}`
      slots.push(timeStr)
    }
  }
  
  return slots
}

// Populate services when getting staff
staffSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'services',
    select: 'title category price duration'
  })
  next()
})

// Static method to get available staff for a service
staffSchema.statics.getAvailableStaff = function(serviceId, day, time) {
  return this.find({
    isAvailable: true,
    services: serviceId
  }).then(staff => {
    return staff.filter(member => member.isAvailableAt(day, time))
  })
}

// Update rating when new review is added
staffSchema.methods.updateRating = function(newRating) {
  this.rating.count += 1
  this.rating.average = ((this.rating.average * (this.rating.count - 1)) + newRating) / this.rating.count
  return this.save()
}

module.exports = mongoose.model('Staff', staffSchema)
