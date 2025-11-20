# 🚀 Task Management System

A full-stack task management application with role-based access control, featuring a modern DeepSeek-inspired UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.x-blue.svg)

## ✨ Features

### 🔐 Authentication
- User registration with role assignment (user/admin)
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints

### 📝 Task Management
- Create, read, update, and delete tasks
- Task status tracking (pending, in-progress, completed)
- User-specific task views
- Admin dashboard with all tasks

### 🎨 Modern UI
- DeepSeek-inspired dark theme
- Glassmorphism effects
- Smooth animations and transitions
- Responsive design
- Real-time notifications

### 🚀 Bonus Features
- Pagination for task lists
- Search and filter functionality
- Joi validation for all inputs
- Reusable React components
- Protected routes
- Error handling middleware

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Joi** - Validation

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (>= 16.0.0)
- MongoDB (>= 5.0) or MongoDB Atlas account
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

Start the backend server:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
task-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── taskValidator.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Notification.jsx
│   │   │   ├── tasks/
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   ├── TaskForm.jsx
│   │   │   │   ├── TaskList.jsx
│   │   │   │   └── TaskFilter.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateTask.jsx
│   │   │   └── EditTask.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── taskService.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/register` | Register new user | Public |
| POST | `/api/login` | Login user | Public |

### Tasks

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/tasks` | Create task | Private |
| GET | `/api/tasks` | Get tasks (filtered by role) | Private |
| GET | `/api/tasks/:id` | Get single task | Private |
| PUT | `/api/tasks/:id` | Update task | Private (Owner/Admin) |
| DELETE | `/api/tasks/:id` | Delete task | Private (Owner/Admin) |

### Query Parameters for GET /api/tasks

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (pending/in-progress/completed)
- `search` - Search in title and description

Example: `/api/tasks?page=1&limit=10&status=pending&search=meeting`

## 👤 Default Users

For testing, you can create these users:

**Admin User:**
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "Admin@123",
  "role": "admin"
}
```

**Regular User:**
```json
{
  "name": "John Doe",
  "email": "user@test.com",
  "password": "User@123"
}
```

## 🎯 Usage

1. **Register** - Create a new account (admin or user)
2. **Login** - Sign in with your credentials
3. **Dashboard** - View your tasks (or all tasks if admin)
4. **Create Task** - Add new tasks with title, description, and status
5. **Edit Task** - Update existing tasks
6. **Delete Task** - Remove tasks (own tasks for users, any task for admins)
7. **Filter & Search** - Find tasks quickly
8. **Pagination** - Navigate through multiple pages of tasks

## 🔒 Role-Based Access

### User Role
- Create their own tasks
- View only their own tasks
- Edit only their own tasks
- Delete only their own tasks

### Admin Role
- View all tasks from all users
- Delete any task
- Full access to the system

## 🎨 UI Highlights

- **Dark Theme** - Easy on the eyes
- **Gradient Accents** - Modern visual appeal
- **Glass Effect** - Frosted glass morphism
- **Smooth Animations** - Enhanced UX
- **Responsive Design** - Works on all devices
- **Toast Notifications** - Real-time feedback

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:3000`
3. Register a new user with role "admin"
4. Login with the admin account
5. Create some tasks
6. Register another user with role "user"
7. Login as the user and create tasks
8. Switch back to admin to see all tasks

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check Atlas connection string
- Verify network access in MongoDB Atlas
- Check if the database user has proper permissions

### CORS Errors
- Ensure backend CORS is configured correctly
- Check if frontend API URL is correct in .env

### JWT Token Issues
- Clear localStorage and login again
- Verify JWT_SECRET is set in backend .env

### Port Already in Use
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Or change the PORT in backend .env
```

## 📦 Build for Production

### Backend
```bash
cd backend
npm install --production
node server.js
```

### Frontend
```bash
cd frontend
npm run build
```

Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

## 🚀 Deployment

### Backend Deployment (Heroku/Render)
1. Push code to GitHub
2. Connect repository to hosting service
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variables
6. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🙏 Acknowledgments

- DeepSeek for UI inspiration
- MongoDB for database
- React community for amazing tools

---

**Happy Task Managing! 🎉**
