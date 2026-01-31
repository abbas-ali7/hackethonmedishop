# 🚀 Free Deployment Guide for MediShop

This guide will help you deploy your MediShop application completely **FREE** using:
- **Frontend**: Vercel (Free)
- **Backend**: Render (Free Tier)
- **Database**: MongoDB Atlas (Free Tier)

---

## 📋 Prerequisites

1. **GitHub Account** (free)
2. **Vercel Account** (free) - Sign up at [vercel.com](https://vercel.com)
3. **Render Account** (free) - Sign up at [render.com](https://render.com)
4. **MongoDB Atlas Account** (free) - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

### ⚠️ Important Note
The frontend now includes 3D animation libraries (framer-motion, react-spring, three.js). These are already installed and ready for deployment. The build process will handle them automatically.

---

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and sign up
3. Create a new organization (or use default)
4. Create a new project (e.g., "MediShop")

### 1.2 Create a Free Cluster
1. Click "Build a Database"
2. Select **FREE (M0)** tier
3. Choose a cloud provider and region (closest to you)
4. Name your cluster (e.g., "medishop-cluster")
5. Click "Create Cluster" (takes 3-5 minutes)

### 1.3 Setup Database Access
1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### 1.4 Setup Network Access
1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add specific IPs for production
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to **Database** → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `medishop` (or your preferred database name)
6. **Save this connection string** - you'll need it for backend deployment

**Example:**
```
mongodb+srv://medishop:yourpassword@cluster0.xxxxx.mongodb.net/medishop?retryWrites=true&w=majority
```

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Prepare Your Repository
1. Make sure your code is pushed to GitHub
2. Your backend should be in the `backend/` folder

### 2.2 Create Render Web Service
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository

### 2.3 Configure Backend Service
- **Name**: `medishop-backend` (or any name)
- **Region**: Choose closest to you
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free**

### 2.4 Add Environment Variables
Click "Advanced" → "Add Environment Variable" and add:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medishop?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-random-string-change-this
```

**Important Notes:**
- Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
- Replace `JWT_SECRET` with a random secure string (you can generate one online)
- Render free tier uses port 10000, but you can also use `process.env.PORT`

### 2.5 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes first time)
3. Copy your backend URL (e.g., `https://medishop-backend.onrender.com`)
4. **Important**: Note that Render free tier services spin down after 15 minutes of inactivity. First request after spin-down takes ~30 seconds.

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Prepare Frontend Environment
1. Create a `.env.production` file in the `frontend/` folder (or we'll set it in Vercel)
2. Update the API URL to point to your Render backend

### 3.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3.3 Add Environment Variables
Click "Environment Variables" and add:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url.onrender.com` with your actual Render backend URL.

### 3.4 Deploy
1. Click "Deploy"
2. Wait for build (2-5 minutes)
3. Your app will be live at `https://your-project.vercel.app`

---

## ✅ Step 4: Seed Your Database

After deployment, you need to seed your database with initial data:

### Option 1: Using MongoDB Atlas Web Interface
1. Go to MongoDB Atlas → Your Cluster → "Browse Collections"
2. Manually add collections and documents

### Option 2: Using MongoDB Compass (Desktop App)
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your MongoDB Atlas connection string
3. Import your seed data

### Option 3: Create a Seed Endpoint (Recommended)
Add a temporary endpoint in your backend to seed data:

```javascript
// backend/src/routes/seed.js
const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/seed', async (req, res) => {
  try {
    // Seed users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    // Seed medicines (your seed.js data)
    // ... your seed logic
    
    res.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

Then call: `POST https://your-backend.onrender.com/api/seed`

---

## 🔗 Step 5: Update CORS Settings

Make sure your backend allows requests from your Vercel frontend:

In `backend/src/server.js`, update CORS:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'
  ],
  credentials: true
}));
```

Or for development, allow all origins:
```javascript
app.use(cors());
```

---

## 🧪 Step 6: Test Your Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend**: Visit `https://your-backend.onrender.com/api/health`
3. **Test API**: Try logging in with demo credentials
4. **Test Database**: Create a new account and place an order

---

## 🔐 Step 7: Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Update MongoDB Atlas network access to specific IPs (optional)
- [ ] Remove seed endpoint after initial setup
- [ ] Enable HTTPS (automatic on Vercel and Render)
- [ ] Review environment variables (never commit secrets)

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend returns 503 or times out
- **Solution**: Render free tier spins down after inactivity. First request takes ~30 seconds.

**Problem**: MongoDB connection fails
- **Solution**: Check MongoDB Atlas network access allows all IPs (0.0.0.0/0)
- Verify connection string has correct password
- Check database user has correct permissions

**Problem**: Environment variables not working
- **Solution**: Restart the service after adding environment variables

### Frontend Issues

**Problem**: API calls fail with CORS error
- **Solution**: Update CORS settings in backend to include Vercel URL

**Problem**: API calls go to localhost
- **Solution**: Check `REACT_APP_API_URL` environment variable in Vercel

**Problem**: Build fails
- **Solution**: Check build logs in Vercel dashboard for specific errors

---

## 📊 Free Tier Limitations

### Render (Backend)
- ✅ 750 hours/month free
- ⚠️ Services spin down after 15 min inactivity (cold start ~30 sec)
- ✅ Automatic HTTPS
- ✅ Custom domain support

### Vercel (Frontend)
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Global CDN
- ✅ No cold starts

### MongoDB Atlas (Database)
- ✅ 512 MB storage free
- ✅ Shared cluster (M0)
- ✅ Suitable for development and small apps

---

## 🚀 Quick Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Backend deployed to Render
- [ ] Environment variables set in Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] CORS updated in backend
- [ ] Database seeded with initial data
- [ ] Tested login functionality
- [ ] Tested API endpoints

---

## 🎉 You're Live!

Your MediShop application is now deployed and accessible worldwide!

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Health**: `https://your-backend.onrender.com/api/health`

---

## 📝 Notes

1. **Render Free Tier**: Services may take 30 seconds to wake up after inactivity
2. **MongoDB Atlas**: Free tier is perfect for development and small projects
3. **Vercel**: Excellent for React apps with automatic deployments
4. **Environment Variables**: Never commit `.env` files to Git
5. **Updates**: Push to GitHub and both platforms auto-deploy

---

## 🔄 Updating Your App

1. Make changes locally
2. Test locally
3. Commit and push to GitHub
4. Vercel and Render will automatically deploy
5. Wait for deployment to complete
6. Test on production URLs

---

**Need Help?** Check the platform documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

Happy deploying! 🚀
