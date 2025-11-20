# 🚀 Deployment Guide

Complete guide for deploying the Task Management System to production.

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [MongoDB Atlas Setup](#mongodb-atlas-setup)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features tested locally
- [ ] MongoDB Atlas account created
- [ ] Environment variables documented
- [ ] Security measures reviewed
- [ ] API endpoints tested
- [ ] Error handling verified
- [ ] CORS configured properly
- [ ] JWT secret is strong and unique
- [ ] Git repository is clean

---

## 🗄️ MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create organization and project

### 2. Create Cluster

1. Click "Build a Database"
2. Choose FREE tier (M0 Sandbox)
3. Select cloud provider (AWS, GCP, or Azure)
4. Choose region closest to your users
5. Name your cluster (e.g., "TaskManagement")
6. Click "Create"

### 3. Configure Database Access

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose authentication method: "Password"
4. Set username and strong password
5. Database User Privileges: "Atlas Admin" or "Read and write to any database"
6. Click "Add User"

### 4. Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add specific IP addresses of your hosting servers
5. Click "Confirm"

### 5. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with `taskmanagement`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

---

## 🖥️ Backend Deployment

### Option 1: Deploy to Render

**Render** offers free tier with automatic deployments from Git.

#### Steps:

1. **Push to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the backend folder
   - Configure:
     - **Name:** task-management-api
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `node server.js`
     - **Plan:** Free

4. **Add Environment Variables**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_strong_jwt_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=production
   PORT=5000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://task-management-api.onrender.com`

---

### Option 2: Deploy to Heroku

#### Steps:

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create task-management-api
   ```

4. **Add Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_connection_string"
   heroku config:set JWT_SECRET="your_jwt_secret"
   heroku config:set JWT_EXPIRE="7d"
   heroku config:set NODE_ENV="production"
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Open App**
   ```bash
   heroku open
   ```

---

### Option 3: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub repo
4. Select backend folder
5. Add environment variables
6. Deploy

---

## 🎨 Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

**Vercel** is perfect for React apps with automatic deployments.

#### Steps:

1. **Update Frontend .env**
   ```env
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

2. **Build Locally (Test)**
   ```bash
   cd frontend
   npm run build
   ```

3. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial frontend commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

4. **Deploy to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your frontend repository
   - Configure:
     - **Framework Preset:** Create React App
     - **Root Directory:** frontend (if not root)
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`

5. **Add Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-app.vercel.app`

---

### Option 2: Deploy to Netlify

#### Steps:

1. **Build the App**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - Sign up
   - Drag & drop the `build` folder
   - Or connect GitHub for automatic deployments

3. **Configure Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add `REACT_APP_API_URL`

4. **Configure Redirects** (for React Router)
   Create `frontend/public/_redirects`:
   ```
   /*    /index.html   200
   ```

---

### Option 3: Deploy to GitHub Pages

#### Steps:

1. **Install gh-pages**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/task-management",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

---

## 🔐 Environment Variables

### Backend (Production)

```env
# MongoDB Atlas connection
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority

# JWT Secret (use strong random string)
JWT_SECRET=your_very_strong_random_secret_key_minimum_32_characters

# JWT Expiration
JWT_EXPIRE=7d

# Environment
NODE_ENV=production

# Port (usually provided by hosting service)
PORT=5000
```

### Frontend (Production)

```env
# Backend API URL (your deployed backend)
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🔒 Security Checklist

Before going to production:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Set NODE_ENV to "production"
- [ ] Enable HTTPS on both frontend and backend
- [ ] Configure CORS to allow only your frontend domain
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB Atlas IP whitelist
- [ ] Implement rate limiting (optional but recommended)
- [ ] Add API request logging
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Regular security audits with `npm audit`

---

## 🔧 Update CORS in Backend

For production, update `backend/server.js`:

```javascript
const cors = require('cors');

// Development
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

// Production - Allow only your frontend domain
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: 'https://your-frontend-domain.vercel.app',
    credentials: true
  }));
}
```

Or use environment variable:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

Then add to backend .env:
```env
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

---

## ✅ Post-Deployment

### 1. Test All Features

- [ ] User registration
- [ ] User login
- [ ] Create task
- [ ] View tasks
- [ ] Edit task
- [ ] Delete task
- [ ] Search and filter
- [ ] Pagination
- [ ] Admin features

### 2. Monitor Application

- Check backend logs for errors
- Monitor API response times
- Track user activity
- Set up uptime monitoring (UptimeRobot, Pingdom)

### 3. Set Up Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records

**Render:**
1. Go to Settings → Custom Domains
2. Add your domain
3. Configure DNS

### 4. Enable HTTPS

Most hosting providers automatically provide HTTPS. Ensure it's enabled.

---

## 🎯 Deployment Combinations

### Recommended Setups

**Option A: Best for Beginners**
- Backend: Render (Free)
- Frontend: Vercel (Free)
- Database: MongoDB Atlas (Free)

**Option B: All-in-One**
- Backend + Frontend: Railway
- Database: MongoDB Atlas

**Option C: Traditional**
- Backend: Heroku
- Frontend: Netlify
- Database: MongoDB Atlas

---

## 📊 Monitoring & Analytics

### Error Monitoring
- **Sentry**: https://sentry.io
- **LogRocket**: https://logrocket.com

### Uptime Monitoring
- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://pingdom.com

### Analytics
- **Google Analytics**
- **Mixpanel**
- **Plausible**

---

## 🔄 Continuous Deployment

Once connected to GitHub, deployments are automatic:

1. Push code to GitHub
2. Hosting service detects changes
3. Automatically builds and deploys
4. Live site updates in minutes

```bash
# Example workflow
git add .
git commit -m "Add new feature"
git push origin main
# Automatic deployment starts!
```

---

## 💰 Cost Estimates

### Free Tier (Perfect for learning/portfolio)
- MongoDB Atlas: Free (512 MB storage)
- Render: Free (750 hours/month)
- Vercel: Free (unlimited projects)
- **Total: $0/month**

### Paid Tier (For production)
- MongoDB Atlas: $9/month (2 GB storage)
- Render: $7/month (per service)
- Vercel: $20/month (Pro plan)
- **Total: ~$36/month**

---

## 🐛 Common Deployment Issues

### Issue 1: CORS Error
**Solution:** Update CORS configuration to allow your frontend domain

### Issue 2: MongoDB Connection Error
**Solution:** Check IP whitelist, verify connection string, ensure database user exists

### Issue 3: 404 on Frontend Routes
**Solution:** Add redirect rules for React Router

### Issue 4: Environment Variables Not Working
**Solution:** Restart the service after adding variables, ensure correct naming

### Issue 5: Build Fails
**Solution:** Check Node version compatibility, run `npm install` fresh, clear cache

---

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] All code committed and pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured
- [ ] Connection string obtained
- [ ] Strong JWT secret generated

### Backend Deployment
- [ ] Hosting service account created
- [ ] Repository connected
- [ ] Environment variables added
- [ ] Build and start commands configured
- [ ] Deployment successful
- [ ] Health endpoint working
- [ ] CORS configured for production

### Frontend Deployment
- [ ] Backend URL updated in .env
- [ ] Build tested locally
- [ ] Hosting service account created
- [ ] Repository connected
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Site accessible via HTTPS

### Post-Deployment
- [ ] All features tested in production
- [ ] Error monitoring set up
- [ ] Uptime monitoring configured
- [ ] Analytics integrated
- [ ] Custom domain configured (if applicable)
- [ ] Documentation updated with live URLs

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Heroku Dev Center](https://devcenter.heroku.com/)
- [Netlify Documentation](https://docs.netlify.com/)

---

**Your Task Management System is now live! 🎉**

Share your deployed app:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-api.onrender.com/api`
