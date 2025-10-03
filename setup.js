#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎨 Setting up Éclat Salon Beauty Website...\n');

// Create backend .env file if it doesn't exist
const envPath = path.join(__dirname, '../backend/.env');
if (!fs.existsSync(envPath)) {
  const envContent = `# Database
MONGODB_URI=mongodb://localhost:27017/eclat-salon

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-${Math.random().toString(36).substring(2, 15)}
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@eclatsalon.com

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created backend/.env file');
}

// Install frontend dependencies
console.log('📦 Installing frontend dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Install backend dependencies
console.log('📦 Installing backend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, '../backend'), stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

console.log('\n🎉 Setup complete! Here\'s what to do next:\n');
console.log('1. 📧 Configure your email settings in backend/.env');
console.log('2. 🗃️  Set up MongoDB (local or Atlas)');
console.log('3. 📸 Set up Cloudinary for image uploads');
console.log('4. 🚀 Start the development servers:\n');
console.log('   Terminal 1: npm run backend');
console.log('   Terminal 2: npm run dev');
console.log('\n5. 🌐 Open http://localhost:3000 in your browser');
console.log('\n📚 Check README.md for detailed setup instructions');
console.log('\nHappy coding! 💅✨');
