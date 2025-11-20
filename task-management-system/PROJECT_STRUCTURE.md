# 📂 Project Structure Documentation

## Complete File Structure

```
task-management-system/
│
├── backend/                          # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   │
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic (register, login)
│   │   └── taskController.js        # Task CRUD operations
│   │
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication & authorization
│   │   ├── errorHandler.js          # Global error handling
│   │   └── validate.js              # Joi validation middleware
│   │
│   ├── models/
│   │   ├── User.js                  # User schema (name, email, password, role)
│   │   └── Task.js                  # Task schema (title, description, status, createdBy)
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints (/register, /login, /me)
│   │   └── taskRoutes.js            # Task endpoints (CRUD + stats)
│   │
│   ├── validators/
│   │   ├── authValidator.js         # Joi schemas for auth
│   │   └── taskValidator.js         # Joi schemas for tasks
│   │
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Dependencies and scripts
│   └── server.js                    # Main application entry point
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html               # HTML template
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx        # Login form component
│   │   │   │   └── Register.jsx     # Registration form component
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── Loader.jsx       # Loading spinner
│   │   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   │   └── Notification.jsx # Toast notifications
│   │   │   │
│   │   │   ├── tasks/
│   │   │   │   ├── TaskCard.jsx     # Individual task card
│   │   │   │   ├── TaskFilter.jsx   # Filter and stats sidebar
│   │   │   │   ├── TaskForm.jsx     # Create/Edit task form
│   │   │   │   └── TaskList.jsx     # List of tasks with pagination
│   │   │   │
│   │   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication context & provider
│   │   │
│   │   ├── pages/
│   │   │   ├── CreateTask.jsx       # Create task page
│   │   │   ├── Dashboard.jsx        # Main dashboard page
│   │   │   └── EditTask.jsx         # Edit task page
│   │   │
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance with interceptors
│   │   │   ├── authService.js       # Auth API calls
│   │   │   └── taskService.js       # Task API calls
│   │   │
│   │   ├── styles/
│   │   │   └── App.css              # DeepSeek-style CSS (dark theme, glassmorphism)
│   │   │
│   │   ├── App.js                   # Main app component with routing
│   │   └── index.js                 # React entry point
│   │
│   ├── .env.example                 # Frontend environment variables
│   ├── .gitignore                   # Git ignore rules
│   └── package.json                 # Dependencies and scripts
│
├── .gitignore                       # Root level git ignore
├── install.ps1                      # PowerShell installation script
├── start.ps1                        # PowerShell script to start both servers
├── SETUP_GUIDE.md                   # Detailed setup instructions
├── PROJECT_STRUCTURE.md             # This file
└── README.md                        # Main documentation
```

---

## 📝 File Descriptions

### Backend Files

#### **server.js**
- Main entry point for the Express application
- Configures middleware (CORS, JSON parsing)
- Connects to MongoDB
- Registers routes
- Error handling middleware

#### **config/db.js**
- MongoDB connection logic using Mongoose
- Handles connection success/failure
- Uses environment variables for URI

#### **models/User.js**
- Mongoose schema for users
- Fields: name, email, password, role, timestamps
- Pre-save hook for password hashing
- Method to compare passwords

#### **models/Task.js**
- Mongoose schema for tasks
- Fields: title, description, status, createdBy, timestamps
- Indexes for better query performance
- Text search on title and description

#### **controllers/authController.js**
- `register()` - Create new user account
- `login()` - Authenticate user and return JWT
- `getMe()` - Get current user details
- JWT token generation helper

#### **controllers/taskController.js**
- `createTask()` - Create new task
- `getTasks()` - Get tasks with pagination, filtering, search
- `getTask()` - Get single task by ID
- `updateTask()` - Update task
- `deleteTask()` - Delete task
- `getTaskStats()` - Get task statistics by status

#### **middleware/auth.js**
- `protect` - Verify JWT token and attach user to request
- `authorize` - Check user role for specific routes

#### **middleware/errorHandler.js**
- Global error handling
- Handles Mongoose errors (CastError, ValidationError)
- Handles JWT errors
- Returns appropriate error responses

#### **middleware/validate.js**
- Generic Joi validation middleware
- Validates request body against schema
- Returns detailed error messages

#### **validators/authValidator.js**
- Joi schemas for registration and login
- Validates email format, password length, role

#### **validators/taskValidator.js**
- Joi schemas for task creation and updates
- Validates title, description, status

#### **routes/authRoutes.js**
- POST /api/register - Register endpoint
- POST /api/login - Login endpoint
- GET /api/me - Get current user

#### **routes/taskRoutes.js**
- POST /api/tasks - Create task
- GET /api/tasks - Get all tasks (filtered)
- GET /api/tasks/:id - Get single task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task
- GET /api/tasks/stats - Get statistics

---

### Frontend Files

#### **src/App.js**
- Main React component
- Sets up React Router routes
- Wraps app with AuthProvider
- Defines public and protected routes

#### **src/index.js**
- React entry point
- Renders App component
- Imports global styles

#### **src/context/AuthContext.jsx**
- React Context for authentication
- Manages user state
- Provides login, register, logout functions
- Persists auth to localStorage

#### **src/services/api.js**
- Axios instance with base URL
- Request interceptor to add JWT token
- Response interceptor to handle 401 errors
- Automatic logout on token expiration

#### **src/services/authService.js**
- `register()` - API call to register
- `login()` - API call to login
- `logout()` - Clear local storage
- `getCurrentUser()` - Get user from storage
- `isAuthenticated()` - Check if user is logged in

#### **src/services/taskService.js**
- `createTask()` - Create new task
- `getTasks()` - Get tasks with filters
- `getTask()` - Get single task
- `updateTask()` - Update task
- `deleteTask()` - Delete task
- `getTaskStats()` - Get statistics

#### **src/components/ProtectedRoute.jsx**
- Route wrapper for authentication
- Redirects to login if not authenticated
- Shows loader while checking auth

#### **src/components/common/Navbar.jsx**
- Navigation bar component
- Shows user info and role badge
- Logout button
- Links to dashboard and create task

#### **src/components/common/Loader.jsx**
- Loading spinner component
- Used during data fetching

#### **src/components/common/Notification.jsx**
- Toast notification component
- Auto-dismisses after duration
- Supports success, error, warning, info types

#### **src/components/auth/Register.jsx**
- Registration form
- Role selection (user/admin)
- Form validation
- Error handling

#### **src/components/auth/Login.jsx**
- Login form
- Shows demo credentials
- Error handling
- Redirects to dashboard on success

#### **src/components/tasks/TaskCard.jsx**
- Individual task display
- Shows title, description, status, author, date
- Edit/Delete buttons based on permissions
- Colored status badges

#### **src/components/tasks/TaskFilter.jsx**
- Filter sidebar component
- Statistics cards (total, pending, in-progress, completed)
- Search input
- Status dropdown filter

#### **src/components/tasks/TaskList.jsx**
- Displays list of task cards
- Pagination controls
- Empty state when no tasks
- Loading state

#### **src/components/tasks/TaskForm.jsx**
- Create/Edit task form
- Title, description, status fields
- Character counter for description
- Cancel and submit buttons

#### **src/pages/Dashboard.jsx**
- Main dashboard page
- Combines TaskFilter and TaskList
- Fetches tasks and statistics
- Handles filter changes and pagination
- Edit and delete handlers

#### **src/pages/CreateTask.jsx**
- Create task page
- Uses TaskForm component
- Handles task creation
- Redirects to dashboard on success

#### **src/pages/EditTask.jsx**
- Edit task page
- Receives task via route state
- Uses TaskForm component
- Handles task update

#### **src/styles/App.css**
- Complete styling for the application
- CSS variables for theming
- Dark theme with gradients
- Glassmorphism effects
- Responsive design
- Animations and transitions
- DeepSeek-inspired modern UI

---

## 🔑 Key Features by File

### Authentication Flow
1. User fills form in `Register.jsx` or `Login.jsx`
2. Form data sent via `authService.js`
3. Backend `authController.js` validates and creates JWT
4. Token stored in localStorage
5. `AuthContext.jsx` manages auth state
6. `ProtectedRoute.jsx` guards private routes
7. `api.js` adds token to all requests

### Task Management Flow
1. User creates task in `CreateTask.jsx` using `TaskForm.jsx`
2. Data sent via `taskService.js`
3. Backend `taskController.js` creates task with user ID
4. Dashboard refreshes via `Dashboard.jsx`
5. Tasks displayed in `TaskList.jsx` using `TaskCard.jsx`
6. Filters applied via `TaskFilter.jsx`
7. Edit opens `EditTask.jsx` with task data
8. Delete confirmed and executed

### Authorization Flow
1. `middleware/auth.js` verifies JWT
2. Checks user role from token
3. `taskController.js` filters tasks by role:
   - Users see only their own tasks
   - Admins see all tasks
4. Edit/Delete permissions checked:
   - Users can only modify own tasks
   - Admins can delete any task

---

## 🎨 Styling Architecture

### CSS Organization
- **CSS Variables** - Centralized theming
- **Component-based** - Each component has specific styles
- **Utility Classes** - Reusable button, form, layout classes
- **Responsive** - Mobile-first breakpoints
- **Animations** - Smooth transitions and effects

### Design System
- **Colors** - Gradient-based with dark background
- **Spacing** - Consistent rem-based system
- **Typography** - Clear hierarchy
- **Shadows** - Layered depth
- **Borders** - Glassmorphism with transparency

---

## 📊 Data Flow

```
User Action
    ↓
React Component
    ↓
Service Function (authService/taskService)
    ↓
Axios (api.js) + JWT Token
    ↓
Express Route (authRoutes/taskRoutes)
    ↓
Middleware (validate, auth)
    ↓
Controller (authController/taskController)
    ↓
Mongoose Model (User/Task)
    ↓
MongoDB Database
    ↓
Response
    ↓
Component State Update
    ↓
UI Update
```

---

## 🔐 Security Measures

1. **Password Hashing** - bcrypt with salt rounds
2. **JWT Tokens** - Secure authentication
3. **Token Expiration** - Auto logout after 7 days
4. **Input Validation** - Joi schemas on backend
5. **CORS** - Configured for specific origins
6. **Authorization** - Role-based access control
7. **Protected Routes** - Client-side route guards
8. **Error Handling** - No sensitive data in errors

---

## 🚀 Performance Optimizations

1. **Database Indexes** - On frequently queried fields
2. **Pagination** - Limit data transferred
3. **Text Search** - MongoDB text index
4. **Lazy Loading** - React code splitting potential
5. **CSS Optimization** - Single compiled stylesheet
6. **Asset Caching** - Browser caching headers
7. **Query Optimization** - Only fetch needed fields

---

## 🧪 Testing Scenarios

### User Scenarios
1. Register as user → Create tasks → View own tasks only
2. Edit own task → Update status → Verify changes
3. Delete own task → Confirm deletion
4. Search tasks → Filter by status → Paginate results
5. Logout → Verify redirect to login

### Admin Scenarios
1. Register as admin → View all tasks from all users
2. Delete any user's task → Verify admin privileges
3. Create tasks → See in all tasks list
4. Filter all tasks by status → Search across all users

### Error Scenarios
1. Login with wrong credentials → See error message
2. Access protected route without login → Redirect to login
3. Create task with invalid data → See validation errors
4. Token expires → Auto logout
5. Network error → Show error notification

---

## 📖 API Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Error message"
    }
  ]
}
```

### Paginated Response
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  },
  "data": {
    "tasks": []
  }
}
```

---

**End of Project Structure Documentation**
