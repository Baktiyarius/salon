const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { protect } = require('../middleware/auth')
const { validate, registerSchema, loginSchema, updatePasswordSchema, updateProfileSchema } = require('../middleware/validation')

const router = express.Router()

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists with this email address'
      })
    }

    // Check if phone number already exists
    const existingPhone = await User.findOne({ phone })
    if (existingPhone) {
      return res.status(400).json({
        error: 'User already exists with this phone number'
      })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      error: 'Server error during registration'
    })
  }
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user
    const user = await User.findOne({ email }).select('+password') // Include password for comparison
    
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password)
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Server error during login'
    })
  }
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('appointments')

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
        preferences: user.preferences,
        appointments: user.appointments,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Get current user error:', error)
    res.status(500).json({
      error: 'Server error while fetching user profile'
    })
  }
})

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, validate(updateProfileSchema), async (req, res) => {
  try {
    const { name, phone, avatar } = req.body

    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    // Check if phone number is being changed and if it's already taken
    if (phone && phone !== user.phone) {
      const existingPhone = await User.findOne({ phone })
      if (existingPhone) {
        return res.status(400).json({
          error: 'Phone number already exists'
        })
      }
    }

    // Update user fields
    if (name !== undefined) user.name = name
    if (phone !== undefined) user.phone = phone
    if (avatar !== undefined) user.avatar = avatar

    await user.save()

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
        preferences: user.preferences,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({
      error: 'Server error while updating profile'
    })
  }
})

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
router.put('/update-password', protect, validate(updatePasswordSchema), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Get user with password
    const user = await User.findById(req.user._id).select('+password')

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    // Check current password
    const isPasswordMatch = await user.comparePassword(currentPassword)
    
    if (!isPasswordMatch) {
      return res.status(400).json({
        error: 'Current password is incorrect'
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.json({
      message: 'Password updated successfully'
    })
  } catch (error) {
    console.error('Update password error:', error)
    res.status(500).json({
      error: 'Server error while updating password'
    })
  }
})

// @desc    Logout user (client-side token removal)
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, (req, res) => {
  // Since we're using JWT, logout is handled on the client side by removing the token
  res.json({
    message: 'Logged out successfully'
  })
})

// @desc    Generate new token
// @route   POST /api/auth/refresh-token
// @access  Private
router.post('/refresh-token', protect, async (req, res) => {
  try {
    // Generate new token
    const token = generateToken(req.user._id)

    res.json({
      message: 'Token refreshed successfully',
      token,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
        avatar: req.user.avatar,
        createdAt: req.user.createdAt
      }
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    res.status(500).json({
      error: 'Server error while refreshing token'
    })
  }
})

module.exports = router
