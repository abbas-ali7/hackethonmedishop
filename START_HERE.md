# MediShop - Start Here! 🚀

Welcome to MediShop! This file will guide you through getting started.

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Everything
```bash
npm run install-all
```
This installs all dependencies for frontend and backend.

### Step 2: Setup Database
```bash
cd backend
node seed.js
cd ..
```
This creates demo data with sample medicines and users.

### Step 3: Run Everything
```bash
npm run dev
```

### Step 4: Open in Browser
```
http://localhost:3000
```

**That's it! You're ready to go! 🎉**

---

## 👤 Demo Login Credentials

After seeding the database, you can login with:

**Regular User:**
- Email: `user@example.com`
- Password: `password123`

**Admin User (has access to all APIs):**
- Email: `admin@example.com`
- Password: `admin123`

---

## 🎯 What You Can Do Now

### As a Regular User:
1. ✅ Browse medicines on the medicines page
2. ✅ Search for specific medicines
3. ✅ Filter by category and price
4. ✅ Add medicines to cart
5. ✅ View and manage your cart
6. ✅ Proceed to checkout
7. ✅ Place an order
8. ✅ View your order history

### As an Admin:
1. ✅ All of the above
2. ✅ Plus, you can use the API to:
   - Add new medicines
   - Update medicine details
   - Manage orders
   - View all users

---

## 🔗 Important URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

---

## 📚 Documentation Files

| File | What It Contains |
|------|-----------------|
| **README.md** | Complete project overview & all features |
| **SETUP_GUIDE.md** | Detailed installation steps & troubleshooting |
| **GETTING_STARTED.md** | Project overview & learning guide |
| **COMPLETION_SUMMARY.md** | What's included & what to do next |
| **PROJECT_FILES.md** | Complete file listing & structure |
| **backend/API_DOCUMENTATION.md** | All API endpoints with examples |
| **frontend/FRONTEND_GUIDE.md** | React components & architecture |

---

## 🛠️ If Something Goes Wrong

### Problem: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Problem: MongoDB connection error
**Solution**: Make sure MongoDB is running:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows: Use Services app
```

### Problem: Port 3000 or 5000 already in use
**Solution**: Kill the process:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Problem: No data in database after running npm run dev
**Solution**: Run the seed script:
```bash
cd backend
node seed.js
cd ..
```

For more troubleshooting, see **SETUP_GUIDE.md**

---

## 🎓 Learning Paths

### Path 1: Run & Explore (30 minutes)
1. Run `npm run dev`
2. Browse the application
3. Add items to cart
4. Place an order
5. Check order history

### Path 2: Review Code (1-2 hours)
1. Open `frontend/src/pages/` - see the page components
2. Open `frontend/src/components/` - see reusable components
3. Open `backend/src/routes/` - see API endpoints
4. Open `backend/src/models/` - see database structure

### Path 3: Modify & Customize (2-4 hours)
1. Change colors in `frontend/tailwind.config.js`
2. Update text in components
3. Add a new route
4. Modify API response

### Path 4: Deploy (1-2 hours)
1. Setup MongoDB Atlas
2. Deploy backend to Heroku/Railway
3. Deploy frontend to Vercel/Netlify

---

## 📁 Project Layout (Simple View)

```
medishop/
├── 📱 frontend/          ← React app (user interface)
├── 🔧 backend/           ← API server & database
├── 📖 README.md          ← Main documentation
└── 🚀 SETUP_GUIDE.md     ← Installation guide
```

---

## ✨ Key Features

🌟 **Beautiful UI** - Green & white medical theme  
🌟 **Responsive** - Works on phone, tablet, desktop  
🌟 **Secure** - Password hashing, JWT authentication  
🌟 **Fast** - Optimized for performance  
🌟 **Complete** - Everything you need to build a business  
🌟 **Well-Documented** - Every file is documented  

---

## 🎯 Next Steps

### Immediate (Next 5 minutes):
- [ ] Run `npm run install-all`
- [ ] Run `cd backend && node seed.js && cd ..`
- [ ] Run `npm run dev`
- [ ] Login at http://localhost:3000

### Short Term (Today):
- [ ] Explore the app as a user
- [ ] Explore the app as admin
- [ ] Browse the code
- [ ] Read the documentation

### Medium Term (This Week):
- [ ] Customize colors & text
- [ ] Add a new feature
- [ ] Deploy to your own server

### Long Term (This Month):
- [ ] Integrate payment system
- [ ] Add more features
- [ ] Build admin dashboard UI
- [ ] Launch your product

---

## 💡 Customization Examples

### Change the Green Color:
Edit `frontend/tailwind.config.js` and update the color values.

### Add a New Page:
1. Create file in `frontend/src/pages/NewPage.js`
2. Add route in `frontend/src/App.js`
3. Create navigation link

### Add a New API Endpoint:
1. Create route in `backend/src/routes/`
2. Create controller in `backend/src/controllers/`
3. Test with API tools

### Change Database Fields:
1. Modify schema in `backend/src/models/`
2. Update controller logic
3. Update API documentation

---

## 🔐 Security Reminders

⚠️ **Important**: This is for development. For production:

1. Change `JWT_SECRET` in `backend/.env`
2. Use strong, random passwords
3. Never commit `.env` files
4. Enable HTTPS
5. Use MongoDB Atlas instead of local MongoDB
6. Setup rate limiting
7. Add input validation
8. Monitor API usage

---

## 📊 What's Inside

**Frontend (React):**
- 7 complete pages
- 4 reusable components
- 2 context stores for state management
- Beautiful responsive design

**Backend (Node.js/Express):**
- 15+ API endpoints
- User authentication
- 3 database models
- Admin role system
- Complete validation

**Database (MongoDB):**
- User data
- Medicine catalog
- Order history
- All pre-configured

**Documentation:**
- 7 detailed guides
- API reference
- Component documentation
- Setup instructions

---

## 🎉 You're Ready!

Your complete e-commerce platform is ready to:
- ✅ Run locally
- ✅ Be customized
- ✅ Be tested
- ✅ Be deployed

Just run:
```bash
npm run dev
```

And start building! 🚀

---

## 📞 Need Help?

### Quick Links:
1. **Setup Issues**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. **API Questions**: See [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)
3. **Code Questions**: See [FRONTEND_GUIDE.md](./frontend/FRONTEND_GUIDE.md)
4. **General Info**: See [README.md](./README.md)

### Common Commands:
```bash
# Install dependencies
npm run install-all

# Seed database
cd backend && node seed.js && cd ..

# Run both servers
npm run dev

# Run backend only
npm run backend

# Run frontend only
npm run frontend
```

---

## 🎊 Let's Go!

```bash
# One command to start everything:
npm run install-all && cd backend && node seed.js && cd .. && npm run dev
```

Then open **http://localhost:3000** and enjoy! 🎉

---

**Happy Coding! 💚**

**Need more info? Read the other documentation files!**

- **README.md** - Complete guide
- **SETUP_GUIDE.md** - Installation help
- **GETTING_STARTED.md** - Project overview
- **API_DOCUMENTATION.md** - API reference
- **FRONTEND_GUIDE.md** - Component guide
- **COMPLETION_SUMMARY.md** - What's included
- **PROJECT_FILES.md** - File listing
