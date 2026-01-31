# Environment Variables Guide

## Backend Environment Variables

Create a `.env` file in the `backend/` folder with these variables:

```env
# MongoDB Connection
# For local: mongodb://localhost:27017/medishop
# For production: mongodb+srv://username:password@cluster.mongodb.net/medishop?retryWrites=true&w=majority
MONGODB_URI=mongodb://localhost:27017/medishop

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Change this to a random string in production)
# Generate a secure random string (at least 32 characters)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Frontend Environment Variables

Create a `.env` file in the `frontend/` folder with these variables:

```env
# Backend API URL
# For local development: http://localhost:5000/api
# For production: https://your-backend-url.onrender.com/api
REACT_APP_API_URL=http://localhost:5000/api
```

## Production Deployment

### Render (Backend)
Add these environment variables in Render dashboard:
- `NODE_ENV=production`
- `PORT=10000` (or leave empty, Render sets it automatically)
- `MONGODB_URI=your-mongodb-atlas-connection-string`
- `JWT_SECRET=your-secure-random-string`

### Vercel (Frontend)
Add this environment variable in Vercel dashboard:
- `REACT_APP_API_URL=https://your-backend-url.onrender.com/api`

## Security Notes

⚠️ **Never commit `.env` files to Git!**

- Add `.env` to `.gitignore`
- Use environment variables in your hosting platform
- Generate strong JWT secrets (use online generators)
- Keep MongoDB credentials secure
