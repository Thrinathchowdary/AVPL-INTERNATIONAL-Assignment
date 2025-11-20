# 🚀 Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js v16+ installed
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] Git installed (for cloning)

## Step-by-Step Setup

### 1️⃣ Backend Setup

```powershell
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
Copy-Item .env.example .env

# Edit .env file with your settings
# For local MongoDB:
#   MONGODB_URI=mongodb://localhost:27017/taskmanagement
# For MongoDB Atlas:
#   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
```

**Edit backend/.env file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Start MongoDB (if using local):**
```powershell
# Windows - Run MongoDB service
net start MongoDB

# Or if you installed manually:
mongod
```

**Start the backend server:**
```powershell
# Development mode with auto-reload
npm run dev

# OR Production mode
npm start
```

✅ Backend should be running on http://localhost:5000

---

### 2️⃣ Frontend Setup

**Open a NEW terminal/PowerShell window:**

```powershell
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env
```

**Edit frontend/.env file:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Start the frontend:**
```powershell
npm start
```

✅ Frontend should open automatically at http://localhost:3000

---

## 3️⃣ Testing the Application

### Create Admin Account
1. Go to http://localhost:3000
2. Click "Register here"
3. Fill in the form:
   - Name: `Admin User`
   - Email: `admin@test.com`
   - Password: `Admin@123`
   - Role: Select `Admin`
4. Click Register

### Create Regular User Account
1. Logout (if logged in)
2. Register another account:
   - Name: `John Doe`
   - Email: `user@test.com`
   - Password: `User@123`
   - Role: Select `User`
3. Click Register

### Test Features
1. **As Admin:**
   - Create tasks
   - View all tasks from all users
   - Delete any task
   - Filter and search tasks

2. **As User:**
   - Create tasks
   - View only your own tasks
   - Edit/Delete only your own tasks
   - Filter and search your tasks

---

## 🔍 Troubleshooting

### MongoDB Connection Error
```
❌ Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service
```powershell
net start MongoDB
```

### Port Already in Use
```
❌ Error: Port 5000 is already in use
```
**Solution:** Kill the process or change port in .env
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change PORT in backend/.env to 5001
```

### CORS Error in Browser
```
❌ Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** 
- Make sure backend is running
- Check REACT_APP_API_URL in frontend/.env matches backend URL
- Restart both servers

### JWT Token Invalid
**Solution:** Clear browser localStorage and login again
```javascript
// In browser console (F12):
localStorage.clear();
```

### Dependencies Install Error
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

---

## 📦 Production Build

### Backend
```powershell
cd backend
npm install --production
node server.js
```

### Frontend
```powershell
cd frontend
npm run build
```
The `build` folder contains the production-ready static files.

---

## 🎯 API Endpoints Quick Reference

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/me` - Get current user (Protected)

### Tasks
- `POST /api/tasks` - Create task (Protected)
- `GET /api/tasks` - Get tasks with filters (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)
- `GET /api/tasks/stats` - Get task statistics (Protected)

### Query Parameters (GET /api/tasks)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (pending/in-progress/completed)
- `search` - Search in title and description

**Example:**
```
GET /api/tasks?page=1&limit=10&status=pending&search=meeting
```

---

## 🌐 MongoDB Atlas Setup (Optional)

If you don't have MongoDB installed locally:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster (Free tier M0)
4. Create database user
5. Whitelist your IP (or use 0.0.0.0/0 for all IPs)
6. Get connection string
7. Update MONGODB_URI in backend/.env:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

---

## ✨ Features Checklist

- [x] User Registration & Login
- [x] JWT Authentication
- [x] Password Hashing (bcrypt)
- [x] Role-based Access Control (User/Admin)
- [x] Create/Read/Update/Delete Tasks
- [x] Task Status Management
- [x] Pagination
- [x] Search & Filter
- [x] Joi Validation
- [x] Protected Routes
- [x] Modern DeepSeek-style UI
- [x] Glassmorphism Effects
- [x] Responsive Design
- [x] Toast Notifications
- [x] Loading States
- [x] Error Handling

---

## 📝 Default Test Accounts

After registration, you can use these:

**Admin:**
- Email: admin@test.com
- Password: Admin@123

**User:**
- Email: user@test.com
- Password: User@123

---

## 🎨 UI Features

- Dark theme with gradient accents
- Glassmorphism effects
- Smooth animations
- Floating gradient orbs
- Responsive design
- Modern card-based layout
- Status badges with colors
- Interactive hover effects

---

## 📚 Tech Stack Summary

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt Password Hashing
- Joi Validation
- CORS enabled

**Frontend:**
- React 18
- React Router v6
- Axios for API calls
- Context API for state
- Modern CSS with variables
- Responsive design

---

## 🤝 Support

If you encounter any issues:

1. Check all services are running (MongoDB, Backend, Frontend)
2. Verify .env files are configured correctly
3. Clear browser cache and localStorage
4. Restart both servers
5. Check console for error messages

---

**Happy Coding! 🎉**
