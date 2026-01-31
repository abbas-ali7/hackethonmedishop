# MediShop - Healthcare & Medicine E-Commerce Platform

A modern, fully-featured healthcare and medicine e-commerce platform built with React, Node.js, Express, and MongoDB. Designed with a green and white medical theme that conveys trust, safety, and professionalism.

## 🚀 **Want to Deploy?** 
👉 **[Click here for the complete deployment guide →](HOW_TO_DEPLOY.md)** 👈

**Deploy for FREE in 30 minutes using:**
- Frontend: Vercel (free)
- Backend: Render (free tier)
- Database: MongoDB Atlas (free tier)

## 🎯 Features

### ✨ User Features
- **Modern UI/UX** - Clean, minimalist design inspired by top healthcare apps
- **Medicine Catalog** - Browse thousands of medicines with detailed information
- **Advanced Search** - Search with filtering by category, price, and availability
- **Shopping Cart** - Add/remove medicines with quantity management
- **Secure Checkout** - Simple, secure payment flow
- **Order Management** - Track all past and current orders
- **User Authentication** - Secure registration and login with JWT

### 🔧 Admin Features
- **Medicine Management** - Add, update, and delete medicines
- **Order Management** - View and update order status
- **User Management** - View all registered users
- **Inventory Control** - Manage medicine stock levels

### 🎨 Design Highlights
- **Green & White Theme** - Medical color palette conveying trust and safety
- **Mobile-First Design** - Fully responsive and mobile-optimized
- **Accessibility** - WCAG compliant with proper contrast and readable fonts
- **Smooth Animations** - Subtle transitions and hover effects
- **Performance** - Optimized loading with skeleton screens

## 🏗️ Project Structure

```
medishop/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & JWT configuration
│   │   ├── models/          # MongoDB schemas (User, Medicine, Order)
│   │   ├── controllers/     # Business logic (Auth, Medicines, Orders)
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Authentication & authorization
│   │   └── server.js        # Express server setup
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components (Home, Medicines, Cart, etc.)
│   │   ├── context/         # React Context (Auth, Cart)
│   │   ├── utils/           # API calls and utilities
│   │   ├── App.js           # Main App component with routing
│   │   ├── index.js         # Entry point
│   │   └── index.css        # Global styles
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
│
├── package.json             # Root package for concurrently running both servers
└── README.md
```

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router v6
- Axios
- Tailwind CSS
- Lucide Icons

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (Password hashing)

**Database:**
- MongoDB (NoSQL)

## 📋 Prerequisites

- Node.js v14+ and npm
- MongoDB (local or Atlas connection)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd medishop
```

### 2. Install Dependencies

```bash
npm run install-all
```

This will install dependencies for both backend and frontend.

### 3. Configure Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medishop
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

**Frontend (.env):**
```bash
cd ../frontend
cp .env.example .env
```

The default API URL is already set to `http://localhost:5000/api`

### 4. Start MongoDB

Make sure MongoDB is running (local or cloud):

```bash
# If running locally
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in backend/.env
```

### 5. Run Both Servers

From the root directory:

```bash
npm run dev
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

Or run separately:

```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run frontend
```

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user (Protected)
```

### Medicine Endpoints

```
GET    /api/medicines          - Get all medicines (with filters)
GET    /api/medicines/:id      - Get single medicine
POST   /api/medicines          - Create medicine (Admin only)
PUT    /api/medicines/:id      - Update medicine (Admin only)
DELETE /api/medicines/:id      - Delete medicine (Admin only)
GET    /api/medicines/categories/all - Get all categories
```

### Order Endpoints

```
POST   /api/orders             - Create order (Protected)
GET    /api/orders             - Get user orders (Protected)
GET    /api/orders/:id         - Get single order (Protected)
GET    /api/orders/admin/all   - Get all orders (Admin only)
PUT    /api/orders/:id         - Update order status (Admin only)
```

## 🔐 Authentication

The app uses **JWT (JSON Web Tokens)** for authentication:

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in API requests via Authorization header
5. Backend verifies token on protected routes

**Demo Credentials:**
```
Email: user@example.com
Password: password123
```

## 📦 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user|admin),
  phone: String,
  address: String,
  city: String,
  postalCode: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Medicine Model
```javascript
{
  name: String,
  description: String,
  category: String,
  dosage: String,
  manufacturer: String,
  price: Number,
  stock: Number,
  sideEffects: [String],
  warnings: [String],
  suitableFor: [String],
  image: String,
  rating: Number,
  reviews: [{
    user: String,
    comment: String,
    rating: Number,
    date: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: User),
  medicines: [{
    medicineId: ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number,
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  status: String (pending|confirmed|shipped|delivered|cancelled),
  paymentStatus: String (pending|completed|failed),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI/UX Features

### Design Elements
- **Color Scheme**: Green (#10b981) and White - conveying trust and healthcare
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins (8px grid system)
- **Icons**: Lucide React icons for visual clarity
- **Animations**: Smooth transitions and hover effects

### Components
- **Navbar** - Sticky navigation with user menu and cart icon
- **MedicineCard** - Reusable card component for medicine display
- **Toast Notifications** - User feedback messages
- **Loading Skeletons** - Better loading states
- **Responsive Grids** - Mobile-first responsive layouts

### Pages
1. **Home** - Hero section, categories, featured medicines
2. **Medicines** - Catalog with search and filters
3. **Medicine Details** - Full medicine information (coming soon)
4. **Cart** - View and manage cart items
5. **Checkout** - Shipping address and order summary
6. **Orders** - View order history and status
7. **Login/Signup** - User authentication
8. **Admin Dashboard** - Manage medicines and orders (coming soon)

## 🧪 Testing the App

### Create Test Data

You can add medicines through the API:

```bash
curl -X POST http://localhost:5000/api/medicines \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "name": "Aspirin 500mg",
    "description": "Pain reliever and anti-inflammatory",
    "category": "Pain Relief",
    "dosage": "500mg",
    "manufacturer": "PharmaCorp",
    "price": 150,
    "stock": 100,
    "sideEffects": ["Nausea", "Dizziness"],
    "warnings": ["Consult doctor if allergic to aspirin"],
    "suitableFor": ["Headaches", "Body pain"]
  }'
```

Or import a sample data file (create `seed.js` in backend):

```javascript
const mongoose = require('mongoose');
const Medicine = require('./src/models/Medicine');

mongoose.connect('mongodb://localhost:27017/medishop');

const medicines = [
  // Add your sample medicines here
];

Medicine.insertMany(medicines).then(() => {
  console.log('Seed data added');
  process.exit();
});
```

Then run: `node seed.js`

## 📱 Mobile Responsiveness

The app is fully responsive:
- **Mobile** (< 768px) - Single column layouts, stacked navigation
- **Tablet** (768px - 1024px) - Two column layouts
- **Desktop** (> 1024px) - Full grid layouts

## 🔒 Security Features

- **Password Hashing** - bcryptjs with salt rounds
- **JWT Tokens** - Secure token-based authentication
- **Protected Routes** - Role-based access control (User/Admin)
- **Input Validation** - Server-side validation
- **CORS** - Cross-origin resource sharing configured
- **Environment Variables** - Sensitive data not hardcoded

## 🚀 Deployment

### Backend (Heroku/Railway/Vercel)

1. Create account on your hosting platform
2. Connect your GitHub repository
3. Set environment variables (MONGODB_URI, JWT_SECRET)
4. Deploy!

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to Vercel/Netlify

## 📝 File Organization

```
frontend/src/
├── components/
│   ├── Navbar.js        - Navigation bar
│   ├── Footer.js        - Footer component
│   ├── MedicineCard.js  - Medicine display card
│   └── Toast.js         - Notification component
├── pages/
│   ├── HomePage.js
│   ├── MedicinesPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── OrdersPage.js
│   ├── LoginPage.js
│   └── SignupPage.js
├── context/
│   ├── AuthContext.js   - User authentication state
│   └── CartContext.js   - Shopping cart state
├── utils/
│   └── api.js           - Axios API calls
├── App.js               - Main app with routing
├── index.js             - React entry point
└── index.css            - Global styles
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, whitelist your IP

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
npx lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 3000 (Frontend)
npx lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### CORS Issues
- Check CORS is enabled in Express (already done in server.js)
- Verify API URL in frontend .env

### Token Expiration
- Tokens expire after 30 days
- User needs to login again
- Implement token refresh (optional enhancement)

## 🎯 Future Enhancements

- [ ] Medicine detail page with reviews
- [ ] Admin dashboard for full management
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Email notifications
- [ ] Medicine recommendations based on browsing
- [ ] Wishlist feature
- [ ] Real-time inventory updates
- [ ] Doctor consultation feature
- [ ] Medicine substitutes suggestions
- [ ] Newsletter subscription

## 📄 License

MIT License - feel free to use this project for learning and development.

## 💬 Support

For issues or questions:
1. Check the troubleshooting section
2. Review GitHub Issues
3. Contact: support@medishop.com

---

**Built with ❤️ for better healthcare access**

Last Updated: January 2026
Version: 1.0.0
