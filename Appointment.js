const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
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
  date: {
    type: Date,
    required: [true, 'Appointment date is required'],
    min: [new Date(), 'Appointment date cannot be in the past']
  },
  time: {
    type: String,
    required: [true, 'Appointment time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Appointment duration is required'],
    min: [5, 'Duration must be at least 5 minutes']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'partially-refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit-card', 'debit-card', 'paypal', 'apple-pay', 'google-pay'],
    default: 'credit-card'
  },
  comment: {
    type: String,
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  specialInstructions: {
    type: String,
    maxlength: [500, 'Special instructions cannot be more than 500 characters']
  },
  clientArrived: {
    type: Boolean,
    default: false
  },
  arrivalTime: Date,
  startTime: Date,
  endTime: Date,
  // Staff notes (private to salon)
  staffNotes: {
    type: String,
    maxlength: [500, 'Staff notes cannot be more than 500 characters']
  },
  // Service notes (visible to client)
  serviceNotes: [{
    note: String,
    date: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['progress', 'recommendation', 'follow-up', 'general']
    }
  }],
  followUpAppointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  reminders: [{
    sent: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ['email', 'sms', 'push']
    },
    sentAt: Date,
    message: String
  }],
  cancellation: {
    cancelledBy: {
      type: String,
      enum: ['client', 'staff', 'admin']
    },
    cancelledAt: Date,
    reason: String,
    refunded: {
      type: Boolean,
      default: false
    },
    refundAmount: Number,
    refundDate: Date
  },
  rescheduled: {
    isRescheduled: {
      type: Boolean,
      default: false
    },
    originalDate: Date,
    originalTime: String,
    rescheduledAt: Date,
    reason: String,
    rescheduledBy: {
      type: String,
      enum: ['client', 'staff', 'admin']
    }
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for efficient queries
appointmentSchema.index({ user: 1, date: 1 })
appointmentSchema.index({ staff: 1, date: 1 })
appointmentSchema.index({ service: 1, date: 1 })
appointmentSchema.index({ status: 1, date: 1 })
appointmentSchema.index({ date: 1, time: 1 })
appointmentSchema.index({ paymentStatus: 1 })

// Virtual for formatted date
appointmentSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Virtual for formatted time
appointmentSchema.virtual('formattedTime').get(function() {
  return this.time
})

// Virtual for end time
appointmentSchema.virtual('endTime').get(function() {
  const [hours, minutes] = this.time.split(':').map(Number)
