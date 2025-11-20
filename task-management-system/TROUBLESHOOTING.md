# 🔧 Troubleshooting Guide

Common issues and their solutions for the Task Management System.

---

## 📋 Table of Contents

1. [Installation Issues](#installation-issues)
2. [MongoDB Issues](#mongodb-issues)
3. [Backend Issues](#backend-issues)
4. [Frontend Issues](#frontend-issues)
5. [API Issues](#api-issues)
6. [Authentication Issues](#authentication-issues)
7. [Deployment Issues](#deployment-issues)

---

## 💾 Installation Issues

### Issue: `npm install` fails

**Symptoms:**
```
npm ERR! code ENOENT
npm ERR! syscall open
```

**Solutions:**
```powershell
# 1. Clear npm cache
npm cache clean --force

# 2. Delete existing node_modules and lock files
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# 3. Reinstall
npm install

# 4. If still fails, try with legacy peer deps
npm install --legacy-peer-deps
```

---

### Issue: Permission denied during installation

**Solutions:**
```powershell
# Run PowerShell as Administrator

# Or use npm with --force
npm install --force
```

---

## 🗄️ MongoDB Issues

### Issue: MongoDB connection refused

**Symptoms:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

**1. Check if MongoDB is running:**
```powershell
# Check MongoDB service status
Get-Service MongoDB

# Start MongoDB if not running
net start MongoDB
```

**2. If MongoDB is not installed:**
- Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud) - see DEPLOYMENT_GUIDE.md

**3. Check connection string in backend/.env:**
```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/taskmanagement

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
```

---

### Issue: Authentication failed for MongoDB Atlas

**Symptoms:**
```
MongoServerError: bad auth : authentication failed
```

**Solutions:**

1. Verify username and password in connection string
2. Ensure password is URL-encoded (replace special characters)
3. Check database user has correct permissions in Atlas
4. Verify IP address is whitelisted in Atlas Network Access

---

### Issue: Database connection timeout

**Solutions:**

1. Check internet connection (for Atlas)
2. Verify firewall isn't blocking MongoDB
3. Increase timeout in connection options:

```javascript
// config/db.js
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});
```

---

## 🖥️ Backend Issues

### Issue: Port 5000 already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**Option 1: Kill the process using port 5000**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Option 2: Change port in backend/.env**
```env
PORT=5001
```

---

### Issue: JWT_SECRET not found

**Symptoms:**
```
Error: JWT_SECRET is not defined
```

**Solutions:**

1. Create backend/.env file from .env.example:
```powershell
cd backend
Copy-Item .env.example .env
```

2. Edit backend/.env and set JWT_SECRET:
```env
JWT_SECRET=your_super_secret_jwt_key_here
```

---

### Issue: Cannot find module errors

**Symptoms:**
```
Error: Cannot find module 'express'
```

**Solutions:**
```powershell
cd backend
npm install
```

---

## 🎨 Frontend Issues

### Issue: React app won't start

**Symptoms:**
```
Error: Create React App requires Node 14 or higher
```

**Solutions:**

1. Check Node version:
```powershell
node --version
# Should be v16 or higher
```

2. Update Node.js from https://nodejs.org/

---

### Issue: REACT_APP_API_URL not defined

**Solutions:**

1. Create frontend/.env:
```powershell
cd frontend
Copy-Item .env.example .env
```

2. Edit frontend/.env:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Restart the frontend server (Ctrl+C and npm start again)

---

### Issue: Blank page or console errors

**Solutions:**

1. Open browser console (F12)
2. Check for specific errors
3. Common fixes:

```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install

# Clear browser cache (Ctrl+Shift+Delete)
```

---

### Issue: "Invalid Host header" error

**Solutions:**

Create `frontend/.env.local`:
```env
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

Or add to frontend/package.json:
```json
{
  "scripts": {
    "start": "DANGEROUSLY_DISABLE_HOST_CHECK=true react-scripts start"
  }
}
```

---

## 🔌 API Issues

### Issue: CORS error

**Symptoms:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions:**

1. **Verify backend is running** on port 5000
2. **Check CORS configuration** in backend/server.js:
```javascript
app.use(cors());
```

3. **Verify API URL** in frontend/.env:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Restart both servers**

---

### Issue: API returns 404

**Symptoms:**
```
GET http://localhost:5000/api/tasks 404 (Not Found)
```

**Solutions:**

1. Verify backend is running
2. Check API URL is correct
3. Verify route is defined in backend/routes
4. Check server.js has the route registered:
```javascript
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);
```

---

### Issue: Network request failed

**Solutions:**

1. Check backend server is running
2. Verify no firewall blocking
3. Test API with browser: http://localhost:5000/api/health
4. Check console for detailed error

---

## 🔐 Authentication Issues

### Issue: Token expired or invalid

**Symptoms:**
```
401 Unauthorized: Token is invalid or expired
```

**Solutions:**

**Clear localStorage and login again:**
```javascript
// In browser console (F12):
localStorage.clear();
// Then refresh page and login
```

---

### Issue: User automatically logged out

**Solutions:**

1. This is normal behavior when token expires (default 7 days)
2. To increase token lifetime, edit backend/.env:
```env
JWT_EXPIRE=30d
```

3. Restart backend server

---

### Issue: Cannot login - "Invalid credentials"

**Solutions:**

1. Verify email and password are correct
2. Check user exists in database:
```javascript
// MongoDB shell
use taskmanagement
db.users.find({ email: "your@email.com" })
```

3. If user doesn't exist, register first
4. Check password meets requirements (min 6 characters)

---

### Issue: Redirect loop on protected routes

**Solutions:**

Check AuthContext.jsx is properly wrapped around App:
```javascript
// index.js
<AuthProvider>
  <App />
</AuthProvider>
```

---

## 🚀 Deployment Issues

### Issue: Environment variables not working on hosting

**Solutions:**

1. Verify variables are set in hosting dashboard
2. Check variable names match exactly (case-sensitive)
3. Restart the service after adding variables
4. For React, variable names MUST start with `REACT_APP_`

---

### Issue: MongoDB Atlas connection fails in production

**Solutions:**

1. **Check IP Whitelist** in MongoDB Atlas:
   - Go to Network Access
   - Add 0.0.0.0/0 for all IPs (development)
   - Or add specific hosting service IPs

2. **Verify connection string**:
   - Use MongoDB Atlas connection string
   - Encode password special characters
   - Use `mongodb+srv://` protocol

---

### Issue: Frontend shows old version after deployment

**Solutions:**

1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Try incognito/private window
4. Check deployment succeeded on hosting platform

---

### Issue: API calls work locally but fail in production

**Solutions:**

1. **Update CORS** in backend/server.js:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

2. **Add FRONTEND_URL** to backend environment variables:
```env
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

3. **Update frontend .env** with production API URL:
```env
REACT_APP_API_URL=https://your-backend-domain.onrender.com/api
```

---

## 🔍 Debugging Tips

### Enable Detailed Logging

**Backend:**
```javascript
// server.js - Add before routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});
```

**Frontend:**
```javascript
// services/api.js - Add to interceptors
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.log('Error:', error.response);
    return Promise.reject(error);
  }
);
```

---

### Check Browser Console

Always check browser console (F12) for:
- JavaScript errors
- Failed network requests
- Console.log outputs
- React warnings

---

### Check Backend Logs

Monitor backend terminal for:
- MongoDB connection status
- API request logs
- Error messages
- Stack traces

---

### Test API with Postman/Thunder Client

Test API endpoints independently:

1. Install Postman or Thunder Client (VS Code extension)
2. Test endpoints manually
3. Verify responses
4. Check authentication headers

---

## 🆘 Still Having Issues?

### Step-by-Step Debug Process

1. **Verify all services are running:**
   - MongoDB: `Get-Service MongoDB`
   - Backend: Check terminal
   - Frontend: Check browser

2. **Check all environment files exist:**
   - backend/.env
   - frontend/.env

3. **Verify environment variables:**
   ```powershell
   # Backend
   cd backend
   Get-Content .env
   
   # Frontend
   cd frontend
   Get-Content .env
   ```

4. **Clear everything and restart:**
   ```powershell
   # Stop all servers (Ctrl+C)
   
   # Clear browser data
   # In browser: Ctrl+Shift+Delete
   # Clear localStorage: F12 > Console > localStorage.clear()
   
   # Restart servers
   cd backend; npm run dev
   cd frontend; npm start
   ```

5. **Check for typos:**
   - API URLs
   - Environment variable names
   - MongoDB connection strings

6. **Update dependencies:**
   ```powershell
   cd backend; npm update
   cd frontend; npm update
   ```

---

## 📞 Getting Help

If you still can't resolve the issue:

1. **Read the error message carefully**
   - Often contains the solution
   - Note the file and line number

2. **Check documentation:**
   - README.md
   - SETUP_GUIDE.md
   - API_DOCUMENTATION.md

3. **Search for the error:**
   - Google the exact error message
   - Check Stack Overflow
   - Search GitHub issues

4. **Review the code:**
   - Check recently changed files
   - Compare with working version
   - Use git diff if using version control

---

## ✅ Prevention Tips

**Before making changes:**
- Commit working code to git
- Document what you're changing
- Test in small increments
- Keep backups

**Regular maintenance:**
- Update dependencies monthly
- Review security advisories
- Test all features regularly
- Keep documentation updated

---

**Most issues can be resolved by:**
1. Reading error messages carefully
2. Checking environment variables
3. Ensuring all services are running
4. Clearing caches and restarting
5. Verifying configuration files

---

Good luck! 🍀
