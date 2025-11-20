# ⚡ Quick Reference Card

## 🚀 Installation

```powershell
# Run the install script
.\install.ps1

# OR Manual installation
cd backend; npm install; cd ..
cd frontend; npm install; cd ..
```

---

## 🎮 Running the Application

```powershell
# Easy way - Start both servers
.\start.ps1

# OR Manual way
# Terminal 1:
cd backend
npm run dev

# Terminal 2:
cd frontend
npm start
```

---

## 📍 URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 🔑 API Endpoints

### Authentication (Public)
```
POST /api/register    - Register new user
POST /api/login       - Login user
```

### Tasks (Protected - Requires JWT)
```
POST   /api/tasks        - Create task
GET    /api/tasks        - Get tasks (with filters)
GET    /api/tasks/:id    - Get single task
PUT    /api/tasks/:id    - Update task
DELETE /api/tasks/:id    - Delete task
GET    /api/tasks/stats  - Get statistics
```

### Query Parameters
```
?page=1                  - Page number
?limit=10                - Items per page
?status=pending          - Filter by status
?search=meeting          - Search in title/description
```

---

## 📝 Test Accounts

After registration, use these credentials:

**Admin Account:**
```
Email: admin@test.com
Password: Admin@123
Role: admin
```

**User Account:**
```
Email: user@test.com
Password: User@123
Role: user
```

---

## 💾 MongoDB Commands

```powershell
# Start MongoDB (Windows)
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Check if running
Get-Service MongoDB

# Connect to MongoDB shell
mongosh

# In MongoDB shell:
use taskmanagement
db.users.find()
db.tasks.find()
```

---

## 🔧 Useful Commands

### Backend
```powershell
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Check for errors
npm test
```

### Frontend
```powershell
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Test production build
serve -s build
```

---

## 🐛 Debugging

### Clear Everything
```powershell
# Clear node_modules
Remove-Item -Recurse -Force backend/node_modules
Remove-Item -Recurse -Force frontend/node_modules

# Clear cache
npm cache clean --force

# Reinstall
cd backend; npm install; cd ..
cd frontend; npm install; cd ..
```

### Clear Browser Data
```javascript
// Open browser console (F12) and run:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Check Ports
```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Check what's using port 3000
netstat -ano | findstr :3000

# Kill process by PID
taskkill /PID <PID> /F
```

---

## 📦 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎨 Status Values

Tasks can have these statuses:
- `pending` - Not started
- `in-progress` - Currently working
- `completed` - Finished

---

## 👥 User Roles

- **user** - Can create, view, edit, delete own tasks only
- **admin** - Can view all tasks, delete any task

---

## 📊 Example API Requests

### Register
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Task (with token)
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "in-progress"
  }'
```

### Get Tasks
```bash
curl -X GET "http://localhost:5000/api/tasks?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🔍 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process using the port or change port in .env |
| MongoDB connection error | Start MongoDB service: `net start MongoDB` |
| CORS error | Check backend is running, verify API URL in frontend .env |
| JWT invalid | Clear localStorage and login again |
| 404 on API calls | Ensure backend is running on correct port |
| Build fails | Delete node_modules, clear cache, reinstall |

---

## 📁 Key Files to Edit

- `backend/.env` - Backend configuration
- `frontend/.env` - Frontend configuration
- `backend/server.js` - Backend entry point
- `frontend/src/App.js` - Frontend entry point
- `frontend/src/styles/App.css` - All styles

---

## 🎯 Features Checklist

- [x] User Authentication (JWT)
- [x] Role-based Access Control
- [x] Task CRUD Operations
- [x] Search & Filter
- [x] Pagination
- [x] Input Validation
- [x] Error Handling
- [x] Responsive Design
- [x] Modern UI (DeepSeek-style)
- [x] Toast Notifications
- [x] Protected Routes
- [x] Password Hashing

---

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP_GUIDE.md` - Detailed setup instructions
- `PROJECT_STRUCTURE.md` - File structure and architecture
- `QUICK_REFERENCE.md` - This file

---

## 🆘 Getting Help

1. Check console for errors (F12 in browser)
2. Check terminal output for backend errors
3. Verify MongoDB is running
4. Verify .env files are configured
5. Clear browser localStorage
6. Restart both servers

---

**For more details, see the full documentation in README.md and SETUP_GUIDE.md**
