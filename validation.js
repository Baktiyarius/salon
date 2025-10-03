const Joi = require('joi')

// Generic validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ')
      return res.status(400).json({
        error: 'Validation failed',
        details: errorMessage,
        field: error.details[0].path.join('.')
      })
    }
    
    next()
  }
}

// User registration validation schema
const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),
  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please provide a valid phone number'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters'
    })
})

// User login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required'
    })
})

// Password update validation schema
const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'string.empty': 'Current password is required'
    }),
  newPassword: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'New password is required',
      'string.min': 'New password must be at least 6 characters'
    })
})

// Profile update validation schema
const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .optional(),
  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number'
    }),
  avatar: Joi.string()
    .uri()
    .optional()
})

// Service validation schema
const serviceSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .required()
    .messages({
      'string.empty': 'Service title is required',
      'string.min': 'Title must be at least 2 characters',
      'string.max': 'Title cannot exceed 100 characters'
    }),
  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Service description is required',
      'string.min': 'Description must be at least 10 characters',
      'string.max': 'Description cannot exceed 1000 characters'
    }),
  shortDescription: Joi.string()
    .max(200)
    .optional()
    .messages({
      'string.max': 'Short description cannot exceed 200 characters'
    }),
  category: Joi.string()
    .valid(
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
    )
    .required()
    .messages({
      'string.empty': 'Service category is required',
      'any.only': 'Please select a valid service category'
    }),
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative'
    }),
  duration: Joi.number()
    .min(5)
    .required()
    .messages({
      'number.base': 'Duration must be a number',
      'number.min': 'Duration must be at least 5 minutes'
    }),
  image: Joi.string()
    .uri()
    .optional(),
  isPopular: Joi.boolean()
    .optional(),
  isActive: Joi.boolean()
    .optional(),
  tags: Joi.array()
    .items(Joi.string().trim())
    .optional(),
  requirements: Joi.array()
    .items(Joi.string().trim())
    .optional(),
  benefits: Joi.array()
    .items(Joi.string().trim())
    .optional()
})

// Staff validation schema
const staffSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      'string.empty': 'Staff name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),
  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please provide a valid phone number'
    }),
  specialization: Joi.array()
    .items(Joi.string().valid(
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
    ))
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one specialization is required'
    }),
  bio: Joi.string()
    .max(1000)
    .optional()
    .messages({
      'string.max': 'Bio cannot exceed 1000 characters'
    }),
  experience: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Experience must be a number',
      'number.min': 'Experience cannot be negative'
    }),
  avatar: Joi.string()
    .uri()
    .optional()
})

// Appointment validation schema
const appointmentSchema = Joi.object({
  service: Joi.string()
    .required()
    .messages({
      'string.empty': 'Service selection is required'
    }),
  staff: Joi.string()
    .required()
    .messages({
      'string.empty': 'Staff selection is required'
    }),
  date: Joi.date()
    .min('now')
    .required()
    .messages({
      'date.base': 'Please provide a valid date',
      'date.min': 'Appointment date cannot be in the past'
    }),
  time: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      'string.empty': 'Appointment time is required',
      'string.pattern.base': 'Please provide a valid time format (HH:MM)'
    }),
  comment: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.max': 'Comment cannot exceed 500 characters'
    }),
  specialInstructions: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.max': 'Special instructions cannot exceed 500 characters'
    })
})

// Review validation schema
const reviewSchema = Joi.object({
  rating: Joi.object({
    overall: Joi.number()
      .min(1)
      .max(5)
      .required()
      .messages({
        'number.base': 'Rating must be a number',
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating must be at most 5'
      }),
    service: Joi.number()
      .min(1)
      .max(5)
      .optional(),
    staff: Joi.number()
      .min(1)
      .max(5)
      .optional(),
    atmosphere: Joi.number()
      .min(1)
      .max(5)
      .optional(),
    value: Joi.number()
      .min(1)
      .max(5)
      .optional()
  }).required(),
  comment: Joi.string()
    .min(10)
    .max(1000)
    .trim()
    .required()
    .messages({
      'string.empty': 'Review comment is required',
      'string.min': 'Comment must be at least 10 characters',
      'string.max': 'Comment cannot exceed 1000 characters'
    }),
  photos: Joi.array()
    .items(Joi.string().uri())
    .max(5)
    .optional()
    .messages({
      'array.max': 'Cannot upload more than 5 photos'
    })
})

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  updatePasswordSchema,
  updateProfileSchema,
  serviceSchema,
  staffSchema,
  appointmentSchema,
  reviewSchema
}
