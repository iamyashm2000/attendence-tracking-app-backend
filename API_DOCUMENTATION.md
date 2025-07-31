# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication Endpoints

### 1. User Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### 2. Send OTP for Password Reset
**POST** `/auth/send-otp`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "OTP sent successfully",
  "otp": "123456"
}
```

### 3. Reset Password
**POST** `/auth/reset-password`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successfully",
  "success": true
}
```

## User Management Endpoints

### 1. Create User
**POST** `/users`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

### 2. Get All Users
**GET** `/users`

**Response:**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
]
```

### 3. Get User by ID
**GET** `/users/:id`

**Response:**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

### 4. Update User
**PATCH** `/users/:id`

**Request Body:**
```json
{
  "name": "John Smith",
  "role": "admin"
}
```

**Response:**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "John Smith",
  "email": "john@example.com",
  "role": "admin",
  "isActive": true,
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:35:00.000Z"
}
```

### 5. Delete User
**DELETE** `/users/:id`

**Response:** `204 No Content`

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

## Authentication

For protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### Get All Users
```bash
curl -X GET http://localhost:3000/api/users
```

### Update User
```bash
curl -X PATCH http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0
```

## Environment Variables

Make sure to set up your `.env` file with the following variables:

```env
MONGODB_URI=your-mongodb-connection-string
DB_NAME=attendance_tracking
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
``` 