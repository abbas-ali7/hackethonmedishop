# 📤 What to Upload to GitHub - Checklist

## ✅ UPLOAD THESE:

### Root Folder Files:
- ✅ `package.json`
- ✅ `README.md`
- ✅ `HOW_TO_DEPLOY.md`
- ✅ `QUICK_DEPLOY.md`
- ✅ `DEPLOYMENT_GUIDE.md`
- ✅ All other `.md` files
- ✅ `vercel.json`
- ✅ `render.yaml`
- ✅ `.gitignore`

### Backend Folder (`backend/`):
- ✅ `backend/src/` (entire folder)
- ✅ `backend/package.json`
- ✅ `backend/package-lock.json`
- ✅ `backend/seed.js`
- ✅ `backend/API_DOCUMENTATION.md`
- ✅ `backend/.gitignore`

### Frontend Folder (`frontend/`):
- ✅ `frontend/src/` (entire folder)
- ✅ `frontend/public/` (entire folder)
- ✅ `frontend/package.json`
- ✅ `frontend/package-lock.json`
- ✅ `frontend/tailwind.config.js`
- ✅ `frontend/postcss.config.js`
- ✅ `frontend/vercel.json`
- ✅ `frontend/.gitignore`
- ✅ `frontend/FRONTEND_GUIDE.md`

## ❌ DO NOT UPLOAD:

- ❌ `node_modules/` (in root, frontend, and backend)
- ❌ `.env` files (anywhere)
- ❌ `.env.local` files
- ❌ `build/` folders
- ❌ `dist/` folders
- ❌ `.git/` folder (if exists)
- ❌ Any log files (`.log`)

---

## 🎯 Easy Method:

1. **Select all files** in your folder
2. **Hold CTRL** and **click to DESELECT**:
   - `node_modules` folders (all of them)
   - `.env` files
   - `build` folders
3. **Drag the selected files** to GitHub

---

## 💡 Tip:

If you accidentally upload `node_modules`, GitHub will reject it (it's too large). That's okay - just remove it and upload again without it.
