# 🚀 How to Deploy MediShop - Complete Guide

**Deploy your MediShop app for FREE in 30 minutes!**

---

## 📋 What You Need (All FREE)

1. ✅ GitHub account (free)
2. ✅ MongoDB Atlas account (free) - [Sign up here](https://www.mongodb.com/cloud/atlas)
3. ✅ Render account (free) - [Sign up here](https://render.com)
4. ✅ Vercel account (free) - [Sign up here](https://vercel.com)

---

## 🗄️ STEP 1: Setup MongoDB Database (5 minutes)

### 1.1 Create MongoDB Atlas Account
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** and create an account
3. Create a new organization (or use default)
4. Create a new project (name it "MediShop")

### 1.2 Create Free Database Cluster
1. Click **"Build a Database"**
2. Select **FREE (M0)** tier
3. Choose a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you
5. Name your cluster: `medishop-cluster`
6. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create a username (e.g., `medishop_user`)
5. Create a password (SAVE THIS PASSWORD!)
6. Set privileges to **"Atlas admin"**
7. Click **"Add User"**

### 1.4 Allow Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (this adds `0.0.0.0/0`)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go back to **"Database"** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. **Replace these parts:**
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add `/medishop` before the `?` (so it becomes `...mongodb.net/medishop?retryWrites...`)
5. **Save this connection string!** You'll need it in Step 2.

**Example final connection string:**
```
mongodb+srv://medishop_user:yourpassword123@cluster0.xxxxx.mongodb.net/medishop?retryWrites=true&w=majority
```

---

## 🔧 STEP 2: Deploy Backend to Render (10 minutes)

### 2.1 Push Code to GitHub
1. Make sure your code is on GitHub
2. If not, create a new repository and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/medishop.git
   git push -u origin main
   ```

### 2.2 Create Render Account
1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account** (recommended)

### 2.3 Create Web Service
1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub account (if not already connected)
3. Select your **MediShop repository**
4. Click **"Connect"**

### 2.4 Configure Backend Service
Fill in these settings:

- **Name**: `medishop-backend` (or any name you like)
- **Region**: Choose closest to you
- **Branch**: `main` (or `master`)
- **Root Directory**: `backend` ⚠️ **IMPORTANT!**
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Select **"Free"**

### 2.5 Add Environment Variables
1. Scroll down to **"Advanced"** section
2. Click **"Add Environment Variable"**
3. Add these **4 variables** one by one:

   **Variable 1:**
   - Key: `NODE_ENV`
   - Value: `production`

   **Variable 2:**
   - Key: `PORT`
   - Value: `10000` (or leave empty, Render will set it)

   **Variable 3:**
   - Key: `MONGODB_URI`
   - Value: `your-mongodb-connection-string-from-step-1` (paste the full connection string)

   **Variable 4:**
   - Key: `JWT_SECRET`
   - Value: `generate-a-random-32-character-string-here` (you can use any random string, like: `medishop-secret-key-2024-super-secure-random`)

### 2.6 Deploy
1. Click **"Create Web Service"** at the bottom
2. Wait 5-10 minutes for the first deployment
3. You'll see build logs - wait until it says "Your service is live"
4. **Copy your backend URL** (looks like: `https://medishop-backend.onrender.com`)
5. **Save this URL!** You'll need it in Step 3.

---

## 🎨 STEP 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Create Vercel Account
1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Sign up with your **GitHub account** (recommended)

### 3.2 Import Project
1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Import your **MediShop repository** from GitHub
3. Click **"Import"**

### 3.3 Configure Frontend
1. **Framework Preset**: Select **"Create React App"** (or it auto-detects)
2. **Root Directory**: Click **"Edit"** and set to `frontend` ⚠️ **IMPORTANT!**
3. **Build Command**: `npm run build` (auto-filled)
4. **Output Directory**: `build` (auto-filled)

### 3.4 Add Environment Variable
1. Scroll down to **"Environment Variables"**
2. Click **"Add"**
3. Add this variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api`
   - ⚠️ Replace `your-backend-url.onrender.com` with your actual Render backend URL from Step 2!

**Example:**
```
REACT_APP_API_URL=https://medishop-backend.onrender.com/api
```

### 3.5 Deploy
1. Click **"Deploy"** at the bottom
2. Wait 2-5 minutes for build to complete
3. **Your app is live!** 🎉
4. Copy your frontend URL (looks like: `https://medishop.vercel.app`)

---

## 🌱 STEP 4: Seed Your Database (5 minutes)

After deployment, you need to add sample data to your database.

### Option A: Use the Seed Endpoint (Easiest)

Your backend already has a seed endpoint! Just call it once:

1. Open your browser
2. Go to: `https://your-backend-url.onrender.com/api/seed`
3. Or use a tool like Postman to make a POST request to: `https://your-backend-url.onrender.com/api/seed`
4. This will create:
   - Demo user: `user@example.com` / `password123`
   - Admin user: `admin@example.com` / `admin123`
   - 12 sample medicines

### Option B: Use MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your MongoDB Atlas connection string
3. Manually add data or import from your `seed.js` file

---

## ✅ STEP 5: Test Your Deployment

1. **Visit your frontend**: Go to your Vercel URL
2. **Test backend**: Visit `https://your-backend.onrender.com/api/health` (should show success)
3. **Create account**: Try signing up
4. **Login**: Use demo credentials if you seeded the database
5. **Browse medicines**: Check if medicines load
6. **Add to cart**: Test the shopping cart

---

## 🔗 Your Live URLs

After deployment, you'll have:

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Health Check**: `https://your-backend.onrender.com/api/health`

---

## ⚠️ Important Notes

### Render Free Tier Limitations
- ⏰ Services sleep after 15 minutes of inactivity
- 🐌 First request after sleep takes ~30 seconds (waking up)
- ✅ Perfect for development and small projects

### MongoDB Atlas Free Tier
- 💾 512 MB storage (enough for development)
- ✅ Free forever
- ✅ Perfect for small apps

### Vercel Free Tier
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ No cold starts

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend returns 503 or times out
- **Solution**: Render is waking up. Wait 30 seconds and try again.

**Problem**: MongoDB connection failed
- **Solution**: 
  - Check MongoDB Atlas network access allows `0.0.0.0/0`
  - Verify connection string has correct password
  - Check database user has correct permissions

**Problem**: Environment variables not working
- **Solution**: Restart the service in Render dashboard after adding variables

### Frontend Issues

**Problem**: API calls fail with CORS error
- **Solution**: CORS is already configured. Check your `REACT_APP_API_URL` environment variable in Vercel

**Problem**: API calls go to localhost
- **Solution**: Check `REACT_APP_API_URL` in Vercel environment variables

**Problem**: Build fails
- **Solution**: Check build logs in Vercel dashboard for specific errors

---

## 📚 Quick Reference

### Environment Variables Summary

**Render (Backend):**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/medishop?retryWrites=true&w=majority
JWT_SECRET=your-random-secret-string
```

**Vercel (Frontend):**
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## 🎉 Success!

Your MediShop is now live and accessible worldwide!

**Next Steps:**
- Share your app URL with others
- Customize the design
- Add more features
- Monitor usage in Render/Vercel dashboards

---

## 📞 Need Help?

- Check build logs in Render/Vercel dashboards
- Review error messages carefully
- Make sure all environment variables are set correctly
- Verify MongoDB Atlas network access

---

**That's it! Your app is deployed and FREE! 🚀**
