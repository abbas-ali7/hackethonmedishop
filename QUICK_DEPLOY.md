# ⚡ Quick Deployment Steps

Follow these steps to deploy your MediShop app for FREE in under 30 minutes!

## 🎯 Step-by-Step Deployment

### 1️⃣ Setup MongoDB Atlas (5 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → Sign up
2. Create **FREE M0 cluster** (choose closest region)
3. **Database Access**: Create user (save username/password!)
4. **Network Access**: Click "Allow Access from Anywhere" (0.0.0.0/0)
5. **Get Connection String**: 
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `medishop`
   - **Save this!** Example: `mongodb+srv://user:pass@cluster.mongodb.net/medishop?retryWrites=true&w=majority`

---

### 2️⃣ Deploy Backend to Render (10 minutes)

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo → Select repository
4. Configure:
   - **Name**: `medishop-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**
5. Click **"Advanced"** → Add Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string-from-step-1
   JWT_SECRET=generate-a-random-32-character-string
   ```
6. Click **"Create Web Service"**
7. Wait 5-10 minutes for first deployment
8. **Copy your backend URL** (e.g., `https://medishop-backend.onrender.com`)

---

### 3️⃣ Deploy Frontend to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
5. Click **"Environment Variables"** → Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual Render backend URL from step 2)
6. Click **"Deploy"**
7. Wait 2-5 minutes
8. **Your app is live!** 🎉

---

### 4️⃣ Seed Database (5 minutes)

After deployment, seed your database:

**Option A: Use MongoDB Compass**
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect with your MongoDB Atlas connection string
3. Run your `seed.js` script or manually add data

**Option B: Create a seed endpoint** (temporary)
Add this to your backend temporarily, call it once, then remove:

```javascript
// In backend/src/routes/auth.js or create new route
router.post('/seed', async (req, res) => {
  // Your seed logic here
  // Then DELETE this endpoint after seeding
});
```

---

## ✅ Test Your Deployment

1. Visit your Vercel frontend URL
2. Test backend: `https://your-backend.onrender.com/api/health`
3. Try creating an account
4. Try logging in
5. Browse medicines and add to cart

---

## 🔗 Your Live URLs

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Health**: `https://your-backend.onrender.com/api/health`

---

## ⚠️ Important Notes

1. **Render Free Tier**: Services sleep after 15 min inactivity. First request takes ~30 seconds to wake up.
2. **MongoDB Atlas**: Free tier gives 512MB storage - perfect for development!
3. **Environment Variables**: Never commit `.env` files. Always use platform environment variables.
4. **CORS**: Already configured to allow all origins. Works for free deployment.

---

## 🐛 Common Issues

**Backend timeout?** → Render is waking up (wait 30 seconds)

**CORS error?** → Check backend URL in frontend environment variable

**Database connection failed?** → Check MongoDB Atlas network access allows all IPs

**Build failed?** → Check build logs in Vercel/Render dashboard

---

## 📚 Full Documentation

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**That's it! Your app is now live and FREE! 🚀**
