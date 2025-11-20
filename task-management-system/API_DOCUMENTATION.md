# 🔌 API Documentation

## Base URL

```
http://localhost:5000/api
```

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Tasks](#tasks)
3. [Response Formats](#response-formats)
4. [Error Codes](#error-codes)
5. [Headers](#headers)

---

## 🔐 Authentication

### Register User

Create a new user account.

**Endpoint:** `POST /register`

**Access:** Public

**Request Body:**
```json
{
  "name": "string (required, 2-50 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)",
  "role": "string (optional, 'user' or 'admin', default: 'user')"
}
```

**Example Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "user"
}
```

**Success Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64abc123def456789",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### Login User

Authenticate user and receive JWT token.

**Endpoint:** `POST /login`

**Access:** Public

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Example Request:**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64abc123def456789",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get Current User

Get authenticated user's information.

**Endpoint:** `GET /me`

**Access:** Private (Requires JWT)

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64abc123def456789",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

## 📝 Tasks

### Create Task

Create a new task.

**Endpoint:** `POST /tasks`

**Access:** Private (Requires JWT)

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "string (required, 3-100 chars)",
  "description": "string (optional, max 500 chars)",
  "status": "string (optional, 'pending'|'in-progress'|'completed', default: 'pending')"
}
```

**Example Request:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs and user guide",
  "status": "in-progress"
}
```

**Success Response:** `201 Created`
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "_id": "64abc789def123456",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs and user guide",
      "status": "in-progress",
      "createdBy": "64abc123def456789",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

---

### Get All Tasks

Retrieve tasks with pagination, filtering, and search.

**Endpoint:** `GET /tasks`

**Access:** Private (Requires JWT)

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| page | number | Page number | 1 |
| limit | number | Items per page | 10 |
| status | string | Filter by status ('pending', 'in-progress', 'completed') | - |
| search | string | Search in title and description | - |

**Example Request:**
```
GET /tasks?page=1&limit=10&status=pending&search=project
```

**Success Response:** `200 OK`
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
    "tasks": [
      {
        "_id": "64abc789def123456",
        "title": "Complete project documentation",
        "description": "Write comprehensive API docs",
        "status": "in-progress",
        "createdBy": {
          "_id": "64abc123def456789",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

**Notes:**
- **Users** see only their own tasks
- **Admins** see all tasks from all users

---

### Get Single Task

Retrieve a specific task by ID.

**Endpoint:** `GET /tasks/:id`

**Access:** Private (Requires JWT)

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id` - Task ID (MongoDB ObjectId)

**Example Request:**
```
GET /tasks/64abc789def123456
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "64abc789def123456",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "status": "in-progress",
      "createdBy": {
        "_id": "64abc123def456789",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response:** `403 Forbidden`
```json
{
  "success": false,
  "message": "Not authorized to access this task"
}
```

---

### Update Task

Update an existing task.

**Endpoint:** `PUT /tasks/:id`

**Access:** Private (Requires JWT, Owner or Admin)

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**URL Parameters:**
- `id` - Task ID (MongoDB ObjectId)

**Request Body:**
```json
{
  "title": "string (optional, 3-100 chars)",
  "description": "string (optional, max 500 chars)",
  "status": "string (optional, 'pending'|'in-progress'|'completed')"
}
```

**Example Request:**
```json
{
  "status": "completed"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "_id": "64abc789def123456",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "status": "completed",
      "createdBy": {
        "_id": "64abc123def456789",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T15:45:00.000Z"
    }
  }
}
```

**Error Response:** `403 Forbidden`
```json
{
  "success": false,
  "message": "Not authorized to update this task"
}
```

**Notes:**
- **Users** can only update their own tasks
- **Admins** can update any task

---

### Delete Task

Delete a task.

**Endpoint:** `DELETE /tasks/:id`

**Access:** Private (Requires JWT, Owner or Admin)

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id` - Task ID (MongoDB ObjectId)

**Example Request:**
```
DELETE /tasks/64abc789def123456
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {}
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response:** `403 Forbidden`
```json
{
  "success": false,
  "message": "Not authorized to delete this task"
}
```

**Notes:**
- **Users** can only delete their own tasks
- **Admins** can delete any task

---

### Get Task Statistics

Get task count grouped by status.

**Endpoint:** `GET /tasks/stats`

**Access:** Private (Requires JWT)

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "stats": {
      "pending": 12,
      "in-progress": 8,
      "completed": 25,
      "total": 45
    }
  }
}
```

**Notes:**
- **Users** see stats for their own tasks only
- **Admins** see stats for all tasks

---

## 📄 Response Formats

### Success Response Structure
```json
{
  "success": true,
  "message": "Operation description",
  "data": {
    // Response data
  }
}
```

### Error Response Structure
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific error message"
    }
  ]
}
```

### Paginated Response Structure
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
    // Array of items
  }
}
```

---

## ⚠️ Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Missing or invalid JWT token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server error |

---

## 📋 Headers

### Request Headers

**For all authenticated endpoints:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Response Headers
```
Content-Type: application/json
```

---

## 🔒 Authentication Flow

1. **Register or Login** to receive JWT token
2. **Store token** in localStorage or secure storage
3. **Include token** in Authorization header for all protected endpoints
4. **Token expires** after 7 days (configurable)
5. **Refresh by logging in again** when token expires

---

## 🎯 Role-Based Access Control

### User Role
- ✅ Create tasks
- ✅ View own tasks
- ✅ Edit own tasks
- ✅ Delete own tasks
- ❌ View other users' tasks
- ❌ Delete other users' tasks

### Admin Role
- ✅ Create tasks
- ✅ View all tasks (from all users)
- ✅ Edit own tasks
- ✅ Delete any task
- ✅ View task statistics for all users

---

## 📊 Example Use Cases

### Use Case 1: User Registration and Task Creation

```javascript
// 1. Register
const registerResponse = await fetch('http://localhost:5000/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  })
});
const { data } = await registerResponse.json();
const token = data.token;

// 2. Create Task
const taskResponse = await fetch('http://localhost:5000/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My First Task',
    description: 'Task description',
    status: 'pending'
  })
});
```

### Use Case 2: Filter and Search Tasks

```javascript
// Get pending tasks containing "meeting" in title or description
const response = await fetch(
  'http://localhost:5000/api/tasks?status=pending&search=meeting&page=1&limit=10',
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);
const { data, pagination } = await response.json();
```

### Use Case 3: Update Task Status

```javascript
// Update task to completed
const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    status: 'completed'
  })
});
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"user"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Task","description":"Description","status":"pending"}'
```

### Get Tasks
```bash
curl -X GET "http://localhost:5000/api/tasks?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"status":"completed"}'
```

### Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📌 Notes

- All timestamps are in ISO 8601 format (UTC)
- MongoDB ObjectIds are 24-character hexadecimal strings
- JWT tokens are valid for 7 days by default
- Maximum request body size: 10MB
- Rate limiting: Not implemented (consider adding for production)
- API versioning: Not implemented (consider adding /v1/ prefix)

---

**For more information, see the main README.md and SETUP_GUIDE.md**
