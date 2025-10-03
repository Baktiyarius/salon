const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {

      type: Boolean,
      default: false
    },
    preferredServices: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }],
    preferredStaff: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff'
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Index for efficient queries
userSchema.index({ email: 1 })
userSchema.index({ phone: 1 })
userSchema.index({ role: 1 })

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw error
  }
}

// Get user without sensitive information
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.resetPasswordToken
  delete userObject.resetPasswordExpire
  delete userObject.verificationToken
  return userObject
}

// Populate appointments when getting user
userSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'appointments',
    select: '-__v',
    populate: [
      {
        path: 'service',
        select: 'title category price duration'
      },
      {
        path: 'staff',
        select: 'name specialization avatar'
      }
    ]
  })
  next()
})

module.exports = mongoose.model('User', userSchema)
