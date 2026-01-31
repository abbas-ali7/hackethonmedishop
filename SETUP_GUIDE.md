# Installation & Setup Guide

This guide will help you get the MediShop application up and running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** v6+ (comes with Node.js)
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account)
- **Git** ([Download](https://git-scm.com/))
- A code editor (VS Code recommended)

### Verify Installations

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git
git --version
```

---

## 🚀 Step-by-Step Setup

### Step 1: Clone or Extract the Project

**If using Git:**
```bash
git clone <repository-url>
cd medishop
```

**If you have a ZIP file:**
```bash
# Extract the ZIP file and navigate to the project
cd medishop
```

---

### Step 2: Install Dependencies

**Option A: Install All at Once (Recommended)**
```bash
npm run install-all
```

**Option B: Install Separately**

Backend:
```bash
cd backend
npm install
cd ..
```

Frontend:
```bash
cd frontend
npm install
cd ..
```

---

### Step 3: Setup MongoDB

#### Option A: Local MongoDB Installation

**Windows:**
1. Download [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the prompts
3. MongoDB should run as a service automatically
4. Verify it's running: `mongosh` (or `mongo`)

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
# Using APT
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user and password
4. Get the connection string
5. Update `MONGODB_URI` in `.env`

Example Atlas URI:
```
mongodb+srv://username:password@cluster.mongodb.net/medishop?retryWrites=true&w=majority
```

---

### Step 4: Configure Environment Variables

**Backend Configuration:**

Navigate to `backend` directory and copy the example file:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medishop
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas**, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medishop?retryWrites=true&w=majority
```

**Frontend Configuration:**

Navigate to `frontend` directory:
```bash
cd ../frontend
cp .env.example .env
```

The API URL should already be set:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Step 5: Seed Database with Demo Data (Optional)

Navigate to backend directory and run the seed script:

```bash
cd backend
node seed.js
```

This will create:
- Demo user: `user@example.com` / `password123`
- Admin user: `admin@example.com` / `admin123`
- 12 sample medicines with various categories

---

### Step 6: Start the Application

**Option A: Run Both Servers Together (Recommended)**

From the project root directory:
```bash
npm run dev
```

This will start:
- Backend on http://localhost:5000
- Frontend on http://localhost:3000

**Option B: Run Servers Separately**

Terminal 1 - Backend:
```bash
npm run backend
```

Terminal 2 - Frontend:
```bash
npm run frontend
```

---

### Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

**Demo Credentials:**
- Email: `user@example.com`
- Password: `password123`

---

## ✅ Verification Checklist

After setup, verify everything is working:

- [ ] Frontend loads at http://localhost:3000
- [ ] Can navigate to medicines page
- [ ] Can login with demo credentials
- [ ] Can add medicines to cart
- [ ] Cart persists on page refresh
- [ ] Can complete checkout
- [ ] Can view order history
- [ ] Backend API is responding: http://localhost:5000/api/health

---

## 🐛 Troubleshooting

### Issue: "Cannot find module" Error

**Solution:**
```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install
cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: MongoDB Connection Error

**Check if MongoDB is running:**

Windows:
```bash
tasklist | findstr mongod
```

macOS:
```bash
brew services list
```

Linux:
```bash
systemctl status mongod
```

Start MongoDB if not running:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows: Use Services app or run mongod.exe
```

### Issue: Port Already in Use

**Kill the process using the port:**

Windows:
```bash
# For port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

macOS/Linux:
```bash
# For port 5000
lsof -i :5000
kill -9 <PID>

# For port 3000
lsof -i :3000
kill -9 <PID>
```

Or change ports in configuration.

### Issue: CORS Error

**Solution:** CORS is already configured in the backend. If you still face issues:

1. Ensure backend is running on port 5000
2. Ensure frontend is running on port 3000
3. Check the API URL in frontend `.env`

### Issue: Cannot Login

**Solution:**
1. Verify MongoDB is running and contains data
2. Run the seed script: `node backend/seed.js`
3. Check backend console for errors
4. Clear browser localStorage: DevTools → Application → Local Storage → Clear All

### Issue: Images Not Loading

**Solution:**
- The app uses placeholder images by default
- Replace image URLs with real URLs if needed
- Check browser console for 404 errors

### Issue: "npm: command not found"

**Solution:**
- Node.js may not be installed or not in PATH
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal after installation

---

## 📝 Development Tips

### Working with Git

```bash
# Create a new branch for features
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature
```

### Adding New Dependencies

Backend:
```bash
cd backend
npm install <package-name>
```

Frontend:
```bash
cd frontend
npm install <package-name>
```

### Hot Reload

Both servers support hot reload:
- Backend: Changes to `.js` files auto-reload with nodemon
- Frontend: Changes to `.js` files auto-reload with React Scripts

### Debugging

**Backend:**
```bash
# Add this to a route to log data
console.log('Data:', data);
```

**Frontend:**
- Open DevTools (F12)
- Check Console tab for errors
- Use React DevTools extension for component debugging

---

## 🔒 Security Notes

⚠️ **Important:** The configuration below is for development only. For production:

1. Change `JWT_SECRET` to a strong random string
2. Use environment variables for all secrets
3. Enable HTTPS
4. Set proper CORS origins
5. Add rate limiting
6. Implement payment gateway securely
7. Use environment-specific configurations

---

## 📚 Next Steps

After setup, explore:

1. **Frontend**
   - Modify UI in `src/components/`
   - Add new pages in `src/pages/`
   - Update styles in `src/index.css`

2. **Backend**
   - Create new API endpoints in `src/routes/`
   - Add business logic in `src/controllers/`
   - Modify database models in `src/models/`

3. **Database**
   - Add more seed data in `backend/seed.js`
   - Create indexes for performance
   - Backup data regularly

---

## 📞 Getting Help

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Read the main [README.md](../README.md)
3. Review [API Documentation](../backend/API_DOCUMENTATION.md)
4. Check [Frontend Guide](../frontend/FRONTEND_GUIDE.md)
5. Search error messages online
6. Contact support: support@medishop.com

---

## 🎉 Success!

If you've reached this point, your MediShop application is ready to use!

**Quick Links:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health Check: http://localhost:5000/api/health

Happy coding! 🚀

---

**Last Updated:** January 2026
**Version:** 1.0.0
