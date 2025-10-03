# Éclat Salon - Premium Beauty Salon Website

A comprehensive beauty salon management website built with modern technologies for premium service delivery and client experience.

## 🚀 Features

### Client Features
- **Modern Homepage**: Hero section with video background, service showcase, testimonials, and team profiles
- **Service Discovery**: Advanced filtering by category, price range, and search functionality
- **Online Booking**: Real-time appointment scheduling with staff selection and time slot availability
- **User Authentication**: Secure login/registration with JWT authentication
- **Client Dashboard**: Appointment management, review system, and service history
- **Mobile Responsive**: Optimized for all devices with beautiful mobile experience

### Admin Features
- **Admin Dashboard**: Comprehensive overview of salon operations and performance metrics
- **Appointment Management**: View, manage, and track all client appointments
- **Service Management**: Full CRUD operations for salon services with pricing and scheduling
- **Staff Management**: Employee scheduling, availability tracking, and performance monitoring
- **Analytics**: Revenue tracking, popular services, and customer satisfaction metrics

### Technical Features
- **Real-time Availability**: Dynamic booking system with conflict prevention
- **Secure Authentication**: JWT-based auth with password hashing
- **Database Integration**: MongoDB with Mongoose for data persistence
- **Email Notifications**: Automated booking confirmations and reminders
- **Image Upload**: Cloudinary integration for staff and service photos
- **Modern UI/UX**: Tailwind CSS with custom salon theme and animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework with custom theme
- **Framer Motion**: Smooth animations and transitions
- **React Hook Form**: Form management and validation
- **React Hot Toast**: User notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Joi**: Data validation
- **Nodemailer**: Email service integration

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway/Render
- **Database**: MongoDB Atlas
- **Images**: Cloudinary

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ 
- MongoDB (local or Atlas)
- Git

### Environment Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd beauty-salon-website
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create environment files:
```bash
# Backend environment variables
cp backend/env.example backend/.env

# Configure your environment variables in backend/.env:
MONGODB_URI=mongodb://localhost:27017/eclat-salon
JWT_SECRET=your-super-secret-jwt-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Database Setup

1. Start MongoDB (if running locally)
2. The application will automatically create collections and indexes on first run

### Running the Application

#### Development Mode

1. Start the backend server:
```bash
npm run backend
```

2. In a new terminal, start the frontend:
```bash
npm run dev
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

#### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## 🔐 Default Admin Access

**Username**: admin@eclatsalon.com  
**Password**: admin123  
*Please change these credentials in production!*

## 📁 Project Structure

```
beauty-salon-west/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Homepage
│   │   ├── login/           # Authentication pages
│   │   ├── dashboard/       # User dashboard
│   │   ├── admin/           # Admin panel
│   │   └── services/        # Services page
│   ├── components/          # React components
│   │   ├── sections/        # Page sections
│   │   ├── layout/          # Layout components
│   │   ├── booking/         # Booking system
│   │   ├── dashboard/       # Dashboard components
│   │   ├── admin/           # Admin components
│   │   └── ui/              # Reusable UI components
│   └── contexts/            # React contexts
├── backend/
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   └── package.json
└── public/                  # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: Pink/Rose gradient (#ec4899 to #f472b6)
- *Secondary**: Coffee/Warm brown (#d4af86)
- **Neutral**: Cream, beige, and white tones
- **Accent**: Pastel variations for highlights

### Typography
- **Headers**: Poppins (Modern, clean)
- **Body**: Inter (Readable, professional)
- **Display**: Lato (Elegant, sophisticated)

### Components
- Custom button styles with gradients and hover effects
- Card designs with subtle shadows and rounded corners
- Form inputs with focus states and validation
- Loading states and animations
- Responsive grid layouts

## 🚢 Deployment Guide

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
4. Deploy automatically

### Backend Deployment (Railway)

1. Connect your GitHub repository to Railway
2. Set environment variables:
   - All variables from `backend/.env`
3. Deploy and get your API URL

### Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Whitelist your deployment IPs
3. Create a database user
4. Update your connection string in backend environment variables

## 🔧 Configuration

### Email Service (Nodemailer)
Configure SMTP settings for booking confirmations and notifications.

### Cloudinary (Image Storage)
Set up Cloudinary account for image uploads and management.

### JWT Security
Use strong, unique JWT secrets in production. Consider implementing token refresh strategies.

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Mobile-first design approach
- Touch-friendly interface elements
- Optimized booking flow for mobile devices
- Hamburger navigation menu
- Swipe-friendly service browsing

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests (when implemented)
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Credits

- **Design**: Custom salon-themed design system
- **Images**: Unsplash (for demo purposes)
- **Icons**: React Icons
- **Fonts**: Google Fonts

## 📞 Support

For support and questions:
- Email: support@eclatsalon.com
- Website: [Éclat Salon](https://eclatsalon.com)

---

**Built with ❤️ for the beauty industry**
